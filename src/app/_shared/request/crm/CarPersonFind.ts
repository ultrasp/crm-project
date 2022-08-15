import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarSearchRequest } from "../../abstract/AbstractCarSearchRequest";

export class CarPersonFind extends AbstractCarSearchRequest {

  passport!: string;

  constructor() {
    super(CrmApiUrl.CAR_PERSON_GET);
  }

}
