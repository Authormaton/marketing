import { onCLS, onFID, onLCP, ReportHandler } from 'web-vitals';

const reportWebVitals = (onReport?: ReportHandler) => {
  onCLS(metric => {
    console.log('Core Web Vitals: CLS', metric);
    onReport?.(metric);
  });
  onFID(metric => {
    console.log('Core Web Vitals: FID', metric);
    onReport?.(metric);
  });
  onLCP(metric => {
    console.log('Core Web Vitals: LCP', metric);
    onReport?.(metric);
  });
};

export default reportWebVitals;
