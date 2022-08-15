import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import {AbstractCarRequest} from "../../abstract/AbstractCarRequest";

export class DrbStateLogDelete extends AbstractCarRequest{

  constructor(id: string) {
    super(CrmApiUrl.CAR_DRB_STATE_DELETE + '/' + id);
  }

}
