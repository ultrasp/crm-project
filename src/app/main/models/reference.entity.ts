export interface IReferenceCollection {
  totalElements: number;
  data: IReference[];
}

export  interface IReference {
  id: number;
  key: number;
  type_id: number;
  name: string;
  order: number;
}