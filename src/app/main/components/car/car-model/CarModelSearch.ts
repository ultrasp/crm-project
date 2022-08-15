import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StringUtil } from "../../../../_service/util/StringUtil";
import { RequestClassKey } from "src/app/_shared/request/crm/RequestList";
import { CrmRefType } from "src/app/common/enums/crm-ref-type.enum";
import { Reference } from "src/app/_shared/request/crm/Reference";
import { CarModel } from "src/app/_shared/request/crm/CarModel";
import { ColDef } from "ag-grid-community";
import { TranslateService } from "@ngx-translate/core";
import { AgGridBean } from "src/app/common/widgets/DataGrid/AgGridBean";
import { ICarModel } from "src/app/main/models/car-model.entity";
import { CommonUtil } from "src/app/_service/util/CommonUtil";
import { CarModelFormDialog } from "./CarModelFormDialog/CarModelFormDialog";
import { BreadcrumbModel, BreadCrumbService } from "../../breadcrumb/BreadCrumbService";

@Component({
  selector: 'crm-car-model-search',
  templateUrl: './CarModelSearch.html',
  styleUrls: ['./CarModelSearch.css'],
})
export class CarModelSearch implements OnInit {

  constructor(private translate: TranslateService,private breadcrumbs: BreadCrumbService) {
    this.breadcrumbs.setItems([
      new BreadcrumbModel(this.translate.instant('MENU.MODEL_SEARCH')),
    ]);

   }

  ngOnInit(): void { }

  form: FormGroup = new FormGroup({
    brand_id: new FormControl(),
    name: new FormControl(),
  });

  @ViewChild(AgGridBean, { static: true }) dataGrid!: AgGridBean;

  pageSize = 12;
  requestCarModels = new CarModel();
  referenceKey: string = RequestClassKey.REFERENCE;

  refTableColumnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'GENERAL.ID',
      resizable: true,
    },
    {
      field: 'name',
      headerName: 'GENERAL.NAME',
      resizable: true,
      width:500
    },
    {
      field: 'brand_id',
      headerName: 'CAR.BRAND',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.CAR_BRAND))
    },
    {
      field: 'common_place',
      headerName: 'CAR.COMMON_PLACE',
      resizable: true,
    },
    {
      field: 'engine',
      headerName: 'CAR.ENGINE_POWER',
      resizable: true,
    },
    {
      field: 'place_count',
      headerName: 'CAR.PLACE_COUNT',
      resizable: true,
    },
    {
      field: 'pure_weight',
      headerName: 'CAR.PURE_WEIGHT',
      resizable: true,
    },
    {
      field: 'weight',
      headerName: 'CAR.WEIGHT',
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
      headerName: 'FORM.CHANGE'
    },
    {
      field: 'delete',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onBtnClick1.bind(this),
        icon: 'delete',
        colorMode: 'warn'
      },
      headerName: 'FORM.DELETE'
    },
  ];

  carBrandParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CAR_BRAND);
  }

  getCarModelList() {
    this.requestCarModels.setName(StringUtil.emptyString(this.form.get('name')!.value) ? null : this.form.get('name')!.value);
    this.requestCarModels.setBrandId(StringUtil.emptyString(this.form.get('brand_id')!.value) ? null : this.form.get('brand_id')!.value);
    if (this.dataGrid) {
      this.dataGrid.reloadGrid();
    }
  }

  onBtnClick1(e: any) {
    this.openForm((<ICarModel>e.rowData).id);
  }

  openForm(id: string = '') {
    CarModelFormDialog.openDialog(id).subscribe(result => {
      if (result) {
        this.dataGrid.reloadGrid();
      }
    });
  }

  resetForm(){
    this.form.reset();
  }


}
