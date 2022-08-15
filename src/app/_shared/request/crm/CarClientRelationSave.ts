import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";
export class CarClientRelationSave extends AbstractCarRequest  {

  agr_blank!: string;
  agr_date!: string;
  agr_dni_id!: number;
  agr_notary_id!: number;
  agr_number!: string;
  agr_reestr!: string;
  agr_type_id!: number;
  branch_id!: number;
  car_id!: string;
  client_id!: string;
  country_id!: number;
  document_number!: string;
  document_serial!: string;
  drb_number!: string;
  end_date!: string;
  id!: number;
  reason_id!: number;
  start_date!: string;
  state_id!: number;
  constructor() {
    super(CrmApiUrl.CAR_CLIENT_RELATION_SAVE);
  }

}
