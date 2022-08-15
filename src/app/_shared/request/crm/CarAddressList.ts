import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";
import { IAddressGetRequest, IAddressRequest } from "../../abstract/interfaces/IAddressRequest";
import {AbstractCarSearchRequest} from "../../abstract/AbstractCarSearchRequest";

export class CarAddressList extends AbstractCarSearchRequest  implements IAddressGetRequest {

  block!: string;
  cadas_id!: string;
  city_id!: string;
  car_id!: string;
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
    super(CrmApiUrl.CAR_ADDRESS_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public setOwnerId(value: string){
    this.car_id = value;
  }

  public setTypeId(value:string){
    this.type_id = value;
  }

}
