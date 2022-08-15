import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarCheckSearchRequest } from "../../abstract/AbstractCarInfoSearchRequest";

export class PersonInfoParamSearchRequest extends AbstractCarCheckSearchRequest  {

  born_date!: string;
  doc_num!: string;
  doc_type_id!: number;
  first_name!: string;
  given_by!: string;
  given_by_id!: number;
  given_date!: string;
  id!: number;
  issue_date!: string;
  last_name!: string;
  middle_name!: string;
  person_info_id!: number;
  search_type_id!: number;
  sex_id!: number;
  
  constructor() {
    super(CrmApiUrl.PERSON_INFO_PARAM_LIST);
  }

}
