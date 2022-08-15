export interface IRefTypeCollection {
  totalElements: number;
  data: IRefType[];
}

export interface IRefType {
  id: string;
  key: string;
  name: string;
  category_id?: any;
  readonly?: any;
}