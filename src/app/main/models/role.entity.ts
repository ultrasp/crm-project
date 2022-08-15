export interface IRoleCollection {
  data: IRole[];
  total_elements: number;
}

export interface IRole {
  description: string;
  edit_by: number;
  edit_date: string;
  id: number;
  key: string;
  name: string;
  role_accesses: IRoleaccess[];
}

export  interface IRoleaccess {
  access_id: number;
  role_id: number;
  type: number;
}

export interface IRoleSaveRespponse {
  data: IRole;
  error_code: string;
  message: string;
  status: number;
  ok: boolean;
}