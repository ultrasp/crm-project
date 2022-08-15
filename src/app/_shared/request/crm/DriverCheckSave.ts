import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import {AbstractDriverRequest} from "../../abstract/AbstractDriverRequest";

export class DriverCheckSave extends AbstractDriverRequest{

  driver_id!: string;

  end_date!: string;

  id!: string;

  note!:string;

  result_id!: number;

  signed!: boolean;

  start_date!: string;

  type_id!: string;

  constructor() {
    super(CrmApiUrl.DRIVER_CHECK_SAVE);
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

}
