export interface IUserCollection {
  data: IUser[];
  total_elements: number;
}

export interface IUser {
  branch_id: string,
  edit_by: string;
  edit_date: string;
  employee_id:string, 
  flag: number;
  id: string;
  name: string;
  password: string;
  role_id: string;
  username: string;
}