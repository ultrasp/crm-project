import {
  Injectable
} from '@angular/core';
import {
  AttributeParamConfig
} from './AttributeParamConfig';
import {
  AttributeParamItem
} from './AttributeParamItem';
import {
  AttrTypeText
} from './widgets/AttrTypeText';
import {
  AttrCheckbox
} from './widgets/AttrCheckbox';
import {
  AttrTypePhone
} from './widgets/AttrTypePhone';
import {
  AttrKeyValueList
} from './widgets/AttrKeyValueList';
import { AttrTypeLabel } from './widgets/AttrTypeLabel';
import { AttrTypeRef } from './widgets/AttrTypeRef';
import { AttrTypeDate } from './widgets/AttrTypeDate';
import { AttrTypeInspector } from './widgets/AttrTypeInspector';
import { CompareUtil } from 'src/app/_service/util/CompareUtil';
import { AttrTypeInteger } from './widgets/AttrTypeInteger';
import { AttrBranchList } from './widgets/AttrBranchList';
import {AttrTypeRefTree} from "./widgets/AttrTypeRefTree";
import { AttrMultiSelect } from './widgets/AttrMultiSelect';

@Injectable({providedIn:'root'})
export class AttributeParamService {

  getParam(param: AttributeParamConfig) {
    var result: AttributeParamItem | null = null;
    if (param.readOnly && !param.component.startsWith("cb_")) {
      result = new AttributeParamItem(AttrTypeLabel, param);
    }else if (CompareUtil.equalsIgnoreCase("checkbox", param.component)) {
      result = new AttributeParamItem(AttrCheckbox, param);
    } else if (CompareUtil.equalsIgnoreCase("INPUT", param.component)) {
      result = new AttributeParamItem(AttrTypeText, param);
    } else if (param.component.startsWith("cb_reviewer")) {
      result = new AttributeParamItem(AttrTypeInspector, param);//need todo
    } else if (CompareUtil.equalsIgnoreCase("phone_field", param.component)) {
      result = new AttributeParamItem(AttrTypePhone, param);
    } else if (CompareUtil.equalsIgnoreCase("REF", param.component)) {
      result = new AttributeParamItem(AttrTypeRef, param);
    } else if (CompareUtil.equalsIgnoreCase("MULTIREF", param.component)) {
      result = new AttributeParamItem(AttrMultiSelect, param);
    } else if (CompareUtil.equalsIgnoreCase("REFTREE", param.component)) {
      result = new AttributeParamItem(AttrTypeRefTree, param);
    } else if (CompareUtil.equalsIgnoreCase("date", param.component)) {
      result = new AttributeParamItem(AttrTypeDate, param);
    } else if (CompareUtil.equalsIgnoreCase("INTEGER", param.component)) {
      result = new AttributeParamItem(AttrTypeInteger, param);
    } else if (CompareUtil.equalsIgnoreCase("branchId", param.component)) {
      result = new AttributeParamItem(AttrBranchList, param);
    } else {
      throw new Error("Parameter with key \"" + param.component + "\" not found ");
    }
    return result;
  }
}
