import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { SystemConfig } from "src/app/common/enums/system-config.enum";
import { SessionInfoService } from "../services/session-info.service";
import { UserFormDialog } from "../users/userFormDialog/userFormDialog";


@Component({
    selector: 'header',
    templateUrl: 'Header.html',
    styleUrls: ['Header.css']
})

export class Header implements OnInit {
    @Input() name = '';
    @Input() userName = '';
    constructor(private sessionInfoSvc: SessionInfoService, public translate: TranslateService) {

    }
    ngOnInit(): void {
        if(!localStorage.getItem(SystemConfig.CURRENT_LANGUAGE)){
        

            localStorage.setItem(SystemConfig.CURRENT_LANGUAGE, SystemConfig.LANG_RU);
        }
        let currentlang: any = localStorage.getItem(SystemConfig.CURRENT_LANGUAGE) ? localStorage.getItem(SystemConfig.CURRENT_LANGUAGE) : SystemConfig.LANG_RU;
        this.translate.use(currentlang);

        let userInfo = this.sessionInfoSvc.getSesionInfo().data?.user_info;
        if (!this.userName && !this.name) {
          this.userName = userInfo?.username || '';
          this.name = userInfo?.name || '';
        }
      }

    selectLanguage(value: string) {
        this.translate.use(value);
        localStorage.setItem(SystemConfig.CURRENT_LANGUAGE, value);
    }
    onLogout() {
        this.logout.emit();
    }
    @Output() logout = new EventEmitter();
    languageActive = localStorage.getItem(SystemConfig.CURRENT_LANGUAGE);

    openPasswordForm(){
        UserFormDialog.openLogin().subscribe(result => {
            // if (result) {
            //   this.dataGrid.reloadGrid();
            // }
          });
      
    }
} 