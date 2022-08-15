import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import {AbstractCarRequest} from "../../abstract/AbstractCarRequest";

export class CarGetWithDetails extends AbstractCarRequest{

  constructor(id: string,isHistory:number = 0) {
    super(CrmApiUrl.CAR_GET_WITH_DETAIL + '/' + id+'/'+isHistory);
  }

}
