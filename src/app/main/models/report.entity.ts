export interface IReportCollection {
  data: IReport[];
  total_elements: number;
}

export interface IReport {
  branch_id: number;
  content_type: string;
  edit_by: number;
  edit_date: string;
  executor: string;
  flag: number;
  id: string;
  name: string;
  order: number;
  parent_id: string;
  security_role: string;
  sql_body: string;
  template_name: string;
}