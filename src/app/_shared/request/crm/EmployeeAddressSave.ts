import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";
import { IAddressRequest } from "../../abstract/interfaces/IAddressRequest";

export class EmployeeAddressSave extends AbstractCrmRequest implements IAddressRequest  {

  id!: string;

  address!:string;

  block!:string;

  cadas_id!:string;

  note!:string;

  region_id!: string;

  city_id!:string;

  flat!:string;

  house!:string;

  massiv_id!:string;

  street_id!:string;

  employee_id!:string;

  type_id!:string;
  street_name!:string;
  naspunkt!:string

  constructor(isAdd= true) {
    super(isAdd  ? CrmApiUrl.EMPLOYEE_ADDRESS_ADD : CrmApiUrl.EMPLOYEE_ADDRESS_UPDATE);
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
  
  
  public setOwnerId(value: string){
    this.employee_id = value;
  }

  public setTypeId(value:string){
    this.type_id = value;
  }
}
