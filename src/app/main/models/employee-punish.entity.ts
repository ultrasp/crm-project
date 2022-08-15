export interface IEmpPunishCOllection {
  data: IEmpPunish[];
  total_elements: number;
}

export interface IEmpPunish {
  edit_by: number;
  edit_date: string;
  employee_id: number;
  id: number;
  punish_date: string;
  order_by: string;
  order_no: string;
  article: string;
  comment: string;
  punish_id: number;
}
