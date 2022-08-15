import {
  CrmApiUrl
} from "src/app/common/enums/crm-api-urls.enum";
import { ObjectAttributeItem, saveAttributesRequest } from "src/app/common/widgets/AttributeSetupPanel/AttributeSetupPanel";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";

export class CarCompanyAttributeSave extends AbstractCarRequest  implements saveAttributesRequest{

  attributes!: ObjectAttributeItem[];

  company_id!: string;


  constructor() {
    super(CrmApiUrl.CAR_COMPANY_ATTRIBUTE_SAVE_LIST);
  }



  public setCompanyId(value: string) {
    this.company_id = value;
  }

  public setOwnerId(value:string){
    this.setCompanyId(value);
  }
}

