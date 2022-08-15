import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";
import {CrmApiUrl} from "../../../common/enums/crm-api-urls.enum";

export class Role extends AbstractCrmSearchRequest {

  key!: string;

  name!: string;

  id!:string;

  description!:string;

  constructor() {
    super(CrmApiUrl.ROLE_LIST);
  }

  public getKey(): string {
    return this.key;
  }

  public setKey(value: string){
    this.key = value;
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

  public getDescription(): string {
    return this.description;
  }

  public setDescription(value: string){
    this.description = value;
  }
}
