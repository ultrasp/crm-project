export interface IDriverSaveWithDetails {
  data: IDriverData;
  error_code: string;
  message: string;
  status: number;
}

export interface IDriverData {
  addresses: Address[];
  attributes: Attribute[];
  certificates: Certificate[];
  documents: Document[];
  driver: Driver;
}

interface Driver {
  born_city_id: number;
  born_country_id: number;
  born_date: string;
  born_place: string;
  born_region_id: number;
  citizenship_id: number;
  die_date: string;
  edit_by: number;
  edit_date: string;
  email: string;
  first_name: string;
  flag: number;
  id: number;
  last_name: string;
  middle_name: string;
  pnfl: string;
  rfirst_name: string;
  rlast_name: string;
  rmiddle_name: string;
  sex_id: number;
  status: number;
  ufirst_name: string;
  ulast_name: string;
  umiddle_name: string;
}

interface Document {
  document_number: string;
  driver_id: number;
  edit_by: number;
  edit_date: string;
  given_by: string;
  given_date: string;
  id: number;
  issue_date: string;
  type_id: number;
}

interface Certificate {
  block_end: string;
  block_start: string;
  branch_id: number;
  document_number: string;
  driver_id: number;
  edit_by: number;
  edit_date: string;
  flag: number;
  given_date: string;
  id: number;
  issue_date: string;
  note: string;
  state_id: number;
}

interface Attribute {
  driver_id: number;
  edit_by: number;
  edit_date: string;
  id: number;
  key: string;
  value: string;
}

interface Address {
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
  type_id: number;
}