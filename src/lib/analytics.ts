declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const isDevelopment = process.env.NODE_ENV === 'development';

export const trackPageView = (url: string) => {
  if (isDevelopment) {
    console.log(`Analytics: Page view for ${url}`);
  }
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

export const trackButtonClick = (buttonName: string, properties?: Record<string, any>) => {
  if (isDevelopment) {
    console.log(`Analytics: Button click - ${buttonName}`, properties);
  }
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'button_click', {
      event_category: 'engagement',
      event_label: buttonName,
      ...properties,
    });
  }
};

export const trackCustomEvent = (eventName: string, properties?: Record<string, any>) => {
  if (isDevelopment) {
    console.log(`Analytics: Custom event - ${eventName}`, properties);
  }
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
};