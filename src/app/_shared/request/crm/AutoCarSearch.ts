import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractApiSearchRequest } from "../../abstract/AbstractApiSearchRequest";

export class AutoCarSearchRequest extends AbstractApiSearchRequest {

    id!: string;

    owner_inn!: string;

    pinpp!: string;

    serial_number!: string;

    status!: string;

    constructor() {
        super(CrmApiUrl.AUTO_CAR_SEARCH);
    }

    public getId(): string {
        return this.id;
    }

    public setId(value: string) {
        this.id = value;
    }

    public getOwnerInn(): string {
        return this.owner_inn;
    }

    public setOwnerInn(value: string) {
        this.owner_inn = value;
    }

    public getPinpp(): string {
        return this.pinpp;
    }

    public setPinpp(value: string) {
        this.pinpp = value;
    }

    public getSerialNumber(): string {
        return this.serial_number;
    }

    public setSerialNumber(value: string) {
        this.serial_number = value;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(value: string) {
        this.status = value;
    }
}
