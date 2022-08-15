import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarSearchRequest } from "../../abstract/AbstractCarSearchRequest";

export class CarSearchShortRequest extends AbstractCarSearchRequest {

  drb!: string;
  technical_number!: string;

  constructor() {
    super(CrmApiUrl.CAR_SEARCH_SHORT);
  }
}
