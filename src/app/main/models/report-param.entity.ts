export interface IReportParamCollection {
  data: IReportParam[];
  total_elements: number;
}

export  interface IReportParam {
  component: string;
  data_type: number;
  id: string;
  name: string;
  order: number;
  report_id: number;
}