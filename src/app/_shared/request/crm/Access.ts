import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";
import {CrmApiUrl} from "../../../common/enums/crm-api-urls.enum";

export class Access extends AbstractCrmSearchRequest {

  id!: string;

  description!: string;

  key!:string;

  name!:string;

  constructor() {
    super(CrmApiUrl.ACCESS_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string){
    this.name = value;
  }

  public getKey(): string {
    return this.key;
  }

  public setKey(value: string){
    this.key = value;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(value: string){
    this.description = value;
  }
}
