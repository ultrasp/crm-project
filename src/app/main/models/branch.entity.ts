export interface IBranchCollection {
  data: IBranch[];
  total_elements: number;
}

export interface IBranch {
  id: string;
  name: string;
  parent_id: number;
  city_id: number;
  description: string;
  end_date: string;
  start_date: string;
  region_id: number;
  type_id: number;
  status: number;
}
