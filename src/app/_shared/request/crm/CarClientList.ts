import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import {AbstractCarSearchRequest} from "../../abstract/AbstractCarSearchRequest";

export class CarClientList extends AbstractCarSearchRequest {

  doc_id!: string;
  id!: number;
  name!: string;
  phone!: string;
  region_id?: number;
  sector?: number;
  state?: number;


  constructor() {
    super(CrmApiUrl.CAR_CLIENT_LIST);
  }



}
