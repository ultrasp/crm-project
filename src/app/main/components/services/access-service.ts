import {Injectable} from "@angular/core";
import {IPermission} from "../../models/session-info.entity";

@Injectable({providedIn: 'root'})
export class AccessService {
  private access!: IPermission[] | null;
  private role!: number | null;

  public setAccess(access: IPermission[] | null) {
    console.log(access,'access')
    this.access = access;
  }

  public setRole(role: number | null) {
    this.role = role;
  }

  public isAdmin(){
    return !!this.role && this.role == 1;
  }

  public hasAccess(accessKey: string | null): boolean{
    // console.log(this.getSesionInfo().data,this.getSesionInfo().data?.user_info.permissions,'this.getSesionInfo().data?.user_info.permissions');
    return this.isAdmin() || accessKey == null ||  (!!this.access && this.access.find((item: IPermission) => item.authority == accessKey) != undefined);
  }


}
