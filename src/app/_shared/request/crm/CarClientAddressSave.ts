import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";
import { IAddressRequest } from "../../abstract/interfaces/IAddressRequest";

export class CarClientAddressSave extends AbstractCarRequest  implements IAddressRequest {

  block!: string;
  cadas_id!: string;
  city_id!: string;
  client_id!: string;
  flat!: string;
  house!: string;
  id!: string;
  massiv_id!: string;
  note!: string;
  region_id!: string;
  street_id!: string;
  type_id!: string;
  address!:string;
  street_name!:string;
  naspunkt!:string


  constructor() {
    super(CrmApiUrl.CAR_CLIENT_ADDRESS_SAVE);
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

  public setTypeId(value:string){
    this.type_id = value;
  }

}
