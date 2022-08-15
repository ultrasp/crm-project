export interface IRefTreeCollection {
  data: IRefTree[];
  total_elements: number;
}

export interface IRefTree {
  edit_by: number;
  edit_date: string;
  id: string;
  key: number;
  name: string;
  order: number;
  parent_key: number;
  type_id: number;
}