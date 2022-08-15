import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";

export class CarClientSave extends AbstractCarRequest {

  doc_id!: string;
  id!: number;
  name!: string;
  phone!: string;
  region_id?: number;
  sector?: number;
  state?: number;


  constructor() {
    super(CrmApiUrl.CAR_CLIENT_SAVE);
  }

 

}
