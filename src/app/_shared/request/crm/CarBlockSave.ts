import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";

export class CarBlockSave extends AbstractCarRequest {

  id!: string;
  blocker_person!: string;
  car_id!: string;
  date!: string;
  company_name!: string | null;
  doc_number!: string;
  blocker_id!:string;

  constructor() {
    super(CrmApiUrl.CAR_BLOCK_SAVE);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

  public getPerson(): string {
    return this.blocker_person
  }

  public setPerson(value: string) {
    this.blocker_person = value;
  }

  public getCarId(): string {
    return this.car_id
  }

  public setCarId(value: string) {
    this.car_id = value;
  }

  public getDate(): string {
    return this.date
  }

  public setDate(value: string) {
    this.date = value;
  }

  public getCompanyName(): string | null {
    return this.company_name
  }

  public setCompanyName(value: string) {
    this.company_name = value;
  }

  public getSerialNumber(): string {
    return this.doc_number
  }

  public setDocNumber(value: string) {
    this.doc_number = value;
  }
}
