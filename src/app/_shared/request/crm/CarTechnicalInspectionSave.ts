import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";

export class CarTechnicalInspectionSave extends AbstractCarRequest {

  car_id!: string;

  id!: string;

  check_date!: string;

  next_date!: string;

  note!: string;

  state_id!: number;


  constructor() {
    super(CrmApiUrl.CAR_TECHNICAL_INSPECTION_SAVE);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

}
