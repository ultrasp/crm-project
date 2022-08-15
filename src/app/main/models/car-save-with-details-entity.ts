export interface ICarSaveWithDetailsResponse {
  data: ICarSaveWithDetails;
  error_code: string;
  message: string;
  ok: boolean;
  status: number;
}

interface ICarSaveWithDetails {
  car: ICar;
  car_addresses: ICaraddress[];
  car_attributes: ICarattribute[];
  car_client_relation: ICarclientrelation;
  client: IClient;
  company?: ICompany;
  person?: IPerson;
  person_documents?: IPersondocument[];
}

export interface IPersondocument {
  document_number: string;
  given_by: string;
  given_date: string;
  issue_date: string;
  type_id: number;
}

export interface IPerson {
  born_city_id: number;
  born_country_id: number;
  born_date: string;
  born_place: string;
  born_region_id: number;
  citizenship_id: number;
  die_date?: string;
  email?: string;
  first_name: string;
  flag?: number;
  id?: number;
  last_name: string;
  middle_name: string;
  pnfl: string;
  sex_id: number;
}

export interface ICompany {
  garaj: string;
  id?: number;
  name: string;
  tax_id: string;
  type_id: number;
}

export interface IClient {
  doc_id: string;
  id: number;
  name: string;
  phone: string;
  region_id: number;
  sector: number;
  state?: number;
}

export interface ICarclientrelation {
  agr_blank: string;
  agr_date: string;
  agr_dni_name: string;
  agr_notary_name: string;
  agr_number: string;
  agr_reestr: string;
  agr_type_id: number;
  branch_id: number;
  document_number: string;
  document_serial: string;
  drb_number: string;
  end_date?: string;
  old_drb_number?: string;
  extra_note?: string;
  spec_note?: string;
  id?: number;
  reason_id: number;
  start_date: string;
  state_id: number;
}

export interface ICarattribute {
  key: string;
  value: string;
}

export interface ICaraddress {
  address: string;
  block: string;
  cadas_id: string;
  city_id: number;
  flat: number;
  country_id: number;
  house: string;
  // massiv_id: number;
  note: string;
  region_id: number;
  // street_id: number;
  type_id: number;
  street_name:string;
  naspunkt_name:string;
}

export interface ICar {
  body_number: string;
  body_type_id: number;
  brand_id: number;
  chassis_number: string;
  color_id: number;
  sub_color_id?: number;
  country_id: number;
  engine_number: string;
  flag?: number;
  fuel_type_id: number;
  id?: number;
  model_id: number;
  salon_id?: number;
  type_id: number;
  vin_code: string;
  year: number;
  sub_color_name:string;
}
