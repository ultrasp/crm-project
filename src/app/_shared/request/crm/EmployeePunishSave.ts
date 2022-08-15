import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class EmployeePunishSave extends AbstractCrmRequest  {

  id!: string;

  employee_id!: string;

  article!: string;

  order_by!: string;

  order_no!: string;

  constructor(id:string) {
    super(id ? CrmApiUrl.EMPLOYEE_PUNISH_UPDATE : CrmApiUrl.EMPLOYEE_PUNISH_ADD);
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
