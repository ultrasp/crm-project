import { Access } from "./Access";
import { Address } from "./Address";
import { Branch } from "./Branch";
import { CarModel } from "./CarModel";
import { Reference } from "./Reference";
import { RefTree } from "./RefTree";
import { RefType } from "./RefType";
import { ReportSearch } from "./Report";
import { Role } from "./Role";
import {Employee} from "./Employee";
import {Country} from "./Country";

export class RequestList {
  static get(key: string) {
    let list = new Map<string,
      any>([
        [RequestClassKey.ADDRESS, new Address],
        [RequestClassKey.COUNTRY, new Country],
        [RequestClassKey.BRANCH, new Branch],
        [RequestClassKey.REF_TYPE, new RefType],
        [RequestClassKey.REFERENCE, new Reference],
        [RequestClassKey.ROLE, new Role],
        [RequestClassKey.ACCESS, new Access],
        [RequestClassKey.REPORT, new ReportSearch],
        [RequestClassKey.CAR_MODEL, new CarModel],
        [RequestClassKey.EMPLOYEE, new Employee],
        [RequestClassKey.REF_TREE, new RefTree],
      ]);
    return list.has(key) ? list.get(key) : null;
  }
}

export enum RequestClassKey {
  ADDRESS = "address",
  COUNTRY = "country",
  BRANCH = "branch",
  REF_TYPE = "refType",
  REFERENCE = "reference",
  ROLE = "role",
  ACCESS = "access",
  REPORT = "report",
  CAR_MODEL = "carModel",
  EMPLOYEE = "employee",
  REF_TREE = 'refTree'
}
