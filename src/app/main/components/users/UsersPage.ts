import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CrmLoadList} from 'src/app/common/widgets/CrmLoadList/CrmLoadList';
import {ColDef} from 'ag-grid-community';
import {IUser} from '../../models/user.entity';
import {User} from 'src/app/_shared/request/crm/User';
import {UserFormDialog} from './userFormDialog/userFormDialog';
import {AgGridBean} from 'src/app/common/widgets/DataGrid/AgGridBean';
import {TranslateService} from '@ngx-translate/core';
import {BreadcrumbModel, BreadCrumbService} from '../breadcrumb/BreadCrumbService';
import {CommonUtil} from 'src/app/_service/util/CommonUtil';
import {CrmConfirmDialog} from "../../../common/widgets/CrmConfirmDialog/CrmConfirmDialog";
import {UserBlock} from 'src/app/_shared/request/crm/UserBlock';
import {COFService} from 'src/app/_service/COFService';
import {firstValueFrom} from 'rxjs';
import {UserType} from "../../../common/enums/user_type";

@Component({
  selector: 'crm-users-page',
  templateUrl: './UsersPage.html',
  styleUrls: ['./UsersPage.css']
})
export class UsersPage implements OnInit {

  constructor(private translate: TranslateService, private breadcrumbs: BreadCrumbService, private cof: COFService) {
    let breadcrumbMenu: BreadcrumbModel[] = [
      new BreadcrumbModel(this.translate.instant('MENU.USERS')),
    ]
    this.breadcrumbs.setItems(breadcrumbMenu);

  }

  ngOnInit(): void {
    this.requestUsers.setName("");
  }


  @ViewChild('uzelList', {
    read: CrmLoadList
  }) uzelList ? : CrmLoadList;

  form: FormGroup = new FormGroup({
    branchId: new FormControl(),
    emp: new FormControl(),
    uzel: new FormControl(),
    login: new FormControl(),
    empCode: new FormControl(),
    roleId: new FormControl(),
  });

  userData: IUser[] = [];

  refTablecolumnDefs: ColDef[] = [{
      field: 'id',
      headerName: 'GENERAL.ID',
      resizable: true,
    },
    {
      field: 'name',
      headerName: 'GENERAL.EMPLOYEE',
      resizable: true,
    },
    {
      field: 'username',
      headerName: 'GENERAL.LOGIN',
      resizable: true,
    },
    {
      field: 'role_id',
      headerName: 'GENERAL.ROLE',
      cellRenderer: params => CommonUtil.getRoleNameById(params.value),
      resizable: true,
    },
    {
      field: 'branch_id',
      headerName: 'GENERAL.ORGANIZATION',
      cellRenderer: params => CommonUtil.getBranchNameById(params.value),
      resizable: true,
    },
    {
      field: 'edit',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onBtnClick1.bind(this),
        icon: 'edit',
        colorMode: 'primary'
      },
      headerName: 'FORM.CHANGE',
      width:50
    },
    {
      field: 'delete',
      cellRendererParams: {
        onClick: this.onDeleteBtnClick.bind(this),
        icon: 'delete',
        colorMode: 'warn'
      },
      cellRendererSelector: params => {
        return (params.data?.flag == 2) ? undefined : {
          component: "buttonRenderer"
        }
      },
      headerName: 'FORM.DELETE',
      width:50
    },
  ];

  requestUsers = new User();
  pageSize = 12;
  @ViewChild(AgGridBean, {
    static: true
  }) dataGrid!: AgGridBean;

  onBtnClick1(e: any) {
    this.openForm( parseInt(e.rowData.flag), ( < IUser > e.rowData).id);
  }

  onDeleteBtnClick(e: any) {
    CrmConfirmDialog.show(this.translate.instant('GENERAL.ARE_YOU_SURE_YOU_WANT_DELETE_THIS_ITEM')).subscribe(res => {
      if (res) {
        let blockRequest = new UserBlock(( < IUser > e.rowData).id);
        firstValueFrom(this.cof.doRequest(blockRequest)).then(result => {
          if (result) {
            this.dataGrid.reloadGrid();
          }

        })
      }
    });
  }

  async getUserList() {
    this.requestUsers.setBranchId(this.form.get('branchId') !.value)
    this.requestUsers.setUsername(this.form.get('login') !.value)
    this.requestUsers.setName(this.form.get('emp') !.value)
    this.requestUsers.setId(this.form.get('empCode') !.value)
    this.requestUsers.setRoleId(this.form.get('roleId') !.value)
    if (this.dataGrid) {
      this.dataGrid.reloadGrid();
    }
  }

  getInternalType() {
    return UserType.INTERNAL;
  }

  getExternalType() {
    return UserType.EXTERNAL;
  }

  openForm(type: UserType = UserType.EXTERNAL, id: string = '') {
    UserFormDialog.openDialog(id, type).subscribe(result => {
      if (result) {
        this.dataGrid.reloadGrid();
      }
    });
  }

}
