import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class ReferenceSave extends AbstractCrmRequest {

  id!: string;

  key!: string;

  name!: string;

  type_id!:string;

  order!:string;

  edit_by!:string;

  edit_date!:string;
  constructor() {
    super(CrmApiUrl.REFERENCE_SAVE);
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


  public getEditBy(): string {
    return this.edit_by;
  }

  public setEditBy(value: string){
    this.edit_by = value;
  }
}
