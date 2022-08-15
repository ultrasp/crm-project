import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class UserBlock extends AbstractCrmRequest {

  user_id!: string;

  constructor(user_id:string) {
    super(CrmApiUrl.USER_BLOCK + '/' + user_id);
    this.user_id = user_id;
  }

  public setUserId() {
  }

}
