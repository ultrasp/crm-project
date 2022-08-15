import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { ownerPanelSearchRequest } from "src/app/main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";

export class EmployeeChangeMilitaryTitle extends AbstractCrmSearchRequest {

  military_title_id!: string;

  given_by!: string;

  military_date!:string;

  comment!:string;

  employee_id!:string;

  constructor() {
    super(CrmApiUrl.EMPLOYEE_CHANGE_MILITARY_TITLE);
  }


  public getEmployeeId(): string {
    return this.employee_id;
  }

  public setEmployeeId(value: string){
    this.employee_id = value;
  }

}
