import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SystemConfig } from 'src/app/common/enums/system-config.enum';
import { SessionInfoService } from '../services/session-info.service';

@Component({
  selector: 'crm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  @Input() name = '';
  @Input() userName = '';  
  @Output() logout = new EventEmitter();
  public now: Date = new Date();
  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private router: Router,
    private sessionInfoSvc: SessionInfoService, public translate:TranslateService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
      }
    });
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  ngOnInit(): void {
    this.translate.use(SystemConfig.LANG_RU);
    localStorage.setItem(SystemConfig.CURRENT_LANGUAGE, SystemConfig.LANG_RU);

    let userInfo = this.sessionInfoSvc.getSesionInfo().data?.user_info;
    if (!this.userName && !this.name) {
      this.userName = userInfo?.username || '';
      this.name = userInfo?.name || '';
    }
  }

  onLogout() {
    this.logout.emit();
  }

  selectLanguage(value: string) {
    this.translate.use(value);
    localStorage.setItem(SystemConfig.CURRENT_LANGUAGE, value);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
}
