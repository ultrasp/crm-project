export interface IEmployeeDocumentCollection {
  data: IEmployeeDocument[];
  total_elements: number;
}

export interface IEmployeeDocument {
  document_number: string;
  edit_by: number;
  edit_date: string;
  employee_id: number;
  given_by: string;
  given_by_id:string;
  given_date: string;
  id: number;
  issue_date: string;
  type_id: number;
}
