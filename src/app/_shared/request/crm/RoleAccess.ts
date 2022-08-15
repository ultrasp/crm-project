import { AbstractCrmSearchRequest } from "../../abstract/AbstractCrmSearchRequest";
import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";

export class RoleAccess extends AbstractCrmSearchRequest {

    access_id!: number;

    role_id!: number;

    type!: number;

    constructor() {
        super(CrmApiUrl.ACCESS_ROLE_LIST);
    }

    public getAccessId(): number {
        return this.access_id;
    }

    public setAccessId(value: number) {
        this.access_id = value;
    }

    public getRoleId(): number {
        return this.role_id;
    }

    public setRoleId(value: number) {
        this.role_id = value;
    }

    public getType(): number {
        return this.type;
    }

    public setType(value: number) {
        this.type = value;
    }
}
