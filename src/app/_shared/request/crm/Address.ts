import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";

export class Address extends AbstractCrmSearchRequest {

  id!: string;

  name!: string;

  parent_id!:string;

  type!:string;

  constructor() {
    super(CrmApiUrl.ADDRESS_LIST);
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

  public getParentId(): string {
    return this.parent_id;
  }

  public setParentId(value: string){
    this.parent_id = value;
  }

  public getType(): string {
    return this.type;
  }

  public setType(value: string){
    this.type = value;
  }
}
