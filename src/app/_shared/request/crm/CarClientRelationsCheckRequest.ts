import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCarSearchRequest } from "../../abstract/AbstractCarSearchRequest";

export class CarClientRelationsCheckRequest extends AbstractCarSearchRequest {

  id!:number

  constructor() {
    super(CrmApiUrl.CAR_CLIENT_RELATION_CHECK);
  }
}
