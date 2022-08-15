import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractDriverRequest } from "../../abstract/AbstractDriverRequest";

export class DriverCertificateHistorySave extends AbstractDriverRequest {

  doc_num!: string;

  doc_ser!: string;

  given_date!:string;

  driver_id!:string;

  issue_date!:string;

  note!:string;

  flag!:string;

  constructor() {
    super(CrmApiUrl.DRIVER_CERTIFICATE_HISTORY_SAVE);
  }

  public setOwnerId(value: string){
    this.driver_id = value;
  }
}
