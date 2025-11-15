import { onCLS, onINP, onLCP, Metric } from 'web-vitals';

const reportWebVitals = (onReport?: (metric: Metric) => void) => {
  onCLS(metric => {
    console.log('Core Web Vitals: CLS', metric);
    onReport?.(metric);
  });
  onINP(metric => {
    console.log('Core Web Vitals: INP', metric);
    onReport?.(metric);
  });
  onLCP(metric => {
    console.log('Core Web Vitals: LCP', metric);
    onReport?.(metric);
  });
};

export default reportWebVitals;
