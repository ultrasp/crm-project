import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class RefTreeSave extends AbstractCrmRequest {

  id!: string;

  key!: string;

  name!: string;

  type_id!:string;

  order!:string;

  parent_key!:string;

  constructor() {
    super(CrmApiUrl.REF_TREE_SAVE);
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

  public setTypeId(value: string){
    this.type_id = value;
  }

  public getOrder(): string {
    return this.order;
  }

  public setOrder(value: string){
    this.order = value;
  }

}
