import {
  CrmApiUrl
} from "src/app/common/enums/crm-api-urls.enum";
import {
  ownerPanelSearchRequest
} from "src/app/main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import {
  AbstractDriverSearchRequest
} from "../../abstract/AbstractDriverSearchRequest";

export class DriverCertificateHistory extends AbstractDriverSearchRequest implements ownerPanelSearchRequest {

  id!: string;

  driver_id!: string;

  state_id!:string;
  constructor() {
    super(CrmApiUrl.DRIVER_CERTIFICATE_HISTORY);
  }

  setOwnerId(ownerId: string): void {
    this.driver_id = ownerId;
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

  public getDriverId(): string {
    return this.driver_id;
  }

  public setDriverId(value: string) {
    this.driver_id = value;
  }

  public setState(value:string){
    this.state_id = value;
  }

}
