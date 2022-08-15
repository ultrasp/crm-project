import {
  CrmApiUrl
} from "src/app/common/enums/crm-api-urls.enum";
import {
  ownerPanelSearchRequest
} from "src/app/main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import {
  AbstractDriverSearchRequest
} from "../../abstract/AbstractDriverSearchRequest";

export class DriverCertificateLast extends AbstractDriverSearchRequest  {

  driver_id!: string;

  constructor() {
    super(CrmApiUrl.DRIVER_CERTIFICATE_GET_LAST);
  }

 
  public getDriverId(): string {
    return this.driver_id;
  }

  public setDriverId(value: string) {
    this.driver_id = value;
  }

}
