export interface ICertificateLastData  {
    data: ICertificateLast;
    error_code: string;
    message: string;
    ok: boolean;
    status: number;
  }

export  interface ICertificateLast {
    block_end: string;
    block_start: string;
    branch_id: number;
    document_number: string;
    driver_id: number;
    edit_by: number;
    edit_date: string;
    flag: number;
    given_date: string;
    reason_id: number;
    id: number;
    issue_date: string;
    note: string;
    state_id: number;
  }
