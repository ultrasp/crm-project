import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";
import { AbstractDriverRequest } from "../../abstract/AbstractDriverRequest";

export class CarPersonDocumentSave extends AbstractCarRequest {

  id!: string;

  document_number!: string;

  given_by!: string;

  given_date!:string;

  person_id!:string;

  issue_date!:string;

  type_id!:string;

  constructor(id:string = '') {
    super(CrmApiUrl.CAR_PERSON_DOCUMENT_SAVE);
    if(id) this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public setOwnerId(value: string){
    this.person_id = value;
  }

  public setDocNumber(val:string){
    this.document_number = val;
  }

}
