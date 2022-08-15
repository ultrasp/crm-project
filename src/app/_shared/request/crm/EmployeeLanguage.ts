import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { ownerPanelSearchRequest } from "src/app/main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";

export class EmployeeLanguage extends AbstractCrmSearchRequest implements ownerPanelSearchRequest {

  id!: string;

  degree!: string;

  employee_id!: string;

  lang_id!: string;

  constructor() {
    super(CrmApiUrl.EMPLOYEE_LANGUAGE_LIST);
  }

  setOwnerId(ownerId: string): void {
    this.setEmployeeId(ownerId);
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
