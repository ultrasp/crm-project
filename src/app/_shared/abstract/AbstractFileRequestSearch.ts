import { SystemConfig } from "src/app/common/enums/system-config.enum";
import { IRequest } from "./interfaces/IRequest";
import {AbstractSearch} from "./AbstractSearch";

export abstract class AbstractFileRequestSearch extends AbstractSearch implements IRequest {

  private apiURI: string;

  constructor(uri: string) {
    super();
    this.apiURI = SystemConfig.CRM_FILE_PREFIX + uri;
  }

  override getURI(): string {
    return this.apiURI;
  }
}
