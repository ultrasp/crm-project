export interface CarClientCollection {
  data: CarClient;
  error_code: string;
  message: string;
  status: number;
}

export interface CarClient {
  client_relations: Clientrelation[];
  doc_id: string;
  edit_by: number;
  edit_date: string;
  id: string;
  name: string;
  phone: string;
  region_id: number;
  sector: number;
  state: number;
}

export interface Clientrelation {
  car_id: number;
  client_id: number;
  country_id: number;
  document_number: string;
  document_serial: string;
  drb_number: string;
  edit_by: number;
  edit_date: string;
  end_date: string;
  id: number;
  reason_id: number;
  start_date: string;
  state_id: number;
}