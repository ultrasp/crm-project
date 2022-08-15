import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import {AbstractFileRequest} from "../../abstract/AbstractFileRequest";

export class EmployeeAttachmentDownload extends AbstractFileRequest{

  constructor(id: string) {
    super(CrmApiUrl.EMPLOYEE_ATTACHMENT_DOWNLOAD + '/' + id);
  }

}
