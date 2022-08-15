import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarSearchRequest } from "../../abstract/AbstractCarSearchRequest";

export class CarBlockList extends AbstractCarSearchRequest {

  car_id!: string;
  id!: string;
  block_date!: string;
  block_number!: string;
  blocker_company!: string;
  blocker_person!: string;
  state_id!: string;
  unblock_date!: string;
  unblocker_company!: string;
  unblocker_person!: string;

  constructor() {
    super(CrmApiUrl.CAR_BLOCK_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

  public getOwnerId (): string {
    return this.car_id
  }

  public setOwnerId (value: string) {
    this.car_id = value;
  }

  public getBlockDate(): string{
    return this.block_date;
  }

  public setBlockDate(value: string){
    this.block_date = value;
  }

  public getBlockNumber(): string{
    return this.block_number;
  }

  public setBlockNumber(value: string){
    this.block_number = value;
  }

  public getBlockerCompany(): string{
    return this.blocker_company;
  }

  public setBlockerCompany(value: string){
    this.blocker_company = value;
  }

  public getBlockerPerson(): string{
    return this.blocker_person;
  }

  public setBlockerPerson(value: string){
    this.blocker_person = value;
  }

  public getStateId(): string{
    return this.state_id;
  }

  public setStateId(value: string){
    this.state_id = value;
  }

  public getUnblockDate(): string{
    return this.unblock_date;
  }

  public setUnblockDate(value: string){
    this.unblock_date = value;
  }

  public getUnblockerCompany(): string{
    return this.unblocker_company;
  }

  public setUnblockerCompany(value: string){
    this.unblocker_company = value;
  }

  public getUnblockerPerson(): string{
    return this.unblocker_person;
  }

  public setUnblockerPerson(value: string){
    this.unblocker_person = value;
  }
  
}