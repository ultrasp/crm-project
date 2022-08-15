import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractDriverRequest } from "../../abstract/AbstractDriverRequest";

export class DriverSave extends AbstractDriverRequest  {

  born_country_id!: number;
  born_date!: string;
  born_region_id!: string;
  citizenship_id!: number;
  die_date!: string;
  email!: string;
  first_name!: string;
  flag: number = 0;
  id!: string | null;
  last_name!: string;
  middle_name!: string;
  pnfl!: string;
  rfirst_name!: string;
  rlast_name!: string;
  rmiddle_name!: string;
  sex_id!: number;
  status!: number;
  ufirst_name!: string;
  ulast_name!: string;
  umiddle_name!: string;


  constructor() {
    super(CrmApiUrl.DRIVER_SAVE);
  }

  

  public setId(value: string){
    this.id = value;
  }

}
