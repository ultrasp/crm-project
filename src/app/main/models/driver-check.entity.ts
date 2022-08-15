export interface IDriverCheckCollection {
  data: IDriverCheck[];
  total_elements: number;
}

export interface IDriverCheck  {
  driver_id: number;
  edit_by: number;
  edit_date: string;
  end_date: string;
  id: number;
  note: string;
  result_id: number;
  signed: boolean;
  start_date: string;
  type_id: number;
}
