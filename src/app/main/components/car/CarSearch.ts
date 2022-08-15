import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { ColDef, RowClassParams } from "ag-grid-community";
import { FormControl, FormGroup } from "@angular/forms";
import { AgGridBean } from "../../../common/widgets/DataGrid/AgGridBean";
import { StringUtil } from "../../../_service/util/StringUtil";
import { Car } from "../../../_shared/request/crm/Car";
import { ICar } from "../../models/car-entity";
import { TranslateService } from "@ngx-translate/core";
import { CrmLoadList } from "src/app/common/widgets/CrmLoadList/CrmLoadList";
import { RequestClassKey } from "src/app/_shared/request/crm/RequestList";
import { CrmRefType } from "src/app/common/enums/crm-ref-type.enum";
import { Reference } from "src/app/_shared/request/crm/Reference";
import { CommonUtil } from "src/app/_service/util/CommonUtil";
import { BreadcrumbModel, BreadCrumbService } from "../breadcrumb/BreadCrumbService";
import { CarSearchRequest } from "src/app/_shared/request/crm/CarSearchRequest";
import { Router } from "@angular/router";
import { DateUtil } from "src/app/_service/util/DateUtil";
import { Address } from "src/app/_shared/request/crm/Address";
import { AddressType } from "src/app/common/enums/address-type.enum";
import { RefTree } from "src/app/_shared/request/crm/RefTree";
import { SessionInfoService } from "../services/session-info.service";
import {CarHistoryListForm} from "./forms/CarHistoryListForm/CarHistoryListForm";

@Component({
  selector: 'crm-car-search',
  templateUrl: './CarSearch.html',
  styleUrls: ['./CarSearch.css'],
})
export class CarSearch implements OnInit {


  constructor(private translate: TranslateService,private breadcrumbs: BreadCrumbService,private router: Router, public sessionInfoSvc: SessionInfoService) {
    this.breadcrumbs.setItems([
      new BreadcrumbModel(this.translate.instant('CAR.SEARCH')),
    ]);


  }

  ngOnInit(): void { }

  form: FormGroup = new FormGroup({
    reasons: new FormControl(),
    drb:new FormControl(),
    body_number: new FormControl(),
    register_date_from: new FormControl(),
    register_date_to: new FormControl(),
    technical_number: new FormControl(),
    year_from: new FormControl(),
    year_to: new FormControl(),
    model:new FormControl(),
    sector_id:new FormControl(),
    passport_number:new FormControl(),
    name:new FormControl(),
    color_id:new FormControl(),
    brands:new FormControl(),
    vin_code:new FormControl(),
    branch: new FormControl(),
    region: new FormControl(),
    city: new FormControl(),
  });

  refTableColumnDefs: ColDef[] = [
    {
      field: 'edit',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onShowHistoryBtnClick.bind(this),
        icon: 'history',
        colorMode: 'primary'
      },
      headerName: 'GENERAL.HISTORY',
      width: 100
    },
    {
      field: 'drb',
      headerName: 'CAR.DRB',
      resizable: true,
      sortable: true,
      width: 150
    },
    {
      field: 'name',
      headerName: 'GENERAL.FIO/ORGANIZATION',
      resizable: true,
      sortable: true,
      width: 450,
      wrapText: true,
      autoHeight: true
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
      width: 150
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


  showHistoryClicked = false;
  onShowHistoryBtnClick(params: any) {
    this.showHistoryClicked = true;
    let row: any = params.rowData;
    let id = row == null ? '' : <string>StringUtil.toStr(row.id,'');
    CarHistoryListForm.show(id);
  }

  pageSize = 12;
  requestCars!: CarSearchRequest;
  referenceKey: string = RequestClassKey.REFERENCE;
  carModelKey: string = RequestClassKey.CAR_MODEL;
  referenceTreeKey: string = RequestClassKey.REF_TREE;


  rowClassRules = {
    "bg-color-red": (params: RowClassParams) => {
      return params.data?.flag === 2;
    }
  }

  objAddressText :any= {
    region: null,
    city:null,
    livePlace:null,
    street: null,
  };


  @ViewChild(AgGridBean, { static: true }) dataGrid!: AgGridBean;
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key == 'F7'){
      this.getCarList();
    }
  }


  getCarList() {
    this.requestCars = new CarSearchRequest();
    this.requestCars.drb = <string>StringUtil.toStr(this.form.get('drb')!.value,null);
    this.requestCars.from_registration_date = <string>StringUtil.toStr(this.form.get('register_date_from')!.value,null);
    this.requestCars.to_registration_date = <string>StringUtil.toStr(this.form.get('register_date_to')!.value,null);
    this.requestCars.technical_number = <string>StringUtil.toStr(this.form.get('technical_number')!.value,null);
    this.requestCars.from_year = <string>StringUtil.toStr(this.form.get('year_from')!.value,null);
    this.requestCars.to_year = <string>StringUtil.toStr(this.form.get('year_to')!.value,null);
    this.requestCars.models = this.form.get('model')!.value || [];
    this.requestCars.sector =  <string>StringUtil.toStr(this.form.get('sector_id')!.value,null);
    this.requestCars.document = <string>StringUtil.toStr(this.form.get('passport_number')!.value,null);
    this.requestCars.name = <string>StringUtil.toStr(this.form.get('name')!.value,null);
    this.requestCars.reasons = this.form.get('reasons')!.value || [];
    this.requestCars.color_id = <string>StringUtil.toStr(this.form.get('color_id')!.value,null);
    this.requestCars.brands = this.form.get('brands')!.value || [];
    this.requestCars.vin_code= <string>StringUtil.toStr(this.form.get('vin_code')!.value,null);
    this.requestCars.body_number= <string>StringUtil.toStr(this.form.get('body_number')!.value,null);
    this.requestCars.city_id = <string>StringUtil.toStr(this.form.get('city')!.value,null);
    this.requestCars.region_id = <string>StringUtil.toStr(this.form.get('region')!.value,null);
    this.requestCars.branch_id = <string>StringUtil.toStr(this.form.get('branch')!.value,null);

    if (this.dataGrid) {
      this.dataGrid.reloadGrid();
    }
  }

  gridReady() {
    let sortModel = [
      {colId: 'registration_date', sort: 'desc'}
    ];
    this.dataGrid.gridApi.setSortModel(sortModel);
  }

  setSectorParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.SECTOR);
    return;
  }

  setTexnoParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CAR_TEXNO_TYPES);
    return;
  }

  setColorParams = (searchRequest: RefTree): void => {
    searchRequest.setTypeId(CrmRefType.CAR_COLOR);
    searchRequest.setParentKey('0');
    return;
  }

  setBrandParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CAR_BRAND);
    return;
  }

  setRegionParam = (request:Address):void =>{
    request.setType(AddressType.REGION);
  }

  setCityParam = (request: Address): void => {
    request.setType(AddressType.CITY);
    if (this.form.get('region')?.value !== undefined)
      request.setParentId((this.form.get('region')?.value) ? this.form.get('region')?.value : '-1');
    else
      request.setParentId('-1');
    return;
  }

  addAddresCity(request: Address){
    request.setCount(1000);
    if (this.form.get('city')?.value !== undefined)
      request.setParentId(this.form.get('city')?.value);
  }

  setLivePlaceParam = (request: Address, text:string): void => {
    request.setType(AddressType.LIVE_PLACE);
    this.addAddresCity(request)
    request.setName(text);
    return;
  }

  gridSelectEvent(event: any) {
    if(this.sessionInfoSvc.hasAccess('dr_view') && !this.showHistoryClicked){
      this.router.navigate(['/car/detail/', event.id]);
    }
    this.showHistoryClicked = false;
  }

  gotoAdd(){
    this.router.navigate(['/car/add']);
  }

  resetForm(){
    this.form.reset();
  }

}
