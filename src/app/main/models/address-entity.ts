export  interface IAddressCollection {
  data: IAddress[];
  total_elements: number;
}

export interface IAddress {
  edit_by: number;
  edit_date: string;
  id: number;
  name: string;
  parent_id: number;
  type: number;
}