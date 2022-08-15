import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";

export class CarPersonSave extends AbstractCarRequest {

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
    super(CrmApiUrl.CAR_PERSON_SAVE);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

}
