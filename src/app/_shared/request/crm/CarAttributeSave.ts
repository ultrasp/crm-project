import {
  CrmApiUrl
} from "src/app/common/enums/crm-api-urls.enum";
import { ObjectAttributeItem, saveAttributesRequest } from "src/app/common/widgets/AttributeSetupPanel/AttributeSetupPanel";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";

export class CarAttributeSave extends AbstractCarRequest  implements saveAttributesRequest{

  attributes!: ObjectAttributeItem[];

  car_id!: string;


  constructor() {
    super(CrmApiUrl.CAR_ATTRIBUTE_SAVE_LIST);
  }



  public setCarId(value: string) {
    this.car_id = value;
  }

  public setOwnerId(value:string){
    this.setCarId(value);
  }
}

