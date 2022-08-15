import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarSearchRequest } from "../../abstract/AbstractCarSearchRequest";

export class CarOwnerList extends AbstractCarSearchRequest {

  client_doc_id!: string;
  client_name!: string;
  client_phone!: string;
  client_sector!: string;
  person_doc_num!: string;
  relation_branch_id!: string;
  relation_drb_number!: string;

  constructor() {
    super(CrmApiUrl.CAR_OWNER_LIST);
  }

  public getClientDocId(): string {
    return this.client_doc_id
  }

  public setClientDocId(value: string) {
    this.client_doc_id = value;
  }

  public getClientName(): string {
    return this.client_name
  }

  public setClientName(value: string) {
    this.client_name = value;
  }

  public getClientPhone(): string {
    return this.client_phone
  }

  public setClientPhone(value: string) {
    this.client_phone = value;
  }

  public getClientSector(): string {
    return this.client_sector
  }

  public setClientSector(value: string) {
    this.client_sector = value;
  }

  public getPersonDocNum(): string {
    return this.person_doc_num
  }

  public setPersonDocNum(value: string) {
    this.person_doc_num = value;
  }

  public getRelationBranchId(): string {
    return this.relation_branch_id
  }

  public setRelationBranchId(value: string) {
    this.relation_branch_id = value;
  }

  public getRelationDrbNumber(): string {
    return this.relation_drb_number
  }

  public setRelationDrbNumber(value: string) {
    this.relation_drb_number = value;
  }
}

