export interface IEmployeeAddressCollection {
  data: IEmployeeAddress[];
  total_elements: number;
}

export  interface IEmployeeAddress {
  edit_by: number;
  edit_date: string;
  educ_address: string;
  educ_organization: string;
  employee_id: number;
  end_date: string;
  id: number;
  start_date: string;
  type_id: number;
  document_number:string
}