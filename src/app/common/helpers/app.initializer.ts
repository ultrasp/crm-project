import { firstValueFrom, switchMap, tap } from "rxjs";
import { SessionInfoService } from "src/app/main/components/services/session-info.service";
import { AuthenticationService } from "src/app/_service/authentication.service";
import { ResourceService } from "src/app/_service/resources-service.service";

export function appInitializer(authenticationService: AuthenticationService,resService:ResourceService) {
    return () =>  authenticationService.refreshToken().pipe(
        switchMap( (b)=>{
        // if()
        return (b== null) ? Promise.resolve(true) : resService.load() 
    })
    )
    /*
    return () => new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        authenticationService.refreshToken().pipe().subscribe({
            next: (v) => {
                console.log(v,'v')
                if(v !== undefined)
                authenticationService.$autoLoadReferences.next(true);
             },
            error: (e) => { },
            complete: () => {
                
                resolve(true);
            }
        });
    });*/
}

