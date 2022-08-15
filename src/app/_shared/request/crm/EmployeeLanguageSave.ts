import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class EmployeeLanguageSave extends AbstractCrmRequest {

  id!: string;

  degree!: string;

  employee_id!: string;

  lang_id!: string;

  constructor() {
    super(CrmApiUrl.EMPLOYEE_LANGUAGE_SAVE);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

  public getEmployeeId(): string {
    return this.employee_id;
  }

  public setEmployeeId(value: string) {
    this.employee_id = value;
  }

  public getDegree(): string {
    return this.degree;
  }

  public setDegree(value: string) {
    this.degree = value;
  }

  public getLangId(): string {
    return this.lang_id;
  }

  public setLangId(value: string) {
    this.lang_id = value;
  }
}
