import { v4 as uuidv4 } from 'uuid';

export interface AnalyticsEvent {
  id: string;
  type: 'page_view' | 'button_click' | 'custom_event' | 'writing_demo_navigation' | 'contact_form_interaction';
  name: string;
  timestamp: number;
  payload?: Record<string, any>;
}

const MOCK_ANALYTICS_KEY = 'mock_analytics_data';

export const generateMockAnalyticsData = () => {
  const events: AnalyticsEvent[] = [];
  const now = Date.now();

  // Page Views
  const pages = ['/', '/about', '/services', '/contact', '/demo'];
  for (let i = 0; i < 50; i++) {
    events.push({
      id: uuidv4(),
      type: 'page_view',
      name: pages[Math.floor(Math.random() * pages.length)],
      timestamp: now - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000), // Last 30 days
    });
  }

  // Button Clicks
  const buttons = ['hero_cta', 'learn_more', 'download_report', 'contact_us_button'];
  for (let i = 0; i < 30; i++) {
    events.push({
      id: uuidv4(),
      type: 'button_click',
      name: buttons[Math.floor(Math.random() * buttons.length)],
      timestamp: now - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
    });
  }

  // Custom Events
  const customEvents = ['video_play', 'feature_x_used', 'settings_updated'];
  for (let i = 0; i < 20; i++) {
    events.push({
      id: uuidv4(),
      type: 'custom_event',
      name: customEvents[Math.floor(Math.random() * customEvents.length)],
      timestamp: now - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
      payload: { value: Math.random() > 0.5 ? 1 : 0 },
    });
  }

  // Writing Demo Navigation
  for (let i = 0; i < 40; i++) {
    events.push({
      id: uuidv4(),
      type: 'writing_demo_navigation',
      name: `slide_${Math.floor(Math.random() * 5) + 1}`,
      timestamp: now - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
      payload: { direction: Math.random() > 0.5 ? 'next' : 'prev' },
    });
  }

  // Contact Form Interactions
  for (let i = 0; i < 15; i++) {
    events.push({
      id: uuidv4(),
      type: 'contact_form_interaction',
      name: Math.random() > 0.7 ? 'form_submission_success' : 'form_submission_failure',
      timestamp: now - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
      payload: { fieldsFilled: Math.floor(Math.random() * 5) + 1 },
    });
  }

  localStorage.setItem(MOCK_ANALYTICS_KEY, JSON.stringify(events));
  return events;
};

export const getAnalyticsData = (): AnalyticsEvent[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  const data = localStorage.getItem(MOCK_ANALYTICS_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return generateMockAnalyticsData(); // Generate if not found
};
