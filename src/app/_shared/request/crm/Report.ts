import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractReportSearchRequest } from "../../abstract/AbstractReportSearchRequest";

export class ReportSearch extends AbstractReportSearchRequest {

  id!: string;

  constructor() {
    super(CrmApiUrl.REPORT_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }


}
