"use client";

import React, { useEffect, useState } from 'react';
import { getAnalyticsData, AnalyticsEvent } from '../../lib/mockAnalyticsData';
import PageViewChart from './PageViewChart';
import EventChart from './EventChart';
import WritingDemoNavigationChart from './WritingDemoNavigationChart';
import ContactFormInteractionChart from './ContactFormInteractionChart';

const AnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsEvent[]>([]);

  useEffect(() => {
    setAnalyticsData(getAnalyticsData());
  }, []);

  if (analyticsData.length === 0) {
    return <div className="text-center py-10">No analytics data available.</div>;
  }

  const pageViews = analyticsData.filter(event => event.type === 'page_view');
  const buttonClicks = analyticsData.filter(event => event.type === 'button_click');
  const customEvents = analyticsData.filter(event => event.type === 'custom_event');
  const writingDemoNavigations = analyticsData.filter(event => event.type === 'writing_demo_navigation');
  const contactFormInteractions = analyticsData.filter(event => event.type === 'contact_form_interaction');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Page Views</h2>
        <PageViewChart data={pageViews} />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Button Clicks</h2>
        <EventChart data={buttonClicks} title="Button Clicks" />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Custom Events</h2>
        <EventChart data={customEvents} title="Custom Events" />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Writing Demo Navigation</h2>
        <WritingDemoNavigationChart data={writingDemoNavigations} />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Contact Form Interactions</h2>
        <ContactFormInteractionChart data={contactFormInteractions} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
