export  interface IAccessCollection {
  data: IAccess[];
  total_elements: number;
}

export interface IAccess {
  description: string,
  edit_by: number,
  edit_date: string,
  id: number,
  key: string,
  name: string,
  parent_id: number
}
