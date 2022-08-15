import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { ownerPanelSearchRequest } from "src/app/main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class EmployeeChangePosition extends AbstractCrmRequest {

  branch_id!: string;

  position_id!: string;

  employee_id!:string;

  constructor() {
    super(CrmApiUrl.EMPLOYEE_CHANGE_POSITION);
  }

  public setPositionId(value: string) {
    this.position_id = value;
  }

  public getPositionId() {
    return this.position_id;
  }

  public setBranchId(value: string) {
    this.branch_id = value;
  }

  public getBranchId() {
    return this.branch_id;
  }

  public getEmployeeId(): string {
    return this.employee_id;
  }

  public setEmployeeId(value: string){
    this.employee_id = value;
  }

}
