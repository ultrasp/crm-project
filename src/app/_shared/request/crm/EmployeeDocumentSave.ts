import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class EmployeeDocumentSave extends AbstractCrmRequest {

  id!: string;

  document_number!: string;

  given_by!: string;

  given_date!:string;

  employee_id!:string;

  issue_date!:string;

  type_id!:string;

  constructor(id:string = '') {
    super(id  ? CrmApiUrl.EMPLOYEE_DOCUMENT_UPDATE : CrmApiUrl.EMPLOYEE_DOCUMENT_ADD);
    if(id) this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public setEmployeeId(value: string){
    this.employee_id = value;
  }
 
  public setOwnerId(value: string){
    this.employee_id = value;
  }

  public setDocNumber(val:string){
    this.document_number = val;
  }
}
