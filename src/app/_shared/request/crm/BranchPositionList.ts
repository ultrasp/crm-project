import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";

export class BranchPositionList extends AbstractCrmSearchRequest {

  id!: string;

  branch_id!: string;

  constructor() {
    super(CrmApiUrl.BRANCH_POSITION_LIST);
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
