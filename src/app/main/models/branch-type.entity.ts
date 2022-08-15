export interface IBranchTypeCollection {
  data: IBranchType[];
  total_elements: number;
}

export interface IBranchType {
  id: string;
  name: string;
  parent_id: number;
}
