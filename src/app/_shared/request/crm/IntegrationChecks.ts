import {AbstractMipRequest} from "../../abstract/AbstractMipRequest";

export class IntegrationChecks extends AbstractMipRequest{

  constructor(url: string, pinfl: string) {
    super(url + '/?pinfl=' + pinfl);
  }

}
