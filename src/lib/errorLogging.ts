
import { isProduction } from './utils'; // Assuming utils.ts has an isProduction helper

// 1. TypeScript Interfaces for Error Metadata
interface ErrorMetadata {
  level?: 'info' | 'warning' | 'error' | 'fatal';
  context?: Record<string, any>;
  user?: {
    id?: string;
    email?: string;
    username?: string;
    [key: string]: any;
  };
  breadcrumbs?: Breadcrumb[];
  tags?: Record<string, string>;
  extra?: Record<string, any>;
}

interface Breadcrumb {
  message: string;
  category?: string;
  level?: 'info' | 'warning' | 'error';
  timestamp?: number;
  data?: Record<string, any>;
}

// Module-level state for context
let breadcrumbs: Breadcrumb[] = [];
let currentUser: ErrorMetadata['user'] = undefined;
let contextMap: Record<string, any> = {};

const LOCAL_STORAGE_KEY = 'errorQueue';
const MAX_QUEUE_SIZE = 50; // Limit queue size to prevent unbounded storage growth

// Helper to safely save the queue to localStorage
function saveQueue() {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(errorQueue));
  } catch (e) {
    console.error('Failed to save error queue to localStorage:', e);
    // Fallback to in-memory if storage fails
  }
}

// Helper to safely load the queue from localStorage
function loadQueue() {
  try {
    const storedQueue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedQueue) {
      const parsedQueue = JSON.parse(storedQueue);
      if (Array.isArray(parsedQueue)) {
        errorQueue.push(...parsedQueue.slice(0, MAX_QUEUE_SIZE)); // Hydrate and respect max size
      } else {
        console.warn('Stored error queue is not an array, initializing empty queue.');
      }
    }
  } catch (e) {
    console.error('Failed to load or parse error queue from localStorage:', e);
    // Fallback to empty queue if loading/parsing fails
  }
}

// 2. Offline Error Queuing (simplified for demonstration)
const errorQueue: { error: Error; metadata?: ErrorMetadata }[] = [];
let isOnline = navigator.onLine;

window.addEventListener('online', () => {
  isOnline = true;
  sendQueuedErrors();
});
window.addEventListener('offline', () => {
  isOnline = false;
});

function sendQueuedErrors() {
  while (isOnline && errorQueue.length > 0) {
    const errorItem = errorQueue.shift();
    if (errorItem) {
      sendErrorToService(errorItem.error, errorItem.metadata);
    }
  }
}

// 3. Error Sanitization
function sanitizeErrorMetadata(metadata?: ErrorMetadata): ErrorMetadata | undefined {
  if (!metadata) return undefined;

  const sanitized = { ...metadata };

  // Example: Remove sensitive user data
  if (sanitized.user) {
    const sensitiveUserKeys = ['password', 'ssn', 'creditCard']; // Add more as needed
    for (const key of sensitiveUserKeys) {
      if (sanitized.user[key]) {
        sanitized.user[key] = '[REDACTED]';
      }
    }
  }

  // Example: Remove sensitive data from context or extra
  const sensitiveKeys = ['apiKey', 'authToken']; // Add more as needed
  for (const key of sensitiveKeys) {
    if (sanitized.context && sanitized.context[key]) {
      sanitized.context[key] = '[REDACTED]';
    }
    if (sanitized.extra && sanitized.extra[key]) {
      sanitized.extra[key] = '[REDACTED]';
    }
    if (sanitized.breadcrumbs) {
      sanitized.breadcrumbs = sanitized.breadcrumbs.map(b => {
        if (b.data && b.data[key]) {
          return { ...b, data: { ...b.data, [key]: '[REDACTED]' } };
        }
        return b;
      });
    }
  }

  return sanitized;
}

// 4. Sentry-like Error Sending (Mock Implementation)
function sendErrorToService(error: Error, metadata?: ErrorMetadata) {
  if (!isProduction()) {
    console.error('Development Error:', error, metadata);
    return;
  }

  const sanitizedMetadata = sanitizeErrorMetadata(metadata);

  // In a real application, you would send this to Sentry, Bugsnag, etc.
  // Example using a hypothetical Sentry-like SDK:
  /*
  Sentry.withScope((scope) => {
    if (sanitizedMetadata?.level) scope.setLevel(sanitizedMetadata.level);
    if (sanitizedMetadata?.context) scope.setContext('context', sanitizedMetadata.context);
    if (sanitizedMetadata?.user) scope.setUser(sanitizedMetadata.user);
    if (sanitizedMetadata?.tags) scope.setTags(sanitizedMetadata.tags);
    if (sanitizedMetadata?.extra) scope.addEventProcessor((event) => {
      event.extra = { ...event.extra, ...sanitizedMetadata.extra };
      return event;
    });
    if (sanitizedMetadata?.breadcrumbs) {
      sanitizedMetadata.breadcrumbs.forEach(breadcrumb => scope.addBreadcrumb(breadcrumb));
    }
    Sentry.captureException(error);
  });
  */

  // For this example, we'll just log to console in production as well
  console.error('Production Error Captured:', error, sanitizedMetadata);
}

// Public API for the error logging service
export const errorLogger = {
  /**
   * Captures an error and sends it to the monitoring service.
   * @param error The error object to capture.
   * @param metadata Optional metadata to attach to the error.
   */
  captureError(error: Error, metadata?: ErrorMetadata) {
    const errorPayload: ErrorMetadata = {
      ...metadata,
      breadcrumbs: [...breadcrumbs, ...(metadata?.breadcrumbs || [])],
      user: metadata?.user || currentUser,
      context: { ...contextMap, ...(metadata?.context || {}) },
    };

    if (!isOnline) {
      errorQueue.push({ error, metadata: errorPayload });
      saveQueue(); // Save queue after modification
      return;
    }
    sendErrorToService(error, errorPayload);
    breadcrumbs = []; // Clear breadcrumbs after capturing an error
  },

  /**
   * Adds a breadcrumb to the current error context.
   * @param breadcrumb The breadcrumb object.
   */
  addBreadcrumb(breadcrumb: Breadcrumb) {
    breadcrumbs.push(breadcrumb);
    // Enforce a max number of breadcrumbs to prevent unbounded growth
    if (breadcrumbs.length > 100) {
      breadcrumbs = breadcrumbs.slice(-100);
    }
    console.log('Breadcrumb:', breadcrumb);
  },

  /**
   * Sets user context for subsequent errors.
   * @param user User object with id, email, username, etc.
   */
  setUserContext(user: ErrorMetadata['user']) {
    currentUser = user;
    console.log('User Context Set:', user);
  },

  /**
   * Sets additional context for subsequent errors.
   * @param key The key for the context.
   * @param value The value for the context.
   */
  setContext(key: string, value: Record<string, any>) {
    contextMap = { ...contextMap, [key]: value };
    console.log('Context Set:', key, value);
  },
};

// Initial check for queued errors on load
if (isOnline) {
  sendQueuedErrors();
}
