import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractReportRequest } from "../../abstract/AbstractReportRequest";

export class ReportParamSave extends AbstractReportRequest {

  id!: string;

  report_id!:string;

  component!:string;
  data_type!:string;
  name!:string;
  order!:string;

  constructor(id:string= '') {
    super(id ? CrmApiUrl.REPORT_PARAM_UPDATE: CrmApiUrl.REPORT_PARAM_ADD);
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }


}
