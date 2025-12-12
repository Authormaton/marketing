declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

import { v4 as uuidv4 } from 'uuid';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const isDevelopment = process.env.NODE_ENV === 'development';

const SESSION_ID_KEY = 'sessionId';
let sessionStartTime: number;

const getSessionId = (): string => {
  if (typeof window === 'undefined') {
    return 'server-side';
  }

  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }

  if (!sessionStartTime) {
    sessionStartTime = Date.now();
  }
  return sessionId;
};

export const trackPageView = (url: string) => {
  if (isDevelopment) {
    console.log(`Analytics: Page view for ${url}`);
  }
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      session_id: getSessionId(),
    });
  }
};

export const trackButtonClick = (buttonName: string, properties?: Record<string, unknown>) => {
  if (isDevelopment) {
    console.log(`Analytics: Button click - ${buttonName}`, properties);
  }
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'button_click', {
      event_category: 'engagement',
      event_label: buttonName,
      session_id: getSessionId(),
      ...properties,
    });
  }
};

export const trackCustomEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (isDevelopment) {
    console.log(`Analytics: Custom event - ${eventName}`, properties);
  }
  if (typeof window !== 'undefined' && window.gtag) {
    const sessionDuration = sessionStartTime ? Date.now() - sessionStartTime : 0;
    window.gtag('event', eventName, {
      session_id: getSessionId(),
      session_duration: sessionDuration,
      ...properties,
    });
  }
};