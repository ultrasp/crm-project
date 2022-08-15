import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { ownerPanelSearchRequest } from "src/app/main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import { AbstractDriverSearchRequest } from "../../abstract/AbstractDriverSearchRequest";
import { IAddressGetRequest, IAddressRequest } from "../../abstract/interfaces/IAddressRequest";

export class DriverAddress extends AbstractDriverSearchRequest implements ownerPanelSearchRequest,IAddressGetRequest{

  id!: string;

  address!: string;

  driver_id!:string;

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
    super(CrmApiUrl.DRIVER_ADDRESS_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public setOwnerId(value: string){
    this.driver_id = value;
  }

}
