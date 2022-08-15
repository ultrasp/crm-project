import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Component, Inject, Input, OnInit,} from "@angular/core";
import {InjectorInstance} from "../../../../../app.module";
import {COFService} from "src/app/_service/COFService";
import {LoadListSrvice} from "src/app/common/services/LoadListSrvice";
import {SessionInfoService} from "../../../services/session-info.service";
import {PrintUtility} from "src/app/_service/util/PrintUtility";
import {Car} from "../../../../../_shared/request/crm/Car";
import { CarInfoSearchRequest } from "src/app/_shared/request/crm/CarInfoSearchRequest";
import { ICarInfo, ICarInfoCollection } from "src/app/main/models/car-info.entity";
import { firstValueFrom } from "rxjs";
import { CrmRefType } from "src/app/common/enums/crm-ref-type.enum";
import { CommonUtil } from "src/app/_service/util/CommonUtil";
import { DateUtil } from "src/app/_service/util/DateUtil";
import { CarModel } from "src/app/_shared/request/crm/CarModel";

@Component({
  selector: 'car-check-card',
  templateUrl: 'CarCheckCard.html',
  styleUrls: ['CarCheckCard.css']
})
export class CarCheckCard implements OnInit {
  public printData:CarPrintCheckData =  new CarPrintCheckData();

  client_id = 0;
  isBanned: boolean = false;
  getRequest = new Car();
  _curInfoId!: string;
  get curInfoId(): string {
      return this._curInfoId;
  }
  @Input() set curInfoId(value: string) {
      this._curInfoId = value;
      this.getAllData();
  }

  constructor(private cof: COFService,  private loader: LoadListSrvice,  private session:SessionInfoService) {
  }

  ngOnInit() {
    // this.getAllData();
  }

  async getAllData() {
    console.log(this.curInfoId,'this.carInfoId2')
    if(!this.curInfoId)
    return;
    console.log(this.curInfoId,'this.carInfoId3')
    let request = new CarInfoSearchRequest();
    request.setCount(1);
    request.id = this.curInfoId;
    let data:ICarInfoCollection = <ICarInfoCollection>await firstValueFrom(this.cof.doRequest(request))
    if(data.data.length > 0)
    this.setData(data.data[0])
  }


  setData(item:ICarInfo){
    this.printData.branch = CommonUtil.getBranchNameById(item.branch_id);
    this.printData.technical_specification = CommonUtil.getReferenceByTypeId(item.reason_id,parseInt(CrmRefType.CAR_TEXNO_TYPES));
    this.printData.status = CommonUtil.getReferenceByTypeId(item.check_state_id,parseInt(CrmRefType.CHECK_STATE));
    this.printData.id = item.id;
    this.printData.data_sent = DateUtil.parseDateFromStringWithTimeZone(item.send_date) ;
    this.printData.gov_number = item.drb_number;
    this.printData.first_name = item.first_name;
    this.printData.last_name = item.last_name;
    this.printData.middle_name = item.middle_name;
    this.printData.birth_date = DateUtil.parseDateFromStringWithTimeZone(item.born_date);
    this.printData.docType= CommonUtil.getReferenceByTypeId(item.doc_type_id, parseInt(CrmRefType.PERSON_DOC_TYPE));
    this.printData.doc_series = item.doc_num;
    this.printData.doc_number = item.doc_num;
    this.printData.body_number = item.body_number;
    this.printData.engine_number = item.engine_number;
    this.printData.chassis_number = item.chassis_number;
    this.printData.color= CommonUtil.getReferenceTreeByTypeId(item.color_id, parseInt(CrmRefType.CAR_COLOR));
    this.printData.type = CommonUtil.getReferenceByTypeId(item.type_id, parseInt(CrmRefType.CAR_MODEL_TYPE))
    this.printData.year = item.year;

    let request = new CarModel();
    request.setCount(1);
    request.id = item.model_id + '';
    const res:any =  firstValueFrom(this.cof.doRequest(request))
    if (res && res.total_elements) {
      this.printData.model = res.data[0].name;
    }
}



  gotoPrint(){
    PrintUtility.print('printDocument')
  }
}


export class CarPrintCheckData{
  branch!: string;
  technical_specification!: string;
  status!: string;
  id!: string;
  data_sent!: string;
  gov_number!: string;
  first_name!: string;
  last_name!: string;
  middle_name!: string;
  birth_date!: string;
  docType!: string;
  doc_series!: string;
  doc_number!: string;
  body_number!: string;
  engine_number!: string;
  chassis_number!: string;
  model!: string;
  color!: string;
  type!: string;
  year!: string;


}
