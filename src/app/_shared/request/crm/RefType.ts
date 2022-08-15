import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";

export class RefType extends AbstractCrmSearchRequest {

  id!:string;
  
  key!: string;

  name!: string;

  category_id!:string;

  constructor() {
    super(CrmApiUrl.REFERENCE_TYPE_LIST);
  }

  public getKey(): string {
    return this.key;
  }

  public setKey(value: string){
    this.key = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string){
    this.name = value;
  }
}
