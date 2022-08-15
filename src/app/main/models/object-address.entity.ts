export  interface IObjectAddressCollection {
  data: IObjectAddress[];
  total_elements: number;
}

export interface IObjectAddress {
  address: string;
  block: string;
  cadas_id: string;
  city_id: number;
  driver_id: number;
  flat: number;
  house: string;
  id: number;
  massiv_id: number;
  note: string;
  region_id: number;
  street_id: number;
  country_id?: number;
  type_id: number;
  naspunkt_name:string;
  street_name:string
}
