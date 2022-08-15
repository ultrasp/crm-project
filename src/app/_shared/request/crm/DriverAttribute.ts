import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { ObjectAttributeItem, saveAttributesRequest } from "src/app/common/widgets/AttributeSetupPanel/AttributeSetupPanel";
import { AbstractDriverSearchRequest } from "../../abstract/AbstractDriverSearchRequest";

export class DriverAttribute extends AbstractDriverSearchRequest implements saveAttributesRequest {

  id!: string;

  key!:string;
  
  driver_id!:string;

  attributes!:ObjectAttributeItem[];

  constructor() {
    super(CrmApiUrl.DRIVER_ATTRIBUTE_LIST);
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
