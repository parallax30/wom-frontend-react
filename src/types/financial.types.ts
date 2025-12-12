export interface ReportItem {
  title: string;
  url: string;
}

export interface FinancialReportsProps {
  data: {
    [year: string]: {
      [quarter: string]: ReportItem[];
    };
  };
}
