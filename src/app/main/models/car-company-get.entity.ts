export interface ICarCompanyGetCollection {
  data: ICarCompanyGet[];
  total_elements: number;
}

export interface ICarCompanyGet {
  addresses: ICarCompanyAddress[];
  company: ICarCompany;
}

export interface ICarCompany {
  attributes: Attribute[];
  edit_by: number;
  edit_date: string;
  garaj: string;
  id: string;
  name: string;
  tax_id: string;
  type_id: number;
}

interface Attribute {
  company_id: number;
  edit_by: number;
  edit_date: string;
  id: number;
  key: string;
  value: string;
}

interface ICarCompanyAddress {
  address: string;
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