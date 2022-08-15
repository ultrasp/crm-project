import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";

export class Reference extends AbstractCrmSearchRequest {

  id!: string;

  key!: string;

  name!: string;

  type_id!:string;

  constructor() {
    super(CrmApiUrl.REFERENCE_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public getKey(): string {
    return this.key;
  }

  public setKey(value: string){
    this.key = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string){
    this.name = value;
  }

  public getTypeId(): string {
    return this.type_id;
  }

  public setTypeId(value: string|number){
    this.type_id = (typeof value == 'number' ? value + '' : value);
  }
}
