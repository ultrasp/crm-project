import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";

export class CarTuningSave extends AbstractCarRequest {

  car_id!: string;
  document_number!: string;
  given_by?: string | null;
  given_by_id!:string;
  given_date!: string;
  id!: string;
  issue_date!: string;
  next_check_date!: string;
  check_date!: string;
  provide_date!: string;
  type_id!: number;
  ud1!:string;
  ud2!:string;
  ud3!:string;
  constructor() {
    super(CrmApiUrl.CAR_TUNING_SAVE);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

}
