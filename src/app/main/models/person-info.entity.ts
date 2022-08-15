export  interface IPersonInfoCollection {
  data: IPersonInfo[];
  total_elements: number;
}

export interface IPersonInfo {
  born_date: string;
  branch_id: string;
  check_state_id: number;
  check_type_id: number;
  comment: string;
  doc_num: string;
  doc_type_id: number;
  edit_by: number;
  edit_date: string;
  first_name: string;
  given_by: string;
  given_by_id: number;
  given_date: string;
  id: string;
  issue_date: string;
  last_name: string;
  middle_name: string;
  person_id: number;
  pnfl: string;
  reason_id: number;
  send_date: string;
  sender_id: number;
  sex_id: number;
  type_id: number;
}