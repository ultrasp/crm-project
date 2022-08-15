import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class EmployeeMilitarySave extends AbstractCrmRequest  {

  id!: string;

  military_title_id!: string;

  military_date!:string;

  employee_id!:string;

  edit_by!:string;
  constructor(id:string) {
    super(id ? CrmApiUrl.EMPLOYEE_MILITARY_UPDATE : CrmApiUrl.EMPLOYEE_MILITARY_ADD);
    this.id =id;
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
