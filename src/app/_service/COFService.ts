import { Injectable } from "@angular/core";
import { IRequest } from "../_shared/abstract/interfaces/IRequest";
import { ReportExecute } from "../_shared/request/crm/ReportExecute";
import { HttpService } from "./HttpService";
import {SystemConfig} from "../common/enums/system-config.enum";

@Injectable({providedIn:'root'})
export class COFService {

  tranId: number = 1;
  curLID: number = 1;

  protected printMode_ = false;

  constructor(protected httpService: HttpService) { }

  public doRequest(query: IRequest) {
    return this.httpService.doCommunication(query);
  }

  public doGetFileRequest(query: IRequest) {
    return this.httpService.doFileGetCommunication(query);
  }

  public doGetRequest(query: IRequest) {
    return this.httpService.doGetCommunication(query);
  }

  public doReportRequest(request: IRequest){
    return this.httpService.doReportCommunication(request);
  }

  public login(query: IRequest) {
    return this.httpService.login(query);
  }
}
