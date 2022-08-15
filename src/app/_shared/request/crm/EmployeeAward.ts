import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { ownerPanelSearchRequest } from "src/app/main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";

export class EmployeeAward extends AbstractCrmSearchRequest implements ownerPanelSearchRequest {

  id!: string;

  address!: string;

  employee_id!:string;

  constructor() {
    super(CrmApiUrl.EMPLOYEE_AWARD_LIST);
  }

  setOwnerId(ownerId: string): void {
    this.setEmployeeId(ownerId)
  }


  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public getEmployeeId(): string {
    return this.employee_id;
  }

  public setEmployeeId(value: string){
    this.employee_id = value;
  }

}
