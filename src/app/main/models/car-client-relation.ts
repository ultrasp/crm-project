export interface CarClientRelationCollection {
  data: CarClientRelation[];
  total_elements: number,
}

export interface CarClientRelationSaveResponse {
  data: CarClientRelation[];
  error_code: string,
  message:string,
  status:string
}

export interface CarClientRelation {
  agr_blank: string;
  agr_date: string;
  agr_dni_name: string;
  agr_notary_name: string;
  agr_number: string;
  agr_reestr: string;
  agr_type_id: number;
  branch_id: number;
  car_id: number;
  client_id: number;
  country_id: number;
  document_number: string;
  document_serial: string;
  drb_number: string;
  edit_by: number;
  edit_date: string;
  end_date: string;
  extra_note: string;
  id: number;
  reason_id: number;
  spec_note: string;
  start_date: string;
  state_id: number;
}
