import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractReportRequest } from "../../abstract/AbstractReportRequest";

export class ReportSave extends AbstractReportRequest {

  id!: string;

  branch_id!: number;
  content_type!: string;
  executor!: string;
  flag!: number;
  name!: string;
  order!: number;
  parent_id!: number;
  security_role!: string;
  sql_body!: string;
  template_name!: string;

  constructor(id:string) {
    super(id ? CrmApiUrl.REPORT_UPDATE :CrmApiUrl.REPORT_ADD);
    this.id  =id;
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }


}
