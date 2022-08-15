import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class UserSave extends AbstractCrmRequest {

  id!: string;

  branch_id!: string;

  employee_id!: string;

  flag!:string;

  name!:string;

  password!:string;

  role_id!:string;

  username!:string;

  constructor() {
    super(CrmApiUrl.USER_SAVE);
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

  public getEmployeeId(): string {
    return this.employee_id;
  }

  public setEmployeeId(value: string){
    this.employee_id = value;
  }

  public getFlag(): string {
    return this.flag;
  }

  public setFlag(value: string){
    this.flag = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string){
    this.name = value;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(value: string){
    this.password = value;
  }

  public getRoleId(): string {
    return this.role_id;
  }

  public setRoleId(value: string){
    this.role_id = value;
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(value: string){
    this.username = value;
  }

}
