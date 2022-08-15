import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { SystemConfig } from "src/app/common/enums/system-config.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";


export class MipAddressInfo extends AbstractCrmRequest {
  pinfl!: string;

  constructor() {
    super(CrmApiUrl.ADDRESS_MIP_INFO);
  }

  public getPinfl() {
    return this.pinfl;
  }

  public setPinfl(pinfl: string) {
    this.pinfl = pinfl;
  }

  override getURI(): string {
    return SystemConfig.CRM_MIP_PREFIX + CrmApiUrl.ADDRESS_MIP_INFO + '?pinfl=' + this.getPinfl();
  }
}
