import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SessionInfoService } from './main/components/services/session-info.service';
import { ISessionInfo } from './main/models/session-info.entity';
import { TestPage } from './main/test/TestPage';
import { ResourceService } from './_service/resources-service.service';
import defaultLanguage from "./../assets/i18n/ru.json";
import uzlang from "./../assets/i18n/uz.json";
import { SystemConfig } from './common/enums/system-config.enum';
import { CustomTheme } from './common/enums/custom-theme.enum';
import { AuthenticationService } from './_service/authentication.service';
import { Router } from '@angular/router';
import { IdleTimeoutService } from './_service/idle-timeout.service';
import { environment } from 'src/environments/environment.prod';
import {Overlay} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {CrmOverlay} from "./common/widgets/crn-overlay/CrmOverlay";
import {CheckRequestService} from "./_service/CheckRequestService";
import {OverlayRef} from "@angular/cdk/overlay/overlay-ref";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'crm-ui';

  @ViewChild('test', {
    static: true
  }) test!: TestPage;

  isLoggedIn: boolean = false;
  sessionInfo!: ISessionInfo;
  subscription$: Subscription = new Subscription();
  name: string = '';
  userName: string = '';
  themes = CustomTheme;
  uiTheme!: CustomTheme;
  overlayRef!: OverlayRef;
  sidebarStatus: string | undefined;

  constructor(private sessionInfoSvc: SessionInfoService,
    public translate: TranslateService,
    private resourceService: ResourceService,
    private authSvc: AuthenticationService,
    private router: Router,
    private location: Location,
    private overlay: Overlay,
    private checkService: CheckRequestService,
    private idleTimeoutSvc: IdleTimeoutService) {

    translate.addLangs([SystemConfig.LANG_UZ, SystemConfig.LANG_RU]);

    const language: string = localStorage.getItem(SystemConfig.CURRENT_LANGUAGE) || SystemConfig.LANG_UZ;

    this.setSelectedLanguage(language);

  }

  ngOnInit(): void {

    this.initialIdleSettings();

    this.subscription$.add(this.authSvc.$autoLoadReferences.subscribe(isAutoLoadReferencesEnabled => { (isAutoLoadReferencesEnabled) ? this.resourceService.load() : null; }));

    this.subscription$.add(this.authSvc.$uiTheme.subscribe(theme => { this.uiTheme = theme; }));

    const subscriptionId = this.sessionInfoSvc.getSessionInfoAsObservable().subscribe(sessionInfo => {
      if (sessionInfo && !!sessionInfo) {
        const accessToken = sessionInfo.data?.access_token;
        (accessToken && !!accessToken) ? this.handleAuthenticatingProcess(sessionInfo) : null;
      }
    });

    this.subscription$.add(subscriptionId);

    this.subscription$.add(this.sessionInfoSvc.isLoggedInAsObservable().subscribe(value => {
      this.isLoggedIn = value
    }));

    this.checkService.getStatus()
      .subscribe(value => {
        if(value)
          this.showOverlay();
        else
          this.hideOverLay();
      });
  }

  private handleAuthenticatingProcess(sessionInfo: ISessionInfo) {
    this.sessionInfo = sessionInfo;
    this.name = this.sessionInfo.data?.user_info.name || '';
    this.userName = this.sessionInfo.data?.user_info.username || '';
    const currentUrl = this.location.path().split('?')[0];
    if (currentUrl === '/login') {
      this.router.navigate(['/home']);
    }
  }

  setSelectedLanguage(language: string) {
    switch (language) {
      case SystemConfig.LANG_RU:
        this.translate.setTranslation(SystemConfig.LANG_RU, defaultLanguage);
        break;
      case SystemConfig.LANG_UZ:
        this.translate.setTranslation(SystemConfig.LANG_UZ, uzlang);
        break;
      default:
        this.translate.setTranslation(SystemConfig.LANG_UZ, defaultLanguage);
        break;
    }
    this.translate.setDefaultLang(language);
  }

  private initialIdleSettings() {
    const idleTimeoutInSeconds: number = environment.idleTimeInMinutes * 60;
    this.idleTimeoutSvc.startWatching(idleTimeoutInSeconds).subscribe((isTimeOut: boolean) => {
      if (isTimeOut) {
        this.logout();
        alert("Session timeout. It will redirect to login page.");
      }
    });
  }

  logout() {
    this.authSvc.logout();
    this.sessionInfoSvc.clearSesionInfo();
    this.router.navigate(['/login']);
  }

  showOverlay() {
    if(!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
        hasBackdrop: true
      });
    }
    if(!this.overlayRef.hasAttached())
      this.overlayRef.attach(new ComponentPortal(CrmOverlay));
  }

  hideOverLay() {
    if(this.overlayRef && this.overlayRef.hasAttached())
      this.overlayRef.detach();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  sidebarController(status:any){
    this.sidebarStatus = status;
  }

}
