// Simple performance reporting without web-vitals dependency
type ReportHandler = (metric: any) => void;

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Performance reporting is optional and can be implemented later
    console.log('Performance reporting would be called here');
  }
};

export default reportWebVitals;
