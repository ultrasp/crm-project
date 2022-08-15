import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";

export class CarUnblockSave extends AbstractCarRequest {

  block_id!: string;
  company_name!: string | null;
  date!: string;
  person!: string;
  blocker_id!:string;

  constructor() {
    super(CrmApiUrl.CAR_UNBLOCK_SAVE);
  }

  public getBlockId(): string {
    return this.block_id;
  }

  public setBlockId(value: string) {
    this.block_id = value;
  }

  public getPerson(): string {
    return this.person
  }

  public setPerson(value: string) {
    this.person = value;
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

}
