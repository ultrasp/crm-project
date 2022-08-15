import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCarInfoRequest } from "../../abstract/AbstractCarInfoRequest";

export class PersonInfoCheckSave extends AbstractCarInfoRequest{

  check_state_id!: number;
  comment!: string | null;
  id!: number;
  person_id!: number;
  pnfl!: string;

  constructor() {
    super(CrmApiUrl.PERSON_INFO_CHECK_SAVE);
  }

}
