import { SystemConfig } from "src/app/common/enums/system-config.enum";
import { IRequest } from "./interfaces/IRequest";

export abstract class AbstractFileRequest implements IRequest {

  private apiURI: string;

  constructor(uri: string) {
    this.apiURI = SystemConfig.CRM_FILE_PREFIX + uri;
  }

  getURI(): string {
    return this.apiURI;
  }
}
