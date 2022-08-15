export  interface IEmployeeExperienceCollection {
  data: IEmployeeExperience[];
  total_elements: number;
}

export interface IEmployeeExperience {
  edit_by: number;
  edit_date: string;
  employee_id: number;
  end_date: string;
  id: number;
  position_id: number;
  start_date: string;
  work_address: string;
  work_place: string;
}