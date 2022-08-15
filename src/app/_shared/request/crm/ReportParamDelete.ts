import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractReportRequest } from "../../abstract/AbstractReportRequest";

export class ReportParamDelete extends AbstractReportRequest {

  id!: string;


  constructor(id:string) {
    super(CrmApiUrl.REPORT_PARAM_DELETE + "/" + id);
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }


}
