export interface IReferenceSaveCollection {
  data: IReference;
  error_code: string;
  message: string;
  ok: boolean;
  status: number;
}

export  interface IReference {
  id: number;
  key: number;
  type_id: number;
  name: string;
  order: number;
}
