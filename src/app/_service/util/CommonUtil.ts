import { SystemConfig } from "src/app/common/enums/system-config.enum";
import { IAccess } from "src/app/main/models/access-entity";
import {IBranch} from "../../main/models/branch.entity";
import { Employee } from "src/app/main/models/employee-entity";
import { IRefTree } from "src/app/main/models/ref-tree.entity";
import { IReference } from "src/app/main/models/reference.entity";
import { IRole, IRoleaccess } from "src/app/main/models/role.entity";
import {IAddress} from "../../main/models/address-entity";
import {InjectorInstance} from "../../app.module";
import {ResourceService} from "../resources-service.service";

export class CommonUtil {

  public static isNull(obj: any): boolean {
    return obj == null || (typeof obj === undefined);
  }

  public static getReferenceListByTypeId(typeId: number): IReference[] {
    let resource = InjectorInstance.get(ResourceService);
    return resource.reference.filter((reference: IReference) => reference.type_id === typeId);
  }

  public static getReferenceByTypeId(value: number, typeId: number): string {
    let resource = InjectorInstance.get(ResourceService);
    return resource.reference.find((reference: IReference) => reference.type_id === typeId && reference.key == value)?.name;
  }

  public static getAddressTypeId(value: number, typeId: number): string {
    let resource = InjectorInstance.get(ResourceService);
    return resource.address.find((address: IAddress) => address.type === typeId && address.id == value)?.name;
  }

  public static getBranchNameById(branchId: string): string {
    let resource = InjectorInstance.get(ResourceService);
    return resource.branches.find((branch: IBranch) => branch.id == branchId)?.name;
  }

  public static getEmployeeNameById(employeeId: string): string {
    let resource = InjectorInstance.get(ResourceService);
    return resource.employees.find((employee: Employee) => employee.id == parseInt(employeeId))?.first_name;
  }

  public static getRoleNameById(roleId: string): string {
    let resource = InjectorInstance.get(ResourceService);
    return resource.roles.find((role: IRole) => role.id == parseInt(roleId))?.name;
  }

  public static getAccessListNameById(accessId: string): string {
    let resource = InjectorInstance.get(ResourceService);
    return resource.access.find((access: IAccess) => access.id == parseInt(accessId))?.name;
  }

  public static getAccessListIdByKey(accessKey: string): number {
    let resource = InjectorInstance.get(ResourceService);
    return resource.access.find((access: IAccess) => access.key == accessKey)?.id;
  }

  public static getAccessListKeyById(accessId: string): string {
    let resource = InjectorInstance.get(ResourceService);
    return resource.access.find((access: IAccess) => access.id == parseInt(accessId))?.key;
  }

  public static getUserAccessList(): IRoleaccess[] {
    let resource = InjectorInstance.get(ResourceService);
    return resource.roleAccess;
  }

  public static getReferenceTreeByTypeId(value: number, typeId: number): string {
    let resource = InjectorInstance.get(ResourceService);
    return resource.refTrees.find((reference: IReference) => reference.type_id === typeId && reference.key == value)?.name;
  }

  public static getReferenceTreeListByTypeId(typeId: number): IRefTree[] {
    let resource = InjectorInstance.get(ResourceService);
    return resource.refTrees.filter((reference: IRefTree) => reference.type_id === typeId);
  }
}
