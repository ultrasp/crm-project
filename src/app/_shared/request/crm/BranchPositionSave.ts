import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";
import {AbstractCrmRequest} from "../../abstract/AbstractCrmRequest";

export class BranchPositionSave extends AbstractCrmRequest {

  id!: string;
  branch_id!: string;
  quantity!: string;
  position_id!: string;
  start_date!: string;
  end_date!: string | null;


  constructor() {
    super(CrmApiUrl.BRANCH_POSITION_SAVE);
  }

  public setBranchId(value: string) {
    this.branch_id = value;
  }

  public getBranchId() {
    return this.branch_id;
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }


}
