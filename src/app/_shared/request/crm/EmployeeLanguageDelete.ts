import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class EmployeeLanguageDelete extends AbstractCrmRequest {

  constructor(id: string) {
    super(CrmApiUrl.EMPLOYEE_LANGUAGE_DELETE + '/' + id);
  }

}
