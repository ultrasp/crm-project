import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractDriverSearchRequest } from "../../abstract/AbstractDriverSearchRequest";

export class Driver extends AbstractDriverSearchRequest {

  id!: string;

  constructor() {
    super(CrmApiUrl.DRIVER_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }


}
