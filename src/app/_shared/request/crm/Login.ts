import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class Login extends AbstractCrmRequest {

  username!: string;
  password!: string;

  constructor() {
    super(CrmApiUrl.LOGIN);
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(value: string) {
    this.username = value;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(value: string) {
    this.password = value;
  }

}
