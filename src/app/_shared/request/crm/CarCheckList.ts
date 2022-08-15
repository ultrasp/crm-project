import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import {ownerPanelSearchRequest} from "../../../main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import {AbstractCarSearchRequest} from "../../abstract/AbstractCarSearchRequest";

export class CarCheckList extends AbstractCarSearchRequest implements ownerPanelSearchRequest {

  car_id!: string;

  end_date!: string;

  id!: string;

  note!:string;

  result_id!: number;

  signed!: boolean;

  start_date!: string;

  type_id!: string;

  constructor() {
    super(CrmApiUrl.CAR_CHECK_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public getCarId(): string {
    return this.car_id;
  }

  public setDriverId(value: string){
    this.car_id = value;
  }

  setOwnerId(ownerId: string): void {
    this.car_id = ownerId;
  }

}
