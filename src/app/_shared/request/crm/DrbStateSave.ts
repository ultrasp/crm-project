import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";

export class DrbStateSave extends AbstractCarRequest {

  drb_count!: string;
  drb!: string;
  date!: string;
  id!: string;
  note!: string;
  type_id!: string;
  start_date!: string;
  end_date!: string;
  state_id!: string;

  constructor() {
    super(CrmApiUrl.CAR_DRB_STATE_SAVE);
  }

}
