import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import {AbstractCarRequest} from "../../abstract/AbstractCarRequest";

export class CarCheckSave extends AbstractCarRequest{

  car_id!: string;

  end_date!: string;

  id!: string;

  note!:string;

  result_id!: number;

  signed!: boolean;

  start_date!: string;

  type_id!: string;

  constructor() {
    super(CrmApiUrl.CAR_CHECK_SAVE);
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

  public setCarId(value: string){
    this.car_id = value;
  }

}
