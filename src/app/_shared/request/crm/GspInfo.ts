import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { SystemConfig } from "src/app/common/enums/system-config.enum";
import {AbstractCrmRequest} from "../../abstract/AbstractCrmRequest";


export class GspInfo extends AbstractCrmRequest {

  constructor(serial:string,number:string) {
    super(CrmApiUrl.FIZICAL_GSP_INFO);
    this.serial = serial;
    this.number = number;
  }

  serial!: string;

  number!: string;


  override getURI(): string {
    return SystemConfig.CRM_MIP_PREFIX + CrmApiUrl.FIZICAL_GSP_INFO + '?serial=' +  this.serial + '&number=' + this.number;
  }
}
