import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class EmployeeSave extends AbstractCrmRequest {

    id!: string;

    academic_degree_id!: number;
    academic_type_id!: number;
    born_date!: string;
    branch_id!: number;
    citizenship_id!: number;
    first_name!: string;
    last_name!: string;
    middle_name!: string;
    military_id!: string;
    military_title_id!: number;
    nationality_id!: number;
    party_member!: boolean;
    pnfl!: string;
    position_id!: number;
    profession_id!: number;
    sex_id!: number;
    state_id!: number;
    token_id!: string;
  
    constructor() {
        super(CrmApiUrl.EMPLOYEE_SAVE);
    }

    public getId(): string {
        return this.id;
    }

    public setId(value: string) {
        this.id = value;
    }


}