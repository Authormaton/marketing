'use client';

import { useEffect } from 'react';
import reportWebVitals from '@/lib/performance';
import { Metric } from 'web-vitals';

export default function WebVitalsReporter() {
  useEffect(() => {
    reportWebVitals((metric: Metric) => {
      console.log(metric.name, metric);
    });
  }, []);

  return null;
}
