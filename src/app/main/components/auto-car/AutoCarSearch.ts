import { Component, OnInit, ViewChild } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { FormControl, FormGroup } from "@angular/forms";
import { AgGridBean } from "../../../common/widgets/DataGrid/AgGridBean";
import { StringUtil } from "../../../_service/util/StringUtil";
import { TranslateService } from "@ngx-translate/core";
import { RequestClassKey } from "src/app/_shared/request/crm/RequestList";
import { BreadcrumbModel, BreadCrumbService } from "../breadcrumb/BreadCrumbService";
import { Router } from "@angular/router";
import { AutoCarSearchRequest } from "src/app/_shared/request/crm/AutoCarSearch";

@Component({
  selector: 'crm-auto-car-search',
  templateUrl: './AutoCarSearch.html',
  styleUrls: ['./AutoCarSearch.css'],
})
export class AutoCarSearch implements OnInit {

  constructor(private translate: TranslateService, private breadcrumbs: BreadCrumbService, private router: Router) {
    this.breadcrumbs.setItems([
      new BreadcrumbModel(this.translate.instant('CAR.SEARCH_AUTO_CAR')),
    ]);
  }

  ngOnInit(): void { }

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    owner_inn: new FormControl(),
    pinpp: new FormControl(),
    status: new FormControl(),
  });

  refTableColumnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'GENERAL.ID',
      resizable: true,
    },
    {
      headerName: 'GENERAL.FIO',
      resizable: true,
      valueGetter: params => `${params.data?.owner_name} ${params.data?.owner_patronym} ${params.data?.owner_surname}`
    },
    {
      field: 'owner_company',
      headerName: 'GENERAL.ORGANIZATION_TITLE',
      resizable: true,
    },
    {
      field: 'marka',
      headerName: 'CAR.BRAND',
      resizable: true,
    },
    {
      field: 'status',
      headerName: 'GENERAL.STATUS',
      resizable: true,
    },
  ];

  pageSize = 12;
  request!: AutoCarSearchRequest;
  referenceKey: string = RequestClassKey.REFERENCE;

  @ViewChild(AgGridBean, { static: true }) dataGrid!: AgGridBean;

  getAutoCarList() {
    this.request = new AutoCarSearchRequest();
    this.request.id = <string>StringUtil.toStr(this.form.get('id')!.value, null);
    this.request.owner_inn = <string>StringUtil.toStr(this.form.get('owner_inn')!.value, null);
    this.request.pinpp = <string>StringUtil.toStr(this.form.get('pinpp')!.value, null);
    this.request.status = <string>StringUtil.toStr(this.form.get('status')!.value, null);

    if (this.dataGrid) {
      this.dataGrid.reloadGrid();
    }
  }

  gotoAdd() {
    this.router.navigate(['/auto-car/save']);
  }
}
