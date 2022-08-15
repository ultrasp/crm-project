import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class ReferenceDelete extends AbstractCrmRequest {

  id!: string;

  type_id!:string;

  constructor() {
    super(CrmApiUrl.REFERENCE_DELETE);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public getTypeId(): string {
    return this.type_id;
  }

  public setTypeId(value: string){
    this.type_id = value;
  }
}
