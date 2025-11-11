import { useCallback } from 'react';
import { trackPageView, trackButtonClick, trackCustomEvent } from '@/lib/analytics';

export const useAnalytics = () => {
  const pageView = useCallback((url: string) => {
    trackPageView(url);
  }, []);

  const buttonClick = useCallback((buttonName: string, properties?: Record<string, any>) => {
    trackButtonClick(buttonName, properties);
  }, []);

  const customEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    trackCustomEvent(eventName, properties);
  }, []);

  return {
    pageView,
    buttonClick,
    customEvent,
  };
};
