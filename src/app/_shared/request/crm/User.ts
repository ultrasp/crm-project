import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";

export class User extends AbstractCrmSearchRequest {

  id!: string;

  name!: string;

  branch_id!:string;

  username!:string;

  role_id!:string;

  constructor() {
    super(CrmApiUrl.USER_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public getBranchId(): string {
    return this.branch_id;
  }

  public setBranchId(value: string){
    this.branch_id = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string){
    this.name = value;
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(value: string){
    this.username = value;
  }

  public getRoleId(): string {
    return this.role_id;
  }

  public setRoleId(value: string){
    this.role_id = value;
  }
}
