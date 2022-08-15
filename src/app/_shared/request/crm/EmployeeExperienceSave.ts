import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class EmployeeExperienceSave extends AbstractCrmRequest  {

  id!: string;

  work_place!: string;

  work_address!:string;

  start_date!:string;

  position_id!:string;

  end_date!:string;

  employee_id!:string;

  edit_by!:string;

  constructor(id:string) {
    super(id? CrmApiUrl.EMPLOYEE_EXPERIENCE_UPDATE : CrmApiUrl.EMPLOYEE_EXPERIENCE_ADD);
    if(id)
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
