export interface EmployeeCollection {
  data: Employee[];
  total_elements: number;
}

export  interface Employee {
  academic_degree_id: number;
  academic_type_id: number;
  born_date: string;
  branch_id: number;
  citizenship_id: number;
  edit_by: number;
  edit_date: string;
  first_name: string;
  id: number;
  last_name: string;
  middle_name: string;
  military_id: string;
  military_title_id: number;
  nationality_id: number;
  party_member: boolean;
  pnfl: string;
  position_id: number;
  sex_id: number;
  token_id: string;
  profession_id:string;
}