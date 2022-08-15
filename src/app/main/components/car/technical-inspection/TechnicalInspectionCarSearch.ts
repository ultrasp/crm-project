import { Component, OnInit, ViewChild } from "@angular/core";
import { ColDef, RowClassParams } from "ag-grid-community";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { RequestClassKey } from "src/app/_shared/request/crm/RequestList";
import { CrmRefType } from "src/app/common/enums/crm-ref-type.enum";
import { Reference } from "src/app/_shared/request/crm/Reference";
import { CommonUtil } from "src/app/_service/util/CommonUtil";
import { CarSearchRequest } from "src/app/_shared/request/crm/CarSearchRequest";
import { Router } from "@angular/router";
import { DateUtil } from "src/app/_service/util/DateUtil";
import { Address } from "src/app/_shared/request/crm/Address";
import { AddressType } from "src/app/common/enums/address-type.enum";
import { RefTree } from "src/app/_shared/request/crm/RefTree";
import {BreadcrumbModel, BreadCrumbService} from "../../breadcrumb/BreadCrumbService";
import {SessionInfoService} from "../../services/session-info.service";
import {AgGridBean} from "../../../../common/widgets/DataGrid/AgGridBean";
import {StringUtil} from "../../../../_service/util/StringUtil";
import {CarSearchShortRequest} from "../../../../_shared/request/crm/CarSearchShortRequest";

@Component({
  selector: 'crm-technical-inspection-car-search',
  templateUrl: 'TechnicalInspectionCarSearch.html',
  styleUrls: ['TechnicalInspectionCarSearch.css'],
})
export class TechnicalInspectionCarSearch implements OnInit {


  constructor(private translate: TranslateService,private breadcrumbs: BreadCrumbService, private router: Router, public sessionInfoSvc: SessionInfoService) {
    this.breadcrumbs.setItems([
      new BreadcrumbModel(this.translate.instant('CAR.TECHNICAL_INSPECTION')),
    ]);


  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl!.status == 'INVALID' && formControl!.touched;
  }

  ngOnInit(): void { }

  form: FormGroup = new FormGroup({
    drb:new FormControl(null, [Validators.required]),
    technical_number: new FormControl(null, [Validators.required]),
  });

  refTableColumnDefs: ColDef[] = [
    {
      field: 'drb',
      headerName: 'CAR.DRB',
      resizable: true,
      sortable: true,
    },
    {
      field: 'name',
      headerName: 'GENERAL.FIO/ORGANIZATION',
      resizable: true,
      sortable: true,
    },
    {
      field: 'body_number',
      headerName: 'CAR.BODY_NUMBER',
      resizable: true,
      sortable: true,
    },
    {
      field: 'brand_id',
      headerName: 'CAR.BRAND',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.CAR_BRAND))
    },
    {
      field: 'color_id',
      headerName: 'CAR.COLOR',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceTreeByTypeId(params.value, parseInt(CrmRefType.CAR_COLOR))
    },
    {
      field: 'document',
      headerName: 'GENERAL.DOCUMENT_NUMBER',
      sortable: true,
      resizable: true,
    },
    {
      field: 'technical_number',
      headerName: 'CAR.SERIA_NUMBER',
      sortable: true,
      resizable: true,
    },
    {
      field: 'reason_id',
      headerName: 'CAR.TEXNO_PROCESS',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.CAR_TEXNO_TYPES))
    },
    {
      field: 'registration_date',
      headerName: 'CAR.REGISTER_DATE',
      sortable: true,
      resizable: true,
      cellRenderer: params => ( (params.value) ? DateUtil.formatDate(params.value) + '' : ''),
    },
    {
      field: 'sector',
      headerName: 'CAR.SECTOR',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.SECTOR))
    },
    {
      field: 'vin_code',
      headerName: 'CAR.VIN_CODE',
      sortable: true,
      resizable: true,
    },
    {
      field: 'year',
      headerName: 'CAR.YEAR',
      sortable: true,
      resizable: true,
    },
  ];

  pageSize = 12;
  requestCars!: CarSearchShortRequest;


  rowClassRules = {
    "bg-color-red": (params: RowClassParams) => {
      return params.data?.flag === 2;
    }
  }

  @ViewChild(AgGridBean, { static: true }) dataGrid!: AgGridBean;

  getCarList() {
    if(this.form.valid) {
      this.requestCars = new CarSearchShortRequest();
      this.requestCars.drb = <string>StringUtil.toStr(this.form.get('drb')!.value,null);
      this.requestCars.technical_number = <string>StringUtil.toStr(this.form.get('technical_number')!.value,null);
      if (this.dataGrid) {
        this.dataGrid.reloadGrid();
      }
    }
    else {
      this.form.markAllAsTouched();
    }
  }

  gridSelectEvent(event: any) {
    if(this.sessionInfoSvc.hasAccess('dr_view')){
      this.router.navigate(['/car/technical-inspection/detail', event.id]);
    }
  }
}
