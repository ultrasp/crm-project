export interface IEmployeeAttributeCollection {
  data: IEmployeeAttribute[];
  total_elements: number;
}

export interface IEmployeeAttribute {
  edit_by: number;
  edit_date: string;
  employee_id: number;
  id: number;
  key: string;
  value: string;
}