import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { ownerPanelSearchRequest } from "src/app/main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import { IAddressGetRequest} from "../../abstract/interfaces/IAddressRequest";
import {AbstractCarSearchRequest} from "../../abstract/AbstractCarSearchRequest";

export class CarClientAddress extends AbstractCarSearchRequest implements ownerPanelSearchRequest,IAddressGetRequest{

  id!: string;

  address!: string;

  client_id!:string;

  type_id!:string;

  block!: string;
  cadas_id!: string;
  city_id!: string;
  flat!: string;
  house!: string;
  massiv_id!: string;
  note!: string;
  region_id!: string;
  street_id!: string;
  street_name!:string;
  naspunkt!:string

  constructor() {
    super(CrmApiUrl.CAR_CLIENT_ADDRESS_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public setOwnerId(value: string){
    this.client_id = value;
  }

}
