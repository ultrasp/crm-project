import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class RoleSave extends AbstractCrmRequest {

  key!: string;

  name!: string;

  id!: string;

  description!: string;

  role_accesses:IRoleAccess[] =[];
  constructor() {
    super(CrmApiUrl.ROLE_SAVE);
  }

  public getKey(): string {
    return this.key;
  }

  public setKey(value: string) {
    this.key = value;
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string) {
    this.name = value;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(value: string) {
    this.description = value;
  }
}


export interface IRoleAccess{
  access_id: string,
  role_id: string,
  type: number
}