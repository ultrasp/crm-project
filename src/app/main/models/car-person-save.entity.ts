export interface ICarPersonSave {
  data: ICarPerson;
  error_code: string;
  message: string;
  status: number;
}

export interface ICarPerson {
  born_country_id: number;
  born_date: string;
  born_region_id: number;
  citizenship_id: number;
  die_date: string;
  edit_by: number;
  edit_date: string;
  email: string;
  first_name: string;
  flag: number;
  id: string;
  last_name: string;
  middle_name: string;
  pnfl: string;
  sex_id: number;
}
