import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractDriverSearchRequest } from "../../abstract/AbstractDriverSearchRequest";

export class DriverCategorySave extends AbstractDriverSearchRequest{

  id!: string;

  driver_id!: string;

  state!: string;

  type_id!: string;

  end_date!: string;

  start_date!:string;


  constructor() {
    super(CrmApiUrl.DRIVER_CATEGORY_SAVE);
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

  public setTypeID(value: string) {
    this.type_id = value;
  }

  public getTypeId() {
    return this.type_id;
  }

  public setStartDate(value: string) {
    this.start_date = value;
  }

  public getStartDate() {
    return this.start_date;
  }

  public setEndDate(value: string) {
    this.end_date = value;
  }

  public getEndDate() {
    return this.end_date;
  }


}
