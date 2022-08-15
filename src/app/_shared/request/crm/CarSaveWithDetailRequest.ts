import { ICar, ICaraddress, ICarattribute, ICarclientrelation, IClient, ICompany, IPerson, IPersondocument } from "src/app/main/models/car-save-with-details-entity";
import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";

export class CarSaveWithDetailRequest extends AbstractCarRequest {

  car!: ICar;
  car_addresses!: ICaraddress[];
  car_attributes!: ICarattribute[];
  car_client_relation!: ICarclientrelation;
  client!: IClient;
  company!: ICompany;
  person!: IPerson;
  person_documents!: IPersondocument[];



  constructor() {
    super(CrmApiUrl.CAR_SAVE_WITH_DETAIL);
  }

}
