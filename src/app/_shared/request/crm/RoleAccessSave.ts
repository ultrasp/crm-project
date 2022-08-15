import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class RoleAccessSave extends AbstractCrmRequest {

  access_id!: number;

  role_id!: number;

  type!: number;

  constructor() {
    super(CrmApiUrl.ROLE_ACCESS_SAVE);
  }

  public setRoleId(val:number) {
    this.role_id = val;
  }
  public setAccessId(val:number) {
    this.access_id = val;
  }
  public setType(val:number) {
    this.type = val;
  }
}


