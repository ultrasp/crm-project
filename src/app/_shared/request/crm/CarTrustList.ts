import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import {AbstractCarSearchRequest} from "../../abstract/AbstractCarSearchRequest";

export class CarTrustList extends AbstractCarSearchRequest {

  id!: string;
  car_id!: string;
  client_id!: string;
  state_id!: string;
  notary_num!: string;
  notary_name!: string;
  doc_num!: string;
  doc_date!: string;
  date_start!: string;
  date_end!: string;
  giver_name!: string;
  user_name!: string;
  user_stir!: string;
  user_date_birth!: string;
  user_type!: string;
  rid!: string;


  constructor() {
    super(CrmApiUrl.CAR_TRUSTEE_LIST);
  }

  setOwnerId(ownerId: string): void {
    this.car_id = ownerId;
  }
}
