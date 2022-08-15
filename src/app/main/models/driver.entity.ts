export interface IDriverCollection {
  data: IDriver[];
  total_elements: number;
}

export  interface IDriver {
  born_city_id: number;
  born_country_id: string;
  born_date: string;
  born_place: string;
  born_region_id: number;
  citizenship_id: string;
  die_date: string;
  edit_by: string;
  edit_date: string;
  email: string;
  first_name: string;
  flag: string;
  id: string;
  last_name: string;
  middle_name: string;
  pnfl: string;
  rfirst_name: string;
  rlast_name: string;
  rmiddle_name: string;
  sex_id: number;
  status: number;
  ufirst_name: string;
  ulast_name: string;
  umiddle_name: string;
}

