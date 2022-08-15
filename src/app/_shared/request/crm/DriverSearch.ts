import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractDriverSearchRequest } from "../../abstract/AbstractDriverSearchRequest";

export class DriverSearch extends AbstractDriverSearchRequest {
  cadastre_number!: string;
  certificate_block_end!: string;
  certificate_block_start!: string;
  certificate_flag!: number;
  certificate_given_date!: string;
  certificate_issue_date!: string;
  certificate_number!: string;
  certificate_state!: number;
  citizenship_id!: number;
  city_id!: string;
  email!: string;
  first_name!: string;
  from_born_date!: string;
  from_deprivation!: string;
  id!: string;
  last_name!: string;
  middle_name!: string;
  passport_number!: string;
  pnfl!: string;
  region_id!: string;
  sex_id!: string;
  statuses!: number[];
  to_born_date!: string;
  to_deprivation!: string;
  constructor() {
    super(CrmApiUrl.DRIVER_SEARCH);
  }

  public setId(value: string){
    this.id = value;
  }

  public setFirstName(firstName: string) {
    this.first_name = firstName;
  }
  public getFirstName() {
    return this.first_name;
  }

  public setLastName(lastName: string) {
    this.last_name = lastName;
  }
  public getLastName() {
    return this.last_name;
  }

  public setMiddleName(middleName: string) {
    this.middle_name = middleName;
  }
  public getMiddleName() {
    return this.middle_name;
  }

  public setFromBornDate(bornDate: string) {
    this.from_born_date = bornDate;
  }
  public getFromBornDate() {
    return this.from_born_date;
  }

  public setToBornDate(bornDate: string) {
    this.to_born_date = bornDate;
  }
  public getToBornDate() {
    return this.to_born_date;
  }



}
