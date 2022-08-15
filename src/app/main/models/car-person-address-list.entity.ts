export interface ICarPersonAddressList {
  data: ICarAddress[];
  total_elements: number
}

export interface ICarAddress {
  block: string;
  cadas_id: string;
  city_id: number;
  client_id: number;
  edit_by: number;
  edit_date: string;
  flat: number;
  house: string;
  id: number;
  massiv_id: number;
  note: string;
  region_id: number;
  street_id: number;
  type_id: number;
}
