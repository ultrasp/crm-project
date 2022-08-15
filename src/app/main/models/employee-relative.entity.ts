export interface IEmployeeRelativeCollection {
  data: IEmployeeRelative[];
  total_elements: number;
}

export interface IEmployeeRelative {
  born_date: string;
  born_place: string;
  edit_by: number;
  edit_date: string;
  employee_id: number;
  id: number;
  life_place: string;
  name: string;
  order: number;
  type_id: number;
  work_info: string;
  life_place_view: string;
}
