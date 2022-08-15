export interface CarTechnicalInspectionListCollection {
  data: CarTechnicalInspection[];
  total_elements: number;
}

export interface CarTechnicalInspection {
  edit_by: number;
  car_id: number;
  edit_date: string;
  id: string;
  check_date: string;
  next_date: string;
  note: string;
  state_id: number;
}

