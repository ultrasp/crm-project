import {
  CrmApiUrl
} from "src/app/common/enums/crm-api-urls.enum";
import { ObjectAttributeItem } from "src/app/common/widgets/AttributeSetupPanel/AttributeSetupPanel";
import { AbstractDriverRequest } from "../../abstract/AbstractDriverRequest";

export class DriverAttributeSave extends AbstractDriverRequest {

  attributes!: ObjectAttributeItem[];

  driver_id!: string;


  constructor() {
    super(CrmApiUrl.DRIVER_ATTRIBUTE_SAVE);
  }


  public setOwnerId(value: string) {
    this.driver_id = value;
  }

}

