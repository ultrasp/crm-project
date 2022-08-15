import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractReportSearchRequest } from "../../abstract/AbstractReportSearchRequest";

export class ReportExecute extends AbstractReportSearchRequest {

  id!: string;

  constructor( id:string) {
    super(CrmApiUrl.REPORT_EXECUTE+'/' + id);
    this.id = id;
  }

}
