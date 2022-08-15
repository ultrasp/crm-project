import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionInfoService } from 'src/app/main/components/services/session-info.service';
import { ApiUrl } from 'src/app/_service/util/ApiUrl';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private sessionInfoSvc: SessionInfoService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const sessionInfo = this.sessionInfoSvc.getSesionInfo();
        const isLoggedIn = sessionInfo && sessionInfo.data?.access_token;
        const isApiUrl = request.url.startsWith(ApiUrl.API_URL());
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${sessionInfo.data?.access_token}` }
            });
        }

        return next.handle(request);
    }
}