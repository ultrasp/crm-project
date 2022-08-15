import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, lastValueFrom } from "rxjs";
import { ICrmConfig } from "../common/helpers/crm-config";

@Injectable({ providedIn: 'root' })
export class CrmConfigService {

    private config!: ICrmConfig;
    private configSubject$: BehaviorSubject<ICrmConfig> = new BehaviorSubject(this.config);

    constructor(private _http: HttpClient) { }

    public loadConfig() {
        return lastValueFrom(this._http.get('./assets/config/crm-config.json'))
            .then((config: any) => {
                this.config = config;
                this.configSubject$.next(this.config);
            })
            .catch((err: any) => {
                console.error(err);
            });
    }

    public getConfig() {
        return this.config;
    }
}