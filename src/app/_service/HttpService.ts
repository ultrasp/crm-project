import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  DateUtil
} from './util/DateUtil';
import {
  IRequest
} from '../_shared/abstract/interfaces/IRequest';
import {
  CommonUtil
} from './util/CommonUtil';
import {
  StringUtil
} from './util/StringUtil';
import {
  SessionInfoService
} from '../main/components/services/session-info.service';
import {
  ISessionInfo
} from '../main/models/session-info.entity';
import {
  catchError, tap,
  throwError
} from 'rxjs';
import {
  NotificationService
} from './NotificationService';
import { CrmAlertDialogTypeError } from '../common/enums/crm-alert-dialog.enum';
import { Router } from '@angular/router';
import { SystemConfig } from '../common/enums/system-config.enum';
import { ApiUrl } from './util/ApiUrl';
import { CheckRequestService } from "./CheckRequestService";

@Injectable()
export class HttpService {
  serverURI: string = "http://localhost:8092/";

  private headers = new HttpHeaders().append('Content-Type', 'application/json');

  constructor(private notify: NotificationService, private http: HttpClient, private sessionInfoSvc: SessionInfoService, private router: Router, private checkService: CheckRequestService) {
    this.serverURI = ApiUrl.API_URL() + '/';
  }


  isDeveloper() {
    return "localhost" == window.location.hostname;
  }

  public doReportCommunication(request: IRequest) {
    let session: ISessionInfo = this.sessionInfoSvc.getSesionInfo();
    if (session && session.data) {
      this.headers = this.headers.set('Authorization', `Bearer ${session.data.access_token}`);
    }
    return this.downloadFile(request);
  }

  public doCommunication(request: IRequest) {
    let session: ISessionInfo = this.sessionInfoSvc.getSesionInfo();
    return this.doEvent(request);
  }

  public login(request: IRequest) {
    return this.doEvent(request);
  }

  private doEvent(request: IRequest) {
    var strJSON: string = JSON.stringify(request, HttpService.JSONParser);

    var apiURI: string = request.getURI();
    if (StringUtil.emptyString(apiURI)) {
      console.error("URI is null", request);
    }
    this.checkService.increment();
    return this.http.post(this.serverURI + apiURI, strJSON, {
      headers: this.headers,
    }).pipe(
      tap(res => {
        this.checkService.decrement();
      }),
      catchError((error) => {
        this.checkService.decrement();
        this.onErrorHandler(error)
        return throwError(error);
      })
    )
  }

  private downloadFile(request: IRequest) {
    var strJSON: string = JSON.stringify(request, HttpService.JSONParser);

    var apiURI: string = request.getURI();
    if (StringUtil.emptyString(apiURI)) {
      console.error("URI is null", request);
    }

    return this.http.post(this.serverURI + apiURI, strJSON, {
      headers: this.headers,
      responseType: 'blob'
    }).pipe(
      catchError((error) => {
        this.onErrorHandler(error)
        return throwError(error);
      })
    )
  }

  public doFileGetCommunication(request: IRequest) {
    let session: ISessionInfo = this.sessionInfoSvc.getSesionInfo();
    if (session && session.data) {
      this.headers = this.headers.set('Authorization', `Bearer ${session.data.access_token}`);
    }
    return this.downloadFileGet(request);
  }

  private downloadFileGet(request: IRequest) {
    var apiURI: string = request.getURI();
    if (StringUtil.emptyString(apiURI)) {
      console.error("URI is null", request);
    }

    return this.http.get(this.serverURI + apiURI, {
      headers: this.headers,
      responseType: 'blob'
    }).pipe(
      catchError((error) => {
        this.onErrorHandler(error)
        return throwError(error);
      })
    )
  }

  public doGetCommunication(request: IRequest) {
    let session: ISessionInfo = this.sessionInfoSvc.getSesionInfo();
    if (session && session.data) {
      this.headers = this.headers.set('Authorization', `Bearer ${session.data.access_token}`);
    }
    return this.doGetEvent(request);
  }

  private doGetEvent(request: IRequest) {
    var apiURI: string = request.getURI();
    if (StringUtil.emptyString(apiURI)) {
      console.error("URI is null", request);
    }

    return this.http.get(this.serverURI + apiURI, {
      headers: this.headers,
    }).pipe(
      catchError((error) => {
        this.onErrorHandler(error)
        return throwError(error);
      })
    )
  }


  public static JSONParser(k: any, v: any) {
    if (v instanceof Set || v instanceof Map)
      return Array.from(v);
    if (v instanceof Date) {
      return DateUtil.parseDate(v);
    }

    return v;
  }

  public onErrorHandler(error: any) {
    if (error instanceof HttpErrorResponse) {
      this.notify.show('ERROR.SERVER_ERROR', CrmAlertDialogTypeError.ERROR);
      if (error.error instanceof ErrorEvent) {
        console.error("Error Event");
      } else {
        switch (error.status) {
          case 401: //login
            this.sessionInfoSvc.clearSesionInfo();
            window.location.reload();
            break;
          case 403: //forbidden
            this.router.navigateByUrl("/unauthorized");
            break;
        }
      }
    } else {
      console.error("some thing else happened");
    }
  }
}

