import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import {AbstractAuditSearchRequest} from "../../abstract/AbstractAuditSearchRequest";

export class Audit extends AbstractAuditSearchRequest {

  id!: number;
  employee_id!: string;
  date!: string;
  new_data!: string;
  old_data!: string;
  from_date!: string;
  to_date!: string;
  object_id!: string;
  object_type!: string;


  constructor() {
    super(CrmApiUrl.AUDIT_LIST);
  }



}
