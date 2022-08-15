import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class EmployeeAwardSave extends AbstractCrmRequest {

  id!: string;

  award_id!: string;

  award_date!: string;

  edit_by!:string;

  employee_id!:string;

  constructor(id:string) {
    super(id ? CrmApiUrl.EMPLOYEE_AWARD_UPDATE : CrmApiUrl.EMPLOYEE_AWARD_ADD);
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public getAwardId(): string {
    return this.award_id;
  }

  public setAwardId(value: string){
    this.award_id = value;
  }

  public getAwardDate(): string {
    return this.award_date;
  }

  public setAwardDate(value: string){
    this.award_date = value;
  }

  public getEditBy(): string {
    return this.edit_by;
  }

  public setEditBy(value: string){
    this.edit_by = value;
  }

  public setEmployeeId(value: string){
    this.employee_id = value;
  }
}
