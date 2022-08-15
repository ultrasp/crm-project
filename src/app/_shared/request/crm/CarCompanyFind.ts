import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarSearchRequest } from "../../abstract/AbstractCarSearchRequest";

export class CarCompanyFind extends AbstractCarSearchRequest {

  inn!: string;

  constructor() {
    super(CrmApiUrl.CAR_COMPANY_GET);
  }

}
