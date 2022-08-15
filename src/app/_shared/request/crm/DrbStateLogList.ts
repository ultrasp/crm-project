import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarSearchRequest } from "../../abstract/AbstractCarSearchRequest";

export class DrbStateLogList extends AbstractCarSearchRequest {

  id!: string;

  date!: string;

  drb!: string;

  drb_count!: string;

  type_id!: number;


  constructor() {
    super(CrmApiUrl.CAR_DRB_STATE_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }
}
