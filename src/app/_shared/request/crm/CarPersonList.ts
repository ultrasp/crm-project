import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";
import {AbstractCarSearchRequest} from "../../abstract/AbstractCarSearchRequest";

export class CarPersonList extends AbstractCarSearchRequest {

  born_country_id!: string;

  born_date!: string;

  born_region_id!: string;

  citizenship_id!: string;

  die_date!: string;

  email!: string;

  first_name!: string;

  flag!: string;

  id!: string;

  last_name!: string;

  middle_name!: string;

  pnfl!: string;

  sex_id!: string;


  constructor() {
    super(CrmApiUrl.CAR_PERSON_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

}
