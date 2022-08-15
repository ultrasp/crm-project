import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import {AbstractFileRequestSearch} from "../../abstract/AbstractFileRequestSearch";


export class DriverAttachmentList extends AbstractFileRequestSearch {


  id!: string;
  attachment_id!: string;
  owner_id!: string;
  type_id!: string;

  constructor() {
    super(CrmApiUrl.ATTACHMENT_DRIVER_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public setOwnerId(value: string) {
    this.owner_id = value;
  }
  public getOwnerId() {
    return this.owner_id;
  }

  public setTypeId(typeId: string) {
    this.type_id = typeId;
  }
  public getTypeId() {
    return this.type_id;
  }
}
