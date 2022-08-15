import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";

export class CarSave extends AbstractCarRequest {

  id!: string;

  body_number!: string;

  body_type_id!: string;

  brand_id!: string;

  chassis_number!: string;

  color_id!: string;

  sub_color_id!: string;

  country_id!: string;

  engine_number!: string;

  fuel_type_id!: string;

  model_id!: string;

  type_id!: string;

  vin_code!: string;

  year!: string;


  constructor() {
    super(CrmApiUrl.CAR_SAVE);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

}
