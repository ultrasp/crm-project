import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";
import {AbstractCarSearchRequest} from "../../abstract/AbstractCarSearchRequest";
import {ownerPanelSearchRequest} from "../../../main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";

export class CarTechnicalInspectionList extends AbstractCarSearchRequest implements ownerPanelSearchRequest{

  car_id!: string;

  id!: string;

  check_date!: string;

  next_date!: string;

  note!: string;

  state_id!: number;


  constructor() {
    super(CrmApiUrl.CAR_TECHNICAL_INSPECTION_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

  setOwnerId(ownerId: string): void {
    this.car_id = ownerId;
  }

}
