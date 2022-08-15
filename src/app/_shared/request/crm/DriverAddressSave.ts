import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractDriverRequest } from "../../abstract/AbstractDriverRequest";
import { IAddressRequest } from "../../abstract/interfaces/IAddressRequest";

export class DriverAddressSave extends AbstractDriverRequest  implements IAddressRequest{

  id!: string;

  address!:string;

  block!:string;

  cadas_id!:string;

  note!:string;

  country_id!:string;

  region_id!: string;

  city_id!:string;

  flat!:string;

  house!:string;

  massiv_id!:string;

  street_id!:string;

  driver_id!:string;

  type_id!:string;

  street_name!:string;
  naspunkt!:string

  constructor() {
    super(CrmApiUrl.DRIVER_ADRESS_SAVE);
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

  public setTypeId(value:string){
    this.type_id = value;
  }

}
