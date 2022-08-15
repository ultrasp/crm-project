import { ownerPanelSearchRequest } from "src/app/main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarSearchRequest } from "../../abstract/AbstractCarSearchRequest";

export class CarSearchRequest extends AbstractCarSearchRequest implements ownerPanelSearchRequest {

  body_number!: string;
  brands!: number[];
  color_id!: string;
  document!: string;
  drb!: string;
  from_registration_date!: string;
  id!: number;
  models!: number[];
  name!: string;
  reasons!: number[];
  sector!: string;
  technical_number!: string;
  to_registration_date!: string;
  vin_code!: string;
  from_year!: string;
  to_year!: string;
  city_id!: string;
  region_id!: string;
  branch_id!: string;

  constructor() {
    super(CrmApiUrl.CAR_SEARCH);
  }

  setOwnerId(docNumber:string){
    this.document = docNumber;
  }
}
