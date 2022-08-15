export interface CarTuningCollection {
  data: CarTuning[];
  total_elements: number;
}

export interface CarTuning {
  car_id: number;
  document_number: number;
  edit_by: number;
  edit_date: string;
  given_by: string;
  given_date: string;
  id: string;
  issue_date: string;
  type_id: string;
  ud1: string;
  ud2: string;
  ud3: string;
}

