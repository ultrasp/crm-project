import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractDriverRequest } from "../../abstract/AbstractDriverRequest";

export class DriverCertificateSave extends AbstractDriverRequest{

  id!: string;

  driver_id!: string;

  branch_id!: string;

  flag!: number;

  given_date!: string;

  issue_date!: string;

  state_id!:string;

  reason_id!:string;

  constructor() {
    super(CrmApiUrl.DRIVER_CERTIFICATE_SAVE);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public getDriverId(): string {
    return this.driver_id;
  }

  public setDriverId(value: string){
    this.driver_id = value;
  }

  public setFlag(value:number){
    this.flag = value;
  }

  public setStartDate(value:string){
    this.given_date = value;
  }

  public setEndDate(value:string){
    this.issue_date = value;
  }


}
