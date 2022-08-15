import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { ownerPanelSearchRequest } from "src/app/main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class EmployeeDismissal extends AbstractCrmRequest {

  document_number!:string;

  left_date!: Date;

  employee_id!:string;
  note!:string;
  reason_id!:string;
  
  constructor() {
    super(CrmApiUrl.EMPLOYEE_DISMISSAL);
  }


  public getEmployeeId(): string {
    return this.employee_id;
  }

  public setEmployeeId(value: string){
    this.employee_id = value;
  }

}
