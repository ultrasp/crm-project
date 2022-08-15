export interface IDriverSearch {
  data: IDriverInfo[];
  total_elements: number;
}

export interface IDriverInfo {
  address_note: string;
  born_date: string;
  cadastre_number: string;
  certificate_block_end: string;
  certificate_block_start: string;
  certificate_flag: number;
  certificate_given_date: string;
  certificate_issue_date: string;
  certificate_number: string;
  certificate_state: number;
  citizenship_id: number;
  city_id: number;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  massiv_id: number;
  middle_name: string;
  passport_number: string;
  pnfl: string;
  region_id: number;
  sex_id: number;
  status: number;
  street_id: number;
}