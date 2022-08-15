export interface ICarPersonList {
  data: ICarPerson[];
  total_elements: number
}

export interface ICarPerson {
  born_country_id: number;
  born_date: string;
  born_region_id: string;
  citizenship_id: number;
  edit_date: string;
  die_date: string;
  email: string;
  first_name: number;
  flag: string;
  last_name: number;
  middle_name: string;
  pnfl: number;
  sex_id: string;
  id:string;
}
