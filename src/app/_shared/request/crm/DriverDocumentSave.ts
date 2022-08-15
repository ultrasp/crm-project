import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractDriverRequest } from "../../abstract/AbstractDriverRequest";

export class DriverDocumentSave extends AbstractDriverRequest {

  id!: string;

  document_number!: string;

  given_by!: string;

  given_date!:string;

  driver_id!:string;

  issue_date!:string;

  type_id!:string;

  constructor(id:string = '') {
    super(CrmApiUrl.DRIVER_DOCUMENT_SAVE);
    if(id) this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public setOwnerId(value: string){
    this.driver_id = value;
  }

  public setDocNumber(val:string){
    this.document_number = val;
  }

}
