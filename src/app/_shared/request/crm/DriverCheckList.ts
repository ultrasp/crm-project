import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractDriverSearchRequest } from "../../abstract/AbstractDriverSearchRequest";
import {ownerPanelSearchRequest} from "../../../main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";

export class DriverCheckList extends AbstractDriverSearchRequest implements ownerPanelSearchRequest {

  driver_id!: string;

  end_date!: string;

  id!: string;

  note!:string;

  result_id!: number;

  signed!: boolean;

  start_date!: string;

  type_id!: string;

  constructor() {
    super(CrmApiUrl.DRIVER_CHECK_LIST);
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

  setOwnerId(ownerId: string): void {
    this.driver_id = ownerId;
  }

}
