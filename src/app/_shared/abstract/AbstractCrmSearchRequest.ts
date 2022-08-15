import { SystemConfig } from "src/app/common/enums/system-config.enum";
import { AbstractSearch } from "./AbstractSearch";

export abstract class AbstractCrmSearchRequest extends AbstractSearch {

  private apiURI: string;

  constructor(uri: string) {
    super();

    this.apiURI = SystemConfig.CRM_CRM_PREFIX + uri;
  }

  override getURI(): string {
    return this.apiURI;
  }
}
