export interface DrbStateListCollection {
  data: DrbStateLog[];
  total_elements: number;
}

export interface DrbStateLog {
  date: string,
  start_date: string,
  end_date: string,
  id: number,
  drb_count: number,
  drb: string,
  type_id: number,
  state_id: number,
  note: string,
}
