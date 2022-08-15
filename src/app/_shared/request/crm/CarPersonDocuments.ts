import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { ownerPanelSearchRequest } from "src/app/main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import {AbstractCarSearchRequest} from "../../abstract/AbstractCarSearchRequest";

export class CarPersonDocuments extends AbstractCarSearchRequest implements ownerPanelSearchRequest{

  id!: string;

  type_id!:string;

  person_id!:string;

  constructor() {
    super(CrmApiUrl.CAR_PERSON_DOCUMENT_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public setOwnerId(value:string){
    this.person_id = value;
  }

  public setTypeId(value:string){
    this.type_id = value;
  }

}
