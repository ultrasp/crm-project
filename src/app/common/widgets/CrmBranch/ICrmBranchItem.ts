export interface ICrmBranchItem {
  id: number;
  name: string;
  parent_id: number;
  depth: number;
  hide: boolean;
  haveChild: boolean;
  isOpen: boolean;
  isSelected: boolean;
}
