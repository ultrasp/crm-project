import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";

export class StatusFlagRequest extends AbstractCrmSearchRequest {

  target!: string;

  constructor() {
    super(CrmApiUrl.STATUS_FLAG_LIST);
  }

}
