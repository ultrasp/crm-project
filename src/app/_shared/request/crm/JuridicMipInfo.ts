import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { SystemConfig } from "src/app/common/enums/system-config.enum";
import {AbstractMipRequest} from "../../abstract/AbstractMipRequest";


export class JuridicMipInfo extends AbstractMipRequest {
  tin!: string;

  constructor() {
    super(CrmApiUrl.JURIDICAL_MIP_INFO);
  }

  public setInn(inn: string) {
    this.tin = inn;
  }

  public getInn() {
    return this.tin;
  }

  override getURI(): string {
    return SystemConfig.CRM_MIP_PREFIX + CrmApiUrl.JURIDICAL_MIP_INFO + '?tin=' + this.getInn();
  }
}
