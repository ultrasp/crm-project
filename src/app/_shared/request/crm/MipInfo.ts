import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { SystemConfig } from "src/app/common/enums/system-config.enum";
import {AbstractCrmRequest} from "../../abstract/AbstractCrmRequest";


export class MipInfo extends AbstractCrmRequest {

  constructor() {
    super(CrmApiUrl.FIZICAL_MIP_INFO);
  }

  pinfl!: string;

  docNo!: string;

  public getPinfl() {
    return this.pinfl;
  }

  public setPinfl(pinfl: string) {
    this.pinfl = pinfl;
  }

  public getDocNo() {
    return this.docNo;
  }

  public setDocNo(docNo: string) {
    this.docNo = docNo;
  }

  override getURI(): string {
    return SystemConfig.CRM_MIP_PREFIX + CrmApiUrl.FIZICAL_MIP_INFO + '?pinfl=' +  this.getPinfl() + '&doc-no=' + this.getDocNo();
  }
}
