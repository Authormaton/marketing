import { onCLS, onINP, onLCP, ReportHandler } from 'web-vitals';

const reportWebVitals = (onReport?: ReportHandler) => {
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
