import {CrmApiUrl} from "src/app/common/enums/crm-api-urls.enum";
import {AbstractDriverRequest} from "../../abstract/AbstractDriverRequest";

export class DriverCertificateDeprivation extends AbstractDriverRequest {

  block_end!: string;

  block_start!: string;

  block_type_id!: number;

  driver_id!: string;

  note!: string;


  constructor() {
    super(CrmApiUrl.DRIVER_CERTIFICATE_DEPRIVATION);
  }

  public getBlockEnd(): string {
    return this.block_end;
  }

  public setBlockEnd(value: string) {
    this.block_end = value;
  }

  public getDriverId(): string {
    return this.driver_id;
  }

  public setDriverId(value: string) {
    this.driver_id = value;
  }

  public setBlockStart(value: string) {
    this.block_start = value;
  }

  public setBlockTypeId(value: number) {
    this.block_type_id = value;
  }

  public setNote(value: string) {
    this.note = value;
  }


}
