export interface IEmployeeMilitaryCollection {
  data: IEmployeeMilitary[];
  total_elements: number;
}

export  interface IEmployeeMilitary {
  edit_by: number;
  edit_date: string;
  given_by: string;
  employee_id: number;
  id: number;
  military_date: string;
  military_title_id: number;
}
