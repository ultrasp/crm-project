import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractReportSearchRequest } from "../../abstract/AbstractReportSearchRequest";

export class ReportParamSearch extends AbstractReportSearchRequest {

  id!: string;

  report_id!:string;
  constructor() {
    super(CrmApiUrl.REPORT_PARAM_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }


}
