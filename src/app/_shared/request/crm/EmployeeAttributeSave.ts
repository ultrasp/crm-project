import {
  CrmApiUrl
} from "src/app/common/enums/crm-api-urls.enum";
import { ObjectAttributeItem, saveAttributesRequest } from "src/app/common/widgets/AttributeSetupPanel/AttributeSetupPanel";
import {
  AbstractCrmRequest
} from "../../abstract/AbstractCrmRequest";

export class EmployeeAttributeSave extends AbstractCrmRequest  implements saveAttributesRequest{

  attributes!: ObjectAttributeItem[];

  employee_id!: string;


  constructor() {
    super(CrmApiUrl.ATTRIBUTE_SAVE);
  }


  public getEmployeeId(): string {
    return this.employee_id;
  }

  public setEmployeeId(value: string) {
    this.employee_id = value;
  }

  public setOwnerId(value:string){
    this.employee_id = value;
  }
}

