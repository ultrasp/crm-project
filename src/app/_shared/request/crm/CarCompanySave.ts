import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";

export class CarCompanySave extends AbstractCarRequest {

  garaj!: string;

  id!: string;

  name!: string;

  tax_id!: string;

  type_id!: string;


  constructor() {
    super(CrmApiUrl.CAR_COMPANY_SAVE);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

}
