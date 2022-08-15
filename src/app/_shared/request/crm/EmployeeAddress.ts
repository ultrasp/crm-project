import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { ownerPanelSearchRequest } from "src/app/main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";
import { IAddressGetRequest, IAddressRequest } from "../../abstract/interfaces/IAddressRequest";

export class EmployeeAddress extends AbstractCrmSearchRequest implements ownerPanelSearchRequest,IAddressGetRequest {

  id!: string;

  address!: string;

  employee_id!:string;

  type_id!:string;
  block!: string;
  cadas_id!: string;
  city_id!: string;
  flat!: string;
  house!: string;
  massiv_id!: string;
  note!: string;
  region_id!: string;
  street_id!: string;
  street_name!:string;
  naspunkt!:string

  constructor() {
    super(CrmApiUrl.EMPLOYEE_ADDRESS_LIST);
  }

  setOwnerId(ownerId: string): void {
    this.setEmployeeId(ownerId)
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string){
    this.id = value;
  }

  public getEmployeeId(): string {
    return this.employee_id;
  }

  public setEmployeeId(value: string){
    this.employee_id = value;
  }

}
