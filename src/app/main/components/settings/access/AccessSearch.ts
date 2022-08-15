import { Component, OnInit, ViewChild } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { FormControl, FormGroup } from "@angular/forms";
import { AgGridBean } from "../../../../common/widgets/DataGrid/AgGridBean";
import { CrmBranch } from "../../../../common/widgets/CrmBranch/CrmBranch";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { StringUtil } from "../../../../_service/util/StringUtil";
import { Access } from "../../../../_shared/request/crm/Access";
import { IAccess } from "../../../models/access-entity";
import { TranslateService } from "@ngx-translate/core";
import { BreadcrumbModel, BreadCrumbService } from "../../breadcrumb/BreadCrumbService";

@Component({
  selector: 'crm-access-search',
  templateUrl: './AccessSearch.html',
  styleUrls: ['./AccessSearch.css'],
})
export class AccessSearch implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, private translate: TranslateService,private breadcrumbs: BreadCrumbService) { 
    this.breadcrumbs.setItems([
      new BreadcrumbModel(this.translate.instant('ACCESS.SEARCH_ACCESSES')),
    ]);
  }

  ngOnInit(): void { }

  form: FormGroup = new FormGroup({
    name: new FormControl(),
    key: new FormControl(),
    description: new FormControl(),
  });

  refTableColumnDefs: ColDef[] = [
    {
      field: 'name',
      headerName: 'ACCESS.NAME',
      resizable: true,
    },
    {
      field: 'key',
      headerName: 'ACCESS.KEY',
      resizable: true,
    },
    {
      field: 'description',
      headerName: 'ACCESS.DESCRIPTION',
      resizable: true,
    },
  ];

  pageSize = 12;
  requestAccesses = new Access();

  @ViewChild(AgGridBean, { static: true }) dataGrid!: AgGridBean;
  @ViewChild(CrmBranch, { static: true }) branch!: CrmBranch;

  getAccessList() {
    this.requestAccesses.setName(StringUtil.emptyString(this.form.get('name')!.value) ? null : this.form.get('name')!.value);
    this.requestAccesses.setKey(StringUtil.emptyString(this.form.get('key')!.value) ? null : this.form.get('key')!.value);
    this.requestAccesses.setDescription(StringUtil.emptyString(this.form.get('description')!.value) ? null : this.form.get('description')!.value);
    if (this.dataGrid) {
      this.dataGrid.reloadGrid();
    }
  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl!.status == 'INVALID' && formControl!.touched;
  }

  convertData(result: IAccess) {
    return {
      name: result.name,
      key: result.key,
      description: result.description,
    };
  }
}
