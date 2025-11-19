
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
    if (!isOnline) {
      errorQueue.push({ error, metadata });
      return;
    }
    sendErrorToService(error, metadata);
  },

  /**
   * Adds a breadcrumb to the current error context.
   * @param breadcrumb The breadcrumb object.
   */
  addBreadcrumb(breadcrumb: Breadcrumb) {
    // In a real Sentry-like integration, this would add to the current scope.
    // For this mock, we'll just log it or store it temporarily if needed.
    console.log('Breadcrumb:', breadcrumb);
  },

  /**
   * Sets user context for subsequent errors.
   * @param user User object with id, email, username, etc.
   */
  setUserContext(user: ErrorMetadata['user']) {
    // In a real Sentry-like integration, this would set the user on the scope.
    console.log('User Context Set:', user);
  },

  /**
   * Sets additional context for subsequent errors.
   * @param key The key for the context.
   * @param value The value for the context.
   */
  setContext(key: string, value: Record<string, any>) {
    // In a real Sentry-like integration, this would set context on the scope.
    console.log('Context Set:', key, value);
  },
};

// Initial check for queued errors on load
if (isOnline) {
  sendQueuedErrors();
}
