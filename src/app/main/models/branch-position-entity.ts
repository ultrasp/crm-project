export interface BranchPositionCollection {
  data: BranchPosition[];
  total_elements: number;
}

export  interface BranchPosition {
  branch_id: number;
  edit_by: number;
  edit_date: string;
  end_date: string;
  id: number;
  position_id: number;
  quantity: number;
  start_date: string;
}
