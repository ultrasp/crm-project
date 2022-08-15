import {
  CrmApiUrl
} from "src/app/common/enums/crm-api-urls.enum";
import { ObjectAttributeItem, saveAttributesRequest } from "src/app/common/widgets/AttributeSetupPanel/AttributeSetupPanel";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";

export class CarPersonAttributeSave extends AbstractCarRequest  implements saveAttributesRequest{

  attributes!: ObjectAttributeItem[];

  person_id!: string;


  constructor() {
    super(CrmApiUrl.CAR_PERSON_ATTRIBUTE_SAVE_LIST);
  }



  public setPersonId(value: string) {
    this.person_id = value;
  }

  public setOwnerId(value:string){
    this.setPersonId(value);
  }
}

