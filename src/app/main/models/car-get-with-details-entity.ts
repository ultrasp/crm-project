import {
  ICar,
  ICaraddress,
  ICarattribute,
  ICarclientrelation,
  IClient,
  ICompany,
  IPerson
} from "./car-save-with-details-entity";

export interface ICarGetWithDetailsResponse {
  data: ICarSaveWithDetails;
  error_code: string;
  message: string;
  ok: boolean;
  status: number;
}

interface ICarSaveWithDetails {
  car: ICar;
  car_address: ICaraddress;
  car_attributes: ICarattribute[];
  car_client_relation: ICarclientrelation;
  client: IClient;
  company?: ICompany;
  person?: IPerson;
}



