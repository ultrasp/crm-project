import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { FormControl, FormGroup } from "@angular/forms";
import { AgGridBean } from "../../../../common/widgets/DataGrid/AgGridBean";
import { CrmBranch } from "../../../../common/widgets/CrmBranch/CrmBranch";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { Role } from "../../../../_shared/request/crm/Role";
import { StringUtil } from "../../../../_service/util/StringUtil";
import { IRole } from "../../../models/role.entity";
import { TranslateService } from "@ngx-translate/core";
import { CrmFormDialog } from "src/app/common/widgets/CrmFormDialog/CrmFormDialog";
import { RoleAddForm } from "./role-add/RoleAddForm";
import { BehaviorSubject } from "rxjs";
import { RoleAccessSearch } from "../role-access/RoleAccessSearch";

@Component({
  selector: 'crm-role-search',
  templateUrl: './RoleSearch.html',
  styleUrls: ['./RoleSearch.css'],
})
export class RoleSearch implements OnInit {
  constructor(private router: Router, private dialog: MatDialog, private translate: TranslateService) {
  }

  ngOnInit(): void {
    console.log(this.dataGrid,'this.dataGrid')
    if (this.dataGrid) {
      this.getRoleList();
    }

  }

  form: FormGroup = new FormGroup({
    name: new FormControl(),
    key: new FormControl(),
    description: new FormControl(),
  });

  refTableColumnDefs: ColDef[] = [
    {
      field: 'name',
      headerName: 'ROLE.NAME',
      resizable: true,
    },
    {
      field: 'key',
      headerName: 'ROLE.KEY',
      resizable: true,
    },
    {
      field: 'description',
      headerName: 'ROLE.DESCRIPTION',
      resizable: true,
    },
    {
      field: 'edit',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.openRoleAccess.bind(this),
        icon: 'format_list_bulleted',
        colorMode: 'primary'
      },
      headerName: 'ROLE.ROLE_ACCESS'
    }
  ];

  pageSize = 12;
  requestRoles = new Role();

  @ViewChild(AgGridBean, { static: true }) dataGrid!: AgGridBean;
  @ViewChild(CrmBranch, { static: true }) branch!: CrmBranch;
  $refreshDetail = new BehaviorSubject(null);

  getRoleList() {
    this.requestRoles.setName(StringUtil.emptyString(this.form.get('name')!.value) ? null : this.form.get('name')!.value);
    this.requestRoles.setKey(StringUtil.emptyString(this.form.get('key')!.value) ? null : this.form.get('key')!.value);
    this.requestRoles.setDescription(StringUtil.emptyString(this.form.get('description')!.value) ? null : this.form.get('description')!.value);
    if (this.dataGrid) {
      this.dataGrid.reloadGrid();
    }
  }

  openAddRole() {
    CrmFormDialog.show('ROLE.ADD_ROLE', RoleAddForm, {}).subscribe(result => {
      if (result) {
        this.$refreshDetail.next(null);
      }
    });
  }

  onGridReady(){
    this.getRoleList();
  }
  openRoleAccess(e: any) {
    RoleAccessSearch.show('ROLE.ROLE_ACCESS', e.rowData.id).subscribe(result => {
      if (result) {
        this.$refreshDetail.next(null);
      }
    })
  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl!.status == 'INVALID' && formControl!.touched;
  }

  convertData(result: IRole) {
    return {
      name: result.name,
      key: result.key,
      description: result.description,
    };
  }
}
