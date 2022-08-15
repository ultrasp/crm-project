export interface IDriverCertificateCollection {
  data: IDriverCertificate[];
  total_elements: number;
}

export interface IDriverCertificate  {
  document_number: string;
  driver_id: number;
  edit_by: number;
  edit_date: string;
  flag: number;
  given_date: string;
  id: number;
  issue_date: string;
  state_id: number;
  type_id: number;
  branch_id: string;
  block_end: string;
  block_start: string;
  note: string;
  reason_id:number
}
