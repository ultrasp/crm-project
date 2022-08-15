import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { SessionInfoService } from 'src/app/main/components/services/session-info.service';
import { SystemConfig } from '../enums/system-config.enum';
import { CrmAlertDialog } from '../widgets/CrmAlertDialog/CrmAlertDialog';
import { CrmAlertDialogTypeError } from '../enums/crm-alert-dialog.enum';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
        private sessionInfoSvc: SessionInfoService) { }

    private excludeDialogUrls =[
        'car/v1/person/get-person'
    ];
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const localRequest = request;
        return next.handle(request)
            .pipe(map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.body?.error_code && !!event.body?.error_code) {
                        if ([401, 403].includes(event.body.status) && this.sessionInfoSvc.getSesionInfo()) {
                            this.authenticationService.logout();
                        } else if (SystemConfig.NO_ERROR !== event.body.error_code && ![401, 403].includes(event.body.status)) {
                            throw { status: event.status, error_code: event.body.error_code, url: typeof localRequest.body == 'string' ?  JSON.parse(localRequest.body).apiURI : '' };
                        }
                    }
                }
                return event;
            }),
                catchError(err => {
                    const errorMessage = err.error_code || err.error?.error || (err && err.error && err.error.error_description) || err.statusText;
                    if ([401, 403].includes(err.status) && this.sessionInfoSvc.getSesionInfo()) {
                        // auto logout if 401 or 403 response returned from api
                        this.authenticationService.logout();
                    } else if (err.status == 200 && !this.excludeDialogUrls.includes(err.url)) {
                        CrmAlertDialog.show('SERVER_ERRORS.'+errorMessage, CrmAlertDialogTypeError.ERROR);
                    } else if (err.status == 500) {
                        CrmAlertDialog.show(errorMessage, CrmAlertDialogTypeError.ERROR);
                        CrmAlertDialog.show(JSON.stringify(localRequest), CrmAlertDialogTypeError.ERROR);
                    }else if (err.status == 400) {
                        CrmAlertDialog.show(errorMessage, CrmAlertDialogTypeError.ERROR);
                        CrmAlertDialog.show(JSON.stringify(localRequest), CrmAlertDialogTypeError.ERROR);
                    }

                    return throwError(() => errorMessage);
                }));
    }
}
