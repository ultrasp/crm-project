import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { ObjectAttributeItem, saveAttributesRequest } from "src/app/common/widgets/AttributeSetupPanel/AttributeSetupPanel";
import { AbstractCarSearchRequest } from "../../abstract/AbstractCarSearchRequest";

export class CarAttribute extends AbstractCarSearchRequest implements saveAttributesRequest {

  id!: string;

  key!:string;
  
  car_id!:string;

  attributes!:ObjectAttributeItem[];

  constructor() {
    super(CrmApiUrl.CAR_ATTRIBUTE_LIST);
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

}
