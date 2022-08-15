import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarCheckSearchRequest } from "../../abstract/AbstractCarInfoSearchRequest";

export class CarInfoParamSearchRequest extends AbstractCarCheckSearchRequest  {

  avto_color!: string;
  avto_model!: string;
  avto_type!: string;
  body_number!: string;
  car_info_id!: number;
  chassis_number!: string;
  engine_number!: string;
  id!: number;
  note!: string;
  search_type_id!: number;
  vin_code!: string;
  year!: number;

  
  constructor() {
    super(CrmApiUrl.CAR_INFO_PARAM_LIST);
  }

}
