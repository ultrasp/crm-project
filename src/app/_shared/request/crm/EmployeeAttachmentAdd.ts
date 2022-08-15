import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";
import {AbstractCrmRequest} from "../../abstract/AbstractCrmRequest";
import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";

export class EmployeeAttachmentAdd extends AbstractCrmRequest {

  id!: string;
  attachment_id!: string;
  employee_id!: string;
  type_id!: string;

  constructor() {
    super(CrmApiUrl.EMPLOYEE_ATTACHMENT_ADD);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public setAttachmentId(attachmentId: string) {
    this.attachment_id = attachmentId;
  }
  public getAttachmentId() {
    return this.attachment_id;
  }

  public setEmployeeId(employeeId: string) {
    this.employee_id = employeeId;
  }
  public getEmployeeId() {
    return this.employee_id;
  }

  public setTypeId(typeId: string) {
    this.type_id = typeId;
  }
  public getTypeId() {
    return this.type_id;
  }

public setOwnerId(ownerId: string) {
    this.setEmployeeId(ownerId);
  }

}
