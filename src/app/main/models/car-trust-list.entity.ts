export interface CarTrustCollection {
  data: CarTrust[];
  total_elements: number;
}

export interface CarTrust {
  car_id: number;
  client_id: number;
  date_end: string;
  date_start: string;
  doc_date: string;
  doc_number: string;
  given_name: string;
  notary_name: string;
  notary_number: string;
  rid: string;
  state_id: number;
  user_date_birth: string;
  user_doc_num: string;
  user_name: string;
  user_stir: string;
  user_type: number;

}

