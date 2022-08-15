import { Component, Inject, Input, OnInit, ViewChild } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { FormControl, FormGroup } from "@angular/forms";
import { AgGridBean } from "../../../../common/widgets/DataGrid/AgGridBean";
import { CrmBranch } from "../../../../common/widgets/CrmBranch/CrmBranch";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StringUtil } from "../../../../_service/util/StringUtil";
import { BehaviorSubject, firstValueFrom, tap } from "rxjs";
import { RoleAccess } from "src/app/_shared/request/crm/RoleAccess";
import { InjectorInstance } from "src/app/app.module";
import { CrmFormDialog } from "src/app/common/widgets/CrmFormDialog/CrmFormDialog";
import { RoleAccessLinkForm } from "../role/RoleAccessLinkForm/RoleAccessLinkForm";
import { CrmConfirmDialog } from "src/app/common/widgets/CrmConfirmDialog/CrmConfirmDialog";
import { COFService } from "src/app/_service/COFService";
import { RoleAccessDelete } from "src/app/_shared/request/crm/RoleAccessDelete";
import { CommonUtil } from "src/app/_service/util/CommonUtil";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'crm-role-access-search',
  templateUrl: './RoleAccessSearch.html',
  styleUrls: ['./RoleAccessSearch.css'],
})
export class RoleAccessSearch implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IRoleAccessSearchData, private dialogRef: MatDialogRef<RoleAccessSearch>, private cof: COFService, private translate: TranslateService) { }

  ngOnInit(): void { }

  form: FormGroup = new FormGroup({
    access_id: new FormControl(),
  });

  refTableColumnDefs: ColDef[] = [
    {
      field: 'access_id',
      headerName: 'ROLE.ACCESS',
      resizable: true,
      cellRenderer: params => CommonUtil.getAccessListNameById(params.value)
    },
    {
      field: 'type',
      headerName: 'ROLE.TYPE',
      resizable: true,
      cellRenderer: params => this.translate.instant(`ROLE_ACCESS.${params.value}`)
    },
    {
      field: 'delete',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.deleteRow.bind(this),
        icon: 'delete',
        colorMode: 'warn'
      },
      headerName: 'FORM.DELETE'
    },
  ];

  pageSize = 12;
  requestRoleAccess = new RoleAccess();

  @ViewChild(AgGridBean, { static: true }) dataGrid!: AgGridBean;
  @ViewChild(CrmBranch, { static: true }) branch!: CrmBranch;
  $refreshDetail = new BehaviorSubject(null);

  @Input() accessParams!: (request: any) => void;

  getRoleAccessList() {
    this.requestRoleAccess.setRoleId(parseInt(this.data.roleId));
    if (this.dataGrid) {
      this.dataGrid.reloadGrid();
    }
  }

  openAddRoleAccess() {
    CrmFormDialog.show('ROLE.ADD_ROLE', RoleAccessLinkForm, { role_id: this.data.roleId }).subscribe(result => {
      if (result) {
        this.dataGrid.reloadGrid();
      }
    });

  }

  async deleteRow(params: any) {
    let row: any = params.rowData;
    let access_id = row == null ? '' : <string>StringUtil.toStr(row.access_id, '');
    let type = row == null ? '' : <string>StringUtil.toStr(row.type, '')
    if (access_id) {
      let needDelete: boolean = await firstValueFrom(CrmConfirmDialog.show('GENERAL.ARE_YOU_SURE_YOU_WANT_DELETE_THIS_ITEM'));
      if (needDelete) {
        let deleteRequest: any = new RoleAccessDelete();
        deleteRequest.setAccessId(access_id)
        deleteRequest.setRoleId(parseInt(this.data.roleId));
        deleteRequest.setType(type);
        firstValueFrom(this.cof.doRequest(deleteRequest).pipe(tap(res => {
          this.dataGrid.reloadGrid();
        })));
      }
    }
  }

  closeModal() {
    this.dialogRef.close(false);
  }

  static show(title: string, role_id: number,) {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(RoleAccessSearch, {
      width: '50%',
      height: '80%',
      data: {
        title: title,
        roleId: role_id
      }
    });
    return dialogRef.afterClosed();
  }
}

export interface IRoleAccessSearchData {
  roleId: string;
  title: string
}