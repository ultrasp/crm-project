import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarCheckSearchRequest } from "../../abstract/AbstractCarInfoSearchRequest";

export class CarInfoSearchRequest extends AbstractCarCheckSearchRequest  {

  body_number!: string;
  body_type_id!: number;
  born_date!: string;
  branch_id!: number;
  car_id!: number;
  chassis_number!: string;
  check_state_id!: number[];
  check_type_id!: number;
  color_id!: number;
  comment!: string;
  company_name!: string;
  doc_num!: string;
  doc_type_id!: number;
  drb_number!: string;
  engine_number!: string;
  first_name!: string;
  id!: string;
  last_name!: string;
  middle_name!: string;
  model_id!: number;
  reason_id!: number;
  sector!: number;
  send_date!: string;
  sender_id!: number;
  sex_id!: number;
  type_id!: number;
  vin_code!: string;
  year!: number;
  
  constructor() {
    super(CrmApiUrl.CAR_INFO_LIST);
  }

}
