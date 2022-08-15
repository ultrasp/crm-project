import { ICarModel } from "./car-model.entity";

export interface ICarModelSaveCollection {
  data: ICarModel;
  error_code: string;
  message: string;
  ok: boolean;
  status: number;
}

