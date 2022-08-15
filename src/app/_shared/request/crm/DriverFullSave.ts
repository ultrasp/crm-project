import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractDriverRequest } from "../../abstract/AbstractDriverRequest";

export class DriverFullSave extends AbstractDriverRequest  {

  addresses!: IDriverAddress[];
  attributes!: Attribute[];
  certificate!: IDriverCertificate;
  documents!: IDriverDocument[];
  driver!: IDriverItem;


  constructor() {
    super(CrmApiUrl.DRIVER_FULL_SAVE);
  }



  public setId(value: string){
  }

}


export interface IDriverItem {
  born_city_id?: number;
  born_country_id: number;
  born_date: string;
  born_place?: string;
  born_region_id: string;
  citizenship_id: number;
  die_date?: string;
  email?: string;
  first_name: string;
  flag?: number;
  id: string | null;
  last_name: string;
  middle_name: string;
  pnfl: string;
  rfirst_name: string;
  rlast_name: string;
  rmiddle_name: string;
  sex_id: number;
  status?: number;
  ufirst_name: string;
  ulast_name: string;
  umiddle_name: string;
}

export interface IDriverDocument {
  document_number: string;
  driver_id: number | null;
  given_by: string;
  given_date: string;
  id: number| null;
  issue_date: string;
  type_id: number;
}

export interface IDriverCertificate {
  block_end?: string;
  block_start?: string;
  branch_id: number;
  driver_id: number | null;
  flag: number;
  given_date: string;
  id: number | null;
  issue_date: string;
  note?: string;
  state_id: number;
  reason_id: number;
}

interface Attribute {
  key: string;
  value: string;
}

export interface IDriverAddress {
  address: string;
  block: string;
  cadas_id: string;
  city_id: number;
  driver_id: number |null;
  flat: number;
  house: string;
  id: number | null;
  massiv_id: number;
  note: string;
  region_id: number;
  street_id: number;
  type_id: number;
  naspunkt:string;
  street_name:string
}
