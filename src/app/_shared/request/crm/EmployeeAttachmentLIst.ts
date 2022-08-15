import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import {AbstractFileRequestSearch} from "../../abstract/AbstractFileRequestSearch";
import {ownerPanelSearchRequest} from "../../../main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";

export class EmployeeAttachmentList extends AbstractFileRequestSearch implements ownerPanelSearchRequest{

  id!: string;
  attachment_id!: string;
  owner_id!: string;
  type_id!: string;

  constructor() {
    super(CrmApiUrl.EMPLOYEE_ATTACHMENT_LIST);
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
    this.owner_id = employeeId;
  }
  public getEmployeeId() {
    return this.owner_id;
  }

  public setTypeId(typeId: string) {
    this.type_id = typeId;
  }
  public getTypeId() {
    return this.type_id;
  }

  setOwnerId(ownerId: string): void {
    this.setEmployeeId(ownerId);
  }
}
