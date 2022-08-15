export  interface EmpAwardCollection {
  data: EmpAward[];
  total_elements: number;
}

export interface EmpAward {
  award_date: string;
  award_id: number;
  edit_by: number;
  edit_date: string;
  comment: string;
  employee_id: number;
  id: number;
}
