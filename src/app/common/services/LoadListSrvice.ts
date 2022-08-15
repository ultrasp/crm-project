import {
  Injectable
} from "@angular/core";
import {
  defaultIfEmpty,
  filter,
  firstValueFrom,
  map,
  Observable,
  of
} from "rxjs";
import { IRefTree } from "src/app/main/models/ref-tree.entity";
import {
  IReference
} from "src/app/main/models/reference.entity";
import {
  COFService
} from "src/app/_service/COFService";
import {
  CommonUtil
} from "src/app/_service/util/CommonUtil";
import {
  AbstractCrmSearchRequest
} from "src/app/_shared/abstract/AbstractCrmSearchRequest";
import {
  Reference
} from "src/app/_shared/request/crm/Reference";
import {
  RefTree
} from "src/app/_shared/request/crm/RefTree";
import {
  RequestClassKey,
  RequestList
} from "src/app/_shared/request/crm/RequestList";
import {
  ISelectOption
} from "../widgets/CrmSelect/CrmSelect";

@Injectable({
  providedIn: 'root',
})
export class LoadListSrvice {

  constructor(private cof: COFService) {

  }

  private localLoads: string[] = [RequestClassKey.REFERENCE, RequestClassKey.REF_TREE];

  load(className: string, setRequestParams: Function | undefined): Observable < ISelectOptionItem[] > {
    let request = RequestList.get(className);
    if (!request) {
      return of([]);
    }
    request.setCount(1000);

    if (setRequestParams) {
      setRequestParams(request);
    }

    if (this.localLoads.includes(className)) {
      return of(this.loadFromLocalStorage(className, request));
    }

    return this.cof.doRequest(request).pipe(
      filter(result => result && !!result),
      map((result: any) => {
        if(RequestClassKey.EMPLOYEE == className) {
          return result.data.map((item: any) => < ISelectOptionItem > {
            key: String(item.id),
            title: item.first_name + ' ' + item.last_name + ' ' + item.middle_name,
            obj: item
          })
        }
        return result.data.map((item: IResponceList) => < ISelectOptionItem > {
          key: String((RequestClassKey.REFERENCE == className ? ( < any > item).key : item.id)),
          title: item.name,
          obj: item
        })
      }),
    );
  }

  loadFromLocalStorage(className: string, request: any) {
    let list: ISelectOptionItem[] = [];
    switch (className) {
      case RequestClassKey.REFERENCE:
        list = CommonUtil.getReferenceListByTypeId(parseInt(request.getTypeId())).map((item: IReference) => new ISelectOptionItem(item.key + '', item.name, item))
        break;
      case RequestClassKey.REF_TREE:
        list = CommonUtil.getReferenceTreeListByTypeId(parseInt(request.getTypeId())).filter(v =>
          ( request.parent_key == null || ((v as any).parent_key == request.parent_key) ) &&
          ( request.not_equal_parent_key == null || ((v as any).parent_key != request.not_equal_parent_key) )
        ).map((item: IRefTree) => new ISelectOptionItem(item.key + '', item.name, item))
        break;
      default:
        break;
    }
    return list;
  }
}

export interface IResponceList {
  id: string,
    name: string
}

export class ISelectOptionItem extends ISelectOption {
  obj: any
  constructor(key: string, title: string, item: any) {
    super(key, title);
    this.obj = item;
  }

}

export interface IRequestSetter {
  setRequestParams(request: AbstractCrmSearchRequest): void;

}
