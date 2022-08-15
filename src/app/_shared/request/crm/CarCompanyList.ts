import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";
import {AbstractCarSearchRequest} from "../../abstract/AbstractCarSearchRequest";

export class CarCompanyList extends AbstractCarSearchRequest {

  garaj!: string;

  id!: string;

  name!: string;

  tax_id!: string;

  type_id!: string;


  constructor() {
    super(CrmApiUrl.CAR_COMPANY_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

}
