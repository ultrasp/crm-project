import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class EmployeeRelativeSave extends AbstractCrmRequest  {

  id!: string;

  born_date!: string;

  born_place!:string;

  employee_id!:string;

  life_place!:string;

  name!:string;

  type_id!:string;

  life_place_view!:string;

  work_info!:string;

  constructor(id:string) {
    super(id ? CrmApiUrl.EMPLOYEE_RELATIVITY_UPDATE : CrmApiUrl.EMPLOYEE_RELATIVITY_ADD);
    this.id = id;
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
