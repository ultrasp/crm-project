import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";

export class AttributeSetup extends AbstractCrmSearchRequest {

  id!: string;

  key!:string;

  target!:string;
  
  constructor() {
    super(CrmApiUrl.ATTRIBUTE_SETUP_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

}
