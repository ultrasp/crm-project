import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class EmployeeEducationSave extends AbstractCrmRequest {

  id!: string;

  address!: string;

  employee_id!:string;

  constructor(id:string) {
    super(id ? CrmApiUrl.EMPLOYEE_EDUCATION_UPDATE : CrmApiUrl.EMPLOYEE_EDUCATION_ADD);
    this.id  = id;
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
