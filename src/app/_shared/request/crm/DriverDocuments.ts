import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { ownerPanelSearchRequest } from "src/app/main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import { AbstractDriverSearchRequest } from "../../abstract/AbstractDriverSearchRequest";

export class DriverDocuments extends AbstractDriverSearchRequest implements ownerPanelSearchRequest{

  id!: string;

  type_id!:string;

  driver_id!:string;
  
  constructor() {
    super(CrmApiUrl.DRIVER_DOCUMENT_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public setOwnerId(value:string){
    this.driver_id = value;
  }

  public setTypeId(value:string){
    this.type_id = value;
  }

}
