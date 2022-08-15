import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { SystemConfig } from "../common/enums/system-config.enum";
import { Branch } from "../_shared/request/crm/Branch";
import { Employee } from "../_shared/request/crm/Employee";
import { Reference } from "../_shared/request/crm/Reference";
import { Role } from "../_shared/request/crm/Role";
import { RoleAccess } from "../_shared/request/crm/RoleAccess";
import { COFService } from "./COFService";
import { Address } from "../_shared/request/crm/Address";
import { RefTree } from "../_shared/request/crm/RefTree";
import { Access } from "../_shared/request/crm/Access";
import { SessionInfoService } from "../main/components/services/session-info.service";

@Injectable({ providedIn: 'root' })
export class ResourceService {

    private _reference: any;
    private _branches: any;
    private _employees: any;
    private _roles: any;
    private _roleAccess: any;
    private _access: any;
    private _address: any;
    private _refTrees: any;

    requestReference = new Reference();
    requestForBranch = new Branch();
    requestForEmployees = new Employee();
    requestForRoles = new Role();
    requestForAccess = new RoleAccess();
    requestForAccessList = new Access();
    requestForAddress = new Address();
    requestReferenceTree = new RefTree();

    constructor(private cof: COFService, private sessionInfoSvc: SessionInfoService) { }

    public load() {
        return new Promise((resolve, reject) => {
          Promise.all([
            this.loadReferencesList(),
            this.loadBranchesList(),
            this.loadEmployeelist(),
            this.loadUserRoles(),
            this.loadUserAccess(),
            this.loadAccessList(),
            this.loadAddress(),
            this.loadReferenceTreeList(),
          ]).then(() => {
            resolve(true);
          })
        })
    }

    public loadOnlyReferences() {
        return new Promise((resolve, reject) => {
            this.loadReferencesList().then(r => {
                resolve(true);
            });
        })
    }

    private updateReferences(data: any) {
        this._reference = data;
    }

    private updateBranch(data: any) {
      this._branches = data;
    }

    private updateEmployees(data: any) {
        this._employees = data;
    }

    private updateUserRoles(data: any) {
      this._roles = data;
    }

    private updateUserAccess(data: any) {
        this._roleAccess = data;
    }

    private updateAccessList(data: any) {
        this._access = data;
    }

    private updateAddress(data: any) {
        this._address = data;
    }

    private updateReferenceTree(data: any) {
      this._refTrees = data;
    }

    private async loadReferencesList() {
        this.requestReference.setCount(10000);
        this.requestReference.setKey('');
        this.requestReference.setName('');
        this.requestReference.setTypeId('');

        let result: any = await firstValueFrom(this.cof.doRequest(this.requestReference));

        if (result && !!result) {
            this.updateReferences(result.data);
        }
    }

    private async loadBranchesList() {
        this.requestForBranch.setCount(10000);
        this.requestForBranch.setParentId('');
        this.requestForBranch.setName('');

        let result: any = await firstValueFrom(this.cof.doRequest(this.requestForBranch));

        if (result && !!result) {
            this.updateBranch(result.data);
        }
    }

    private async loadEmployeelist() {
        this.requestForEmployees.setCount(10000);
        this.requestForEmployees.setId("");

        let result: any = await firstValueFrom(this.cof.doRequest(this.requestForEmployees));

        if (result && !!result) {
            this.updateEmployees(result.data);
        }
    }

    private async loadUserRoles() {
        this.requestForRoles.setCount(10000);
        this.requestForRoles.setName('');
        this.requestForRoles.setKey('');
        this.requestForRoles.setDescription('');

        let result: any = await firstValueFrom(this.cof.doRequest(this.requestForRoles));

        if (result && !!result) {
            this.updateUserRoles(result.data);
        }
    }

    private async loadUserAccess() {
        this.requestForAccess.setCount(10000);
        this.requestForAccess.setRoleId(this.sessionInfoSvc.getSesionInfo().data?.user_info.role_id || 0);

        let result: any = await firstValueFrom(this.cof.doRequest(this.requestForAccess));
        if (result && !!result) {
            this.updateUserAccess(result.data);
        }
    }

    private async loadAccessList() {
        this.requestForAccessList.setCount(10000);

        let result: any = await firstValueFrom(this.cof.doRequest(this.requestForAccessList));
        if (result && !!result) {
            this.updateAccessList(result.data);
        }
    }

    private async loadAddress() {
        this.requestForAddress.setCount(100000);
        let result: any = await firstValueFrom(this.cof.doRequest(this.requestForAddress));

        if (result && !!result) {
            this.updateAddress(result.data);
        }
    }

    private async loadReferenceTreeList() {
        this.requestReferenceTree.setCount(10000);
        this.requestReferenceTree.setKey('');
        this.requestReferenceTree.setName('');

        let result: any = await firstValueFrom(this.cof.doRequest(this.requestReferenceTree));

        if (result && !!result) {
            this.updateReferenceTree(result.data);
        }
    }

  get reference(): any {
    return this._reference;
  }

  get employees(): any {
    return this._employees;
  }

  get roleAccess(): any {
    return this._roleAccess;
  }

  get refTrees(): any {
    return this._refTrees;
  }

  get access(): any {
    return this._access;
  }

  get address(): any {
    return this._address;
  }

  get roles(): any {
    return this._roles;
  }

  get branches(): any {
    return this._branches;
  }

}
