import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { ColDef, RowClassParams } from "ag-grid-community";
import { FormControl, FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { CrmLoadList } from "src/app/common/widgets/CrmLoadList/CrmLoadList";
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
import { BreadcrumbModel, BreadCrumbService } from "../../breadcrumb/BreadCrumbService";
import { SessionInfoService } from "../../services/session-info.service";
import { AgGridBean } from "src/app/common/widgets/DataGrid/AgGridBean";
import { StringUtil } from "src/app/_service/util/StringUtil";
import { Branch } from "src/app/_shared/request/crm/Branch";
import { CarInfoSearchRequest } from "src/app/_shared/request/crm/CarInfoSearchRequest";
import { COFService } from "src/app/_service/COFService";
import { firstValueFrom } from "rxjs";
import { CarInfoParamSearchRequest } from "src/app/_shared/request/crm/CarInfoParamSearchRequest";
import { CrmConfirmCommentDialog } from "src/app/common/widgets/CrmConfirmCommentDialog/CrmConfirmCommentDialog";
import { CrmConfirmDialog } from "src/app/common/widgets/CrmConfirmDialog/CrmConfirmDialog";
import { ICarInfo, ICarInfoCollection } from "src/app/main/models/car-info.entity";
import { CarInfoCheckSave } from "src/app/_shared/request/crm/CarInfoCheckSave";

@Component({
  selector: 'crm-car-check',
  templateUrl: './CarCheck.html',
  styleUrls: ['./CarCheck.css'],
})
export class CarCheck implements OnInit {


  constructor(private translate: TranslateService,private breadcrumbs: BreadCrumbService,private router: Router, public sessionInfoSvc: SessionInfoService,private cof:COFService) {
    this.breadcrumbs.setItems([
      new BreadcrumbModel(this.translate.instant('CAR.SEARCH')),
    ]);


  }

  ngOnInit(): void {
    this.getCarList();
   }

  form: FormGroup = new FormGroup({
    reasons: new FormControl([]),

    drb:new FormControl(),
    body_number: new FormControl(),
    engine_number:new FormControl(),
    chassis_number: new FormControl(),
    year_from: new FormControl(),
    year_to: new FormControl(),

    last_name:new FormControl(),
    name:new FormControl(),
    middlename:new FormControl(),

    send_from:new FormControl(),
    send_to:new FormControl(),
    
    division_id: new FormControl()
  });

  pageSize = 12;
  requestCars!: CarInfoSearchRequest;
  requestParamCars!: CarInfoParamSearchRequest;
  referenceKey: RequestClassKey = RequestClassKey.REFERENCE;
  carModelKey: string = RequestClassKey.CAR_MODEL;
  referenceTreeKey: string = RequestClassKey.REF_TREE;
  branchKey = RequestClassKey.BRANCH;
  curInfoId!:string ; 

  carDataList:ICarInfo[] = []

  @ViewChild(AgGridBean, { static: true }) dataGrid!: AgGridBean;

  public BTN_DATA_IS_NOT_FULL = 3
  public BTN_IN_SEARCH = 6
  public BTN_IN_DOUBT_SEARCH = 4
  public BTN_NOT_IN_SEARCH = 5
  public BTN_CHECK_AFTER = 2

  private commentButtons = [this.BTN_DATA_IS_NOT_FULL,this.BTN_IN_SEARCH,this.BTN_IN_DOUBT_SEARCH]
  clearData(){
    this.curInfoId = '';
  }

  async getCarList() {
    this.requestCars = new CarInfoSearchRequest();
    this.requestCars.setCount(999);
    let reasonIds = this.form.get('reasons')!.value;
    if(reasonIds.length > 0){
      let filter = []
      for (let index = 0; index < reasonIds.length; index++) {
        if(reasonIds[index] == '1'){
          filter.push(this.BTN_IN_DOUBT_SEARCH)
        }
        if(reasonIds[index] == '2'){
          filter.push(this.BTN_CHECK_AFTER)
        }
        
      }
      this.requestCars.check_state_id = filter
    }

    this.requestCars.drb_number = <string>StringUtil.toStr(this.form.get('drb')!.value,null);
    this.requestCars.body_number = <string>StringUtil.toStr(this.form.get('body_number')!.value,null);
    this.requestCars.engine_number = <string>StringUtil.toStr(this.form.get('engine_number')!.value,null);
    this.requestCars.chassis_number = <string>StringUtil.toStr(this.form.get('chassis_number')!.value,null);
    // this.requestCars.from_year = <string>StringUtil.toStr(this.form.get('year_from')!.value,null);
    // this.requestCars.to_year = <string>StringUtil.toStr(this.form.get('year_to')!.value,null);
    this.requestCars.last_name = <string>StringUtil.toStr(this.form.get('last_name')!.value,null);
    this.requestCars.first_name = <string>StringUtil.toStr(this.form.get('name')!.value,null);
    this.requestCars.middle_name = <string>StringUtil.toStr(this.form.get('middlename')!.value,null);
    // this.requestCars.send_date_from = <string>StringUtil.toStr(this.form.get('send_from')!.value,null);
    // this.requestCars.send_date_to = <string>StringUtil.toStr(this.form.get('send_to')!.value,null);

    let data:ICarInfoCollection = <ICarInfoCollection>await firstValueFrom(this.cof.doRequest(this.requestCars))
    this.carDataList = data.data;
    console.log(data,'data')
    if(this.carDataList.length  > 0 ){
      this.setCurInfoId(this.carDataList[0].id)
    }else{
      this.setCurInfoId('-1')
    }
    console.log(data,'data')
  }


  setCurInfoId(carInfoId:string){
    this.curInfoId = carInfoId;
    this.getRelatives()
    console.log(this.curInfoId,'this.curInfoId')
  }

  async getRelatives(){
    if(!this.curInfoId)
    return;
    this.requestParamCars = new CarInfoParamSearchRequest()
    this.requestParamCars.setCount(500);
    this.requestParamCars.car_info_id = parseInt(this.curInfoId);
    if (this.dataGrid) {
      this.dataGrid.reloadGrid();
    }
  }

  setFilterParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CHECK_AMT_STATE);
    return;
  }

  BranchParams = (request: Branch): void =>{
    request.setSorts([
      {
        "direction": "ASC",
        "field": "id"
      }
    ]);
  }

  branchSelected(item: any){
    console.log(item,'item branch')
  }

  refTableColumnDefs: ColDef[] = [
    {
      field: 'search_type_id',
      headerName: 'CHECK.SEARCH_TYPE',
      resizable: true,
      sortable: true,
    },
    {
      field: 'avto_type',
      headerName: 'GENERAL.CAR_TYPE',
      resizable: true,
      sortable: true,
    },
    {
      field: 'avto_model',
      headerName: 'CAR.MODEL',
      resizable: true,
      sortable: true,
    },
    {
      field: 'avto_color',
      headerName: 'CAR.COLOR',
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
      field: 'engine_number',
      headerName: 'CAR.ENGINE_NUMBER',
      resizable: true,
      sortable: true,
    },
    {
      field: 'chassis_number',
      headerName: 'CAR.CHASSIS_NUMBER',
      resizable: true,
      sortable: true,
    },
    {
      field: 'vin_code',
      headerName: 'CAR.VIN_CODE',
      resizable: true,
      sortable: true,
    },
    {
      field: 'year',
      headerName: 'CAR.YEAR',
      resizable: true,
      sortable: true,
    },
    {
      field: 'note',
      headerName: 'GENERAL.ADDITIONAL_INFORMATION',
      resizable: true,
      sortable: true,
    },
  ];

  getIndex(){
    return this.carDataList.findIndex( v=> v.id = this.curInfoId); 
  }

  prevCard(){
    let index = this.getIndex();
    if(index == this.carDataList.length - 1)
      return;
    let item = this.carDataList[index+1];  
    this.setCurInfoId(item.id)
  }

  nextCard(){
    let index = this.getIndex();
    if(index == 0)
      return;
    let item = this.carDataList[index - 1];  
    this.setCurInfoId(item.id)
  }

  showConfirmDialog(state:number){
    let diaref = this.commentButtons.includes(state) ?  CrmConfirmCommentDialog.show('GENERAL.ADDITIONAL_INFORMATION') : CrmConfirmDialog.show('GENERAL.IS_CAN_SAVE_DATA');
    diaref.subscribe(res=>{
      if(res){
        this.saveCarInfoState(state,this.commentButtons.includes(state) ? res.comment : null)
      }
    })
  }

  async saveCarInfoState(state_id:number,comment:string | null = null){
    let request = new CarInfoCheckSave()
    let item = this.carDataList[this.getIndex()]
    request.car_id = item.car_id
    request.check_state_id = state_id;
    request.comment = this.commentButtons.includes(state_id) ? comment : null;
    request.id = this.curInfoId;
    let data = await firstValueFrom(this.cof.doRequest(request))
    if(data){
      this.afterSave();
    }
  }

  afterSave(){
    if(this.getIndex() == this.carDataList.length - 1){
      this.getCarList();
    }else{
      let index = this.getIndex();
      this.nextCard();
      this.removeItemFromArray(index);
    }
  }

  removeItemFromArray(itemIndex:number){
    this.carDataList.splice(itemIndex, 1); 
  }
}
