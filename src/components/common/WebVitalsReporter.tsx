'use client';

import { useEffect } from 'react';
import reportWebVitals from '@/lib/performance';

export default function WebVitalsReporter() {
  useEffect(() => {
    reportWebVitals(metric => {
      console.log(metric.name, metric);
    });
  }, []);

  return null;
}
