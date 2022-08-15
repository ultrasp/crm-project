import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CustomTheme } from 'src/app/common/enums/custom-theme.enum';
import { SystemConfig } from 'src/app/common/enums/system-config.enum';
import { AuthenticationService } from 'src/app/_service/authentication.service';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  subscription$: Subscription = new Subscription();
  themes = CustomTheme;
  uiTheme: CustomTheme = CustomTheme.Web;
  passTextType = true;

  form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    loginMode: new FormControl('login', [Validators.required]),
    isRemember: new FormControl(false)
  });

  constructor(public translate: TranslateService, private authSvc: AuthenticationService) { }

  ngOnInit(): void { this.selectLanguage(SystemConfig.LANG_RU);
    if(this.isDeveloper()){
      this.form.patchValue({
        username:'crm-admin',
        password:'admin-567@password.crm'
      })
    }
  }

  isDeveloper() {
    return "localhost" == window.location.hostname;
  }

  submit() {
    this.form.markAllAsTouched();
    (this.form.valid) ? this.subscription$.add(this.authSvc.login(this.form.value.username, this.form.value.password).subscribe()) : null;
  }

  selectLanguage(value: string) {
    this.translate.use(value);
    localStorage.setItem(SystemConfig.CURRENT_LANGUAGE, value);
  }

  selectTheme(value: string) {
    this.uiTheme = parseInt(value);
    this.authSvc.$uiTheme.next(this.uiTheme);
  }

  ngOnDestroy(): void { this.subscription$.unsubscribe(); }
  languageActive = localStorage.getItem(SystemConfig.CURRENT_LANGUAGE);

}
