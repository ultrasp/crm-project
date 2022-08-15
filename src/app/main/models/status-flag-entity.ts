export interface IStatusFlagResponse  {
  data: IStatusFlag[];
  total_elements: number;
}

interface IStatusFlag {
  flag: number;
  id: string;
  name: string;
  readonly: boolean;
  target: string;
}