import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";

export class EmployeeDocuments extends AbstractCrmSearchRequest {

  id!: string;

  type_id!:string;

  employee_id!:string;
  
  constructor() {
    super(CrmApiUrl.EMPLOYEE_DOCUMENT_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public setOwnerId(value:string){
    this.employee_id = value;
  }

  public setTypeId(value:string){
    this.type_id = value;
  }
}
