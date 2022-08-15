import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";

export class Country extends AbstractCrmSearchRequest {

  id!: string;

  name!: string;

  constructor() {
    super(CrmApiUrl.COUNTRY_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string){
    this.name = value;
  }

}
