import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionInfoService } from 'src/app/main/components/services/session-info.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private sessionInfoSvc: SessionInfoService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const sessionInfo = this.sessionInfoSvc.getSesionInfo();
        if (sessionInfo && !!sessionInfo) {
            const accessToken = sessionInfo.data?.access_token;
            if (accessToken && !!accessToken) {
                // logged in so return true
                return true;
            } else {
                // not logged in so redirect to login page with the return url
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false;
            }
        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}