export interface GspResponse {
  data: GspInfo[];
  error_code: string;
  message: string;
  ok: boolean;
  status: number;
}

interface GspInfo {
  address: Address;
  birth_country: string;
  birth_country_id: number;
  birth_date: string;
  birth_place: string;
  birth_place_id: number;
  citizenship: string;
  citizenship_id: number;
  date_begin_document: string;
  date_end_document: string;
  doc_give_place: string;
  doc_giveplace_id: number;
  document: string;
  id: number;
  livestatus: number;
  name_engl: string;
  name_latin: string;
  nationality: string;
  nationality_id: number;
  patronym_latin: string;
  pnfl: string;
  sex: number;
  surname_engl: string;
  surname_latin: string;
}

interface Address {
  address: string;
  block: string;
  cadas_id: string;
  city_id: number;
  country_id: number;
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