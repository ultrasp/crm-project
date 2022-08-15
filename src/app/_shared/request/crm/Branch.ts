import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import {
  AbstractCrmSearchRequest
} from "../../abstract/AbstractCrmSearchRequest";

export class Branch extends AbstractCrmSearchRequest {

  name!: string;
  id!: number;
  parent_id!: string;

  constructor() {
    super(CrmApiUrl.BRANCH_LIST);
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string) {
    this.name = value;
  }

  public setParentId(value: string) {
    this.parent_id = value;
  }
}
