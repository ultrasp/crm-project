import {
  Injectable
} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import {
  filter,
  map
} from 'rxjs';
import {
  SessionInfoService
} from 'src/app/main/components/services/session-info.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivateChild {

  constructor(private router: Router, private sessionInfoSvc: SessionInfoService) { }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const sessionInfo = this.sessionInfoSvc.getSesionInfo();
    if (sessionInfo && !!sessionInfo) {
      let hasAccess = (next.data['accessKey'] == null || this.sessionInfoSvc.hasAccess(next.data['accessKey']))
      if (!hasAccess)
        this.router.navigate(['/']);
      return hasAccess;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: state.url
        }
      });
      return false;
    }

  }

}
