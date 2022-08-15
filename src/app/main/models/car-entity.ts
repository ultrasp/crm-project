export interface CarCollection {
  data: ICar[];
  total_elements: number;
}

export interface CarSaveResponse {
  data: ICar;
  error_code: string;
  message: string;
  status: number;
}
export interface ICar {
  body_number: string,
  body_type_id: number,
  brand_id: number,
  chassis_number: string,
  color_id: number,
  country_id: number,
  edit_by:string,
  edit_date:string,
  engine_number: string,
  flag:number,
  fuel_type_id: number,
  id: string,
  model_id: number,
  salon_id:number,
  sub_color_id:number,
  type_id: number,
  vin_code: string,
  year: number
}

export interface Carattributes {
  car_id: number,
  edit_by: number,
  edit_date: string,
  id: number,
  key: string,
  value: string
}

export interface Carclientrelations {
  car_id: number,
  client_id: number,
  country_id: number,
  doc_number: string,
  doc_serial: string,
  drb_number: string,
  edit_by: number,
  edit_date: string,
  id: number,
  start_date: string,
}
