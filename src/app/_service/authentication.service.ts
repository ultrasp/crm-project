import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISessionInfo } from '../main/models/session-info.entity';
import { SessionInfoService } from '../main/components/services/session-info.service';
import { CustomTheme } from '../common/enums/custom-theme.enum';
import { environment } from 'src/environments/environment.prod';
import { ApiUrl } from './util/ApiUrl';
import {NotificationService} from "./NotificationService";
import {CrmAlertDialogTypeError} from "../common/enums/crm-alert-dialog.enum";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private subscription$: Subscription = new Subscription();
    public $uiTheme: BehaviorSubject<CustomTheme>;
    public $autoLoadReferences: BehaviorSubject<Boolean>;

    private sessionInfo: ISessionInfo | undefined;

    private headers = new HttpHeaders().append('Content-Type', 'application/json');

    constructor(private router: Router,
        private http: HttpClient,
        private sessionInfoSvc: SessionInfoService,
        private notificationService: NotificationService) {
        this.sessionInfo = this.sessionInfoSvc.getSesionInfo();
        this.$uiTheme = new BehaviorSubject<CustomTheme>(CustomTheme.Web);
        this.$autoLoadReferences = new BehaviorSubject<Boolean>(false);
        const subscriptionId = this.sessionInfoSvc.getSessionInfoAsObservable()
            .subscribe({
                next: (v) => { this.sessionInfo = v },
                error: (e) => { },
                complete: () => this.subscription$.unsubscribe()
            });

        this.subscription$.add(subscriptionId);
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${ApiUrl.API_URL()}/auth/v1/oauth/login`, { username, password }, { headers: this.headers })
            .pipe(map((sessionInfo: ISessionInfo) => {
              if(sessionInfo.status == 200) {
                  this.sessionInfoSvc.setSessionInfo(sessionInfo);
                  this.$autoLoadReferences.next(true);
                  this.startRefreshTokenTimer();
              }
              else {
                this.notificationService.show(sessionInfo.message, CrmAlertDialogTypeError.ERROR);
              }
              return sessionInfo;
            }));
    }

    logout() {
        this.http.post<any>(`${ApiUrl.API_URL()}/auth/v1/oauth/logout`, {}, { headers: this.headers }).subscribe();
        this.stopRefreshTokenTimer();
        this.sessionInfoSvc.clearSesionInfo();
        this.router.navigate(['/login']);
    }

    refreshToken() {
        let accessToken = this.sessionInfo?.data?.refresh_token;
        let refreshToken = {
            "refresh_token": (accessToken && !!accessToken) ? accessToken : ''
        }
        return this.http.post<any>(`${ApiUrl.API_URL()}/auth/v1/oauth/refresh-token`, refreshToken, { headers: this.headers })
            .pipe(map((sessionInfo) => {
                if(sessionInfo.status == 200){
                    this.sessionInfoSvc.setSessionInfo(sessionInfo);
                    this.startRefreshTokenTimer();
                    return sessionInfo;
                }
            }));
    }

    // helper methods

    private refreshTokenTimeout!: any;

    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        let accessToken = this.sessionInfo?.data?.access_token;
        if (accessToken && !!accessToken) {
            const jwtToken = JSON.parse(atob((accessToken || '').split('.')[1]));
            // set a timeout to refresh the token a minute before it expires
            const expires = new Date(jwtToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000);
            this.refreshTokenTimeout = setTimeout(() => {
                this.refreshToken().subscribe();
            }, timeout);
        }
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

}
