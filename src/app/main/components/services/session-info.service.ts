import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SystemConfig } from "src/app/common/enums/system-config.enum";
import {IPermission, ISessionInfo} from "../../models/session-info.entity";
import { LocalStorageService } from "./local-storage.service";
import {AccessService} from "./access-service";

@Injectable({ providedIn: 'root' })
export class SessionInfoService {

    private sessionInfo$: BehaviorSubject<ISessionInfo> = new BehaviorSubject({});
    private isLoggedIn$: BehaviorSubject<boolean>;

    constructor(private localStorageService: LocalStorageService, private accessService: AccessService) {
        let session = this.getSesionInfo();
        this.sessionInfo$.next(session);
        if (session && session.data)
            this.isLoggedIn$ = new BehaviorSubject<boolean>(true);
        else
            this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
    }

    private saveSessionInfo(sessionInfo: ISessionInfo) {
        this.localStorageService.setItem(SystemConfig.SESSION_INFO, sessionInfo);
    }

    public getSesionInfo(): ISessionInfo {
        return JSON.parse(this.localStorageService.getItem(SystemConfig.SESSION_INFO) + '') as ISessionInfo;
    }

    public clearSesionInfo() {
        this.localStorageService.removeItem(SystemConfig.SESSION_INFO);
        this.sessionInfo$.next({});
        this.isLoggedIn$.next(false);
        this.accessService.setAccess(null);
    }

    public getSessionInfoAsObservable(): Observable<ISessionInfo> {
        return this.sessionInfo$.asObservable();
    }

    public setSessionInfo(sessionInfo: ISessionInfo) {
        if (sessionInfo && !!sessionInfo) {
            this.saveSessionInfo(sessionInfo);
            this.sessionInfo$.next(sessionInfo);
            const accessToken = sessionInfo.data?.access_token;
            const boolValue = accessToken && !!accessToken;
            if(sessionInfo.data && sessionInfo.data.user_info) {
              this.accessService.setAccess(sessionInfo.data?.user_info.permissions);
              this.accessService.setRole(sessionInfo.data?.user_info.role_id);
            }
            this.isLoggedIn$.next(!!boolValue);
        } else {
            this.clearSesionInfo();
        }
    }

    public isLoggedInAsObservable() {
        return this.isLoggedIn$.asObservable();
    }

    public hasAccess(accessKey:string | null): boolean{
        return this.accessService.hasAccess(accessKey);
    }

    public isAdmin() {
      return this.accessService.isAdmin();
    }

}
