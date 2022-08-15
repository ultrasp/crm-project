import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { ownerPanelSearchRequest } from "src/app/main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import {AbstractCarSearchRequest} from "../../abstract/AbstractCarSearchRequest";

export class CarHistoryRequest extends AbstractCarSearchRequest  implements ownerPanelSearchRequest {

  car_id!: string;
  constructor() {
    super(CrmApiUrl.CAR_HISTORY);
  }

  setOwnerId(ownerId: string): void {
    this.car_id = ownerId;
  }

}
