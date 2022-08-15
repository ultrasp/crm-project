import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { ownerPanelSearchRequest } from "src/app/main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";
import {AbstractCarSearchRequest} from "../../abstract/AbstractCarSearchRequest";
export class CarTuningList extends AbstractCarSearchRequest  implements ownerPanelSearchRequest {

  car_id?: string;
  document_number?: string;
  given_by?: string;
  to_issue_date!: string;
  from_issue_date!: string;
  given_date?: string;
  id?: number;
  issue_date?: string;
  type_ids?: number[];

  constructor() {
    super(CrmApiUrl.CAR_TUNING_LIST);
  }

  setOwnerId(ownerId: string): void {
    this.car_id = ownerId;
  }

}
