import { SystemConfig } from "src/app/common/enums/system-config.enum";
import { AbstractSearch } from "./AbstractSearch";

export abstract class AbstractCarCheckSearchRequest extends AbstractSearch {

  private apiURI: string;

  constructor(uri: string) {
    super();

    this.apiURI = SystemConfig.CRM_CAR_CHECK_PREFIX + uri;
  }

  override getURI(): string {
    return this.apiURI;
  }

  // setUrl(uri:string):void{
  //   this.apiURI = SystemConfig.CRM_CAR_PREFIX + uri;

  // }
}
