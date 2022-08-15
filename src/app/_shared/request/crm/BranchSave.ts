import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";
import {AbstractCrmRequest} from "../../abstract/AbstractCrmRequest";

export class BranchSave extends AbstractCrmRequest {

  id!: string;
  start_date!: string;
  end_date!: string | null;
  description!: string | null;
  name!: string | null;
  region_id!: string | null;
  city_id!: string | null;
  status!: string | null;
  type_id!: string | null;
  parent_id!: string | null;


  constructor() {
    super(CrmApiUrl.BRANCH_SAVE);
  }


  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }


}
