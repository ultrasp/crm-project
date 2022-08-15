import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCarInfoRequest } from "../../abstract/AbstractCarInfoRequest";

export class CarInfoCheckSave extends AbstractCarInfoRequest{

  car_id!: number;
  check_state_id!: number;
  comment!: string |null;
  id!: string;

  constructor() {
    super(CrmApiUrl.CAR_INFO_CHECK_SAVE);
  }

}
