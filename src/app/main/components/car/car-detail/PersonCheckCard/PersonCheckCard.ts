import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Component, Inject, Input, OnInit,} from "@angular/core";
import {InjectorInstance} from "../../../../../app.module";
import {COFService} from "src/app/_service/COFService";
import {LoadListSrvice} from "src/app/common/services/LoadListSrvice";
import {SessionInfoService} from "../../../services/session-info.service";
import {PrintUtility} from "src/app/_service/util/PrintUtility";
import {Car} from "../../../../../_shared/request/crm/Car";
import { PersonInfoSearchRequest } from "src/app/_shared/request/crm/PersonInfoSearchRequest";
import { firstValueFrom } from "rxjs";
import { IPersonInfo, IPersonInfoCollection } from "src/app/main/models/person-info.entity";
import { CommonUtil } from "src/app/_service/util/CommonUtil";
import { DateUtil } from "src/app/_service/util/DateUtil";
import { CrmRefType } from "src/app/common/enums/crm-ref-type.enum";
import { ICarInfo } from "src/app/main/models/car-info.entity";

@Component({
  selector: 'person-check-card',
  templateUrl: 'PersonCheckCard.html',
  styleUrls: ['PersonCheckCard.css']
})
export class PersonCheckCard implements OnInit {
  private carClientRelationId!: number;
  private isArchive!:number;
  public printData:PersonPrintCheckData =  new PersonPrintCheckData();

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

  constructor(private cof: COFService, private loader: LoadListSrvice,  private session:SessionInfoService) {
  }

  ngOnInit() {
    this.getAllData();
  }

  async getAllData() {
    console.log(this.curInfoId,'this.carInfoId2')
    if(!this.curInfoId)
    return;
    console.log(this.curInfoId,'this.carInfoId3')
    let request = new PersonInfoSearchRequest();
    request.setCount(1);
    request.id = this.curInfoId;
    let data:IPersonInfoCollection = <IPersonInfoCollection>await firstValueFrom(this.cof.doRequest(request))
    if(data.data.length > 0)
    this.setData(data.data[0])
  }

  setData(item:IPersonInfo){

    this.printData.branch = CommonUtil.getBranchNameById(item.branch_id);
    this.printData.document = item.doc_num
    this.printData.status = CommonUtil.getReferenceByTypeId(item.check_state_id,parseInt(CrmRefType.CHECK_STATE));
    this.printData.data_sent = DateUtil.parseDateFromStringWithTimeZone(item.send_date) ;
    // this.printData.GUID = item.GUID;
    this.printData.create_date = DateUtil.parseDateFromStringWithTimeZone(item.edit_date) ;
    this.printData.first_name = item.first_name;
    this.printData.last_name = item.last_name;
    this.printData.middle_name = item.middle_name;
    this.printData.birth_date = DateUtil.parseDateFromStringWithTimeZone(item.born_date);
    this.printData.doc_number = item.doc_num;
    // this.printData.doc_series = item.doc_series;
    // this.printData.nationality = CommonUtil.getReferenceByTypeId(item.nationality,parseInt(CrmRefType.CHECK_STATE)) ;
    // this.printData.pinfl = item.pnfl;
    // this.printData.birth_place = item.birth_place
    this.printData.id = item.id;
    // this.printData.image = item.image;
    // this.printData.given_by = item.givenBy;
    // this.printData.given_date = item.given_date;
    this.printData.docType= CommonUtil.getReferenceByTypeId(item.doc_type_id, parseInt(CrmRefType.PERSON_DOC_TYPE));
    // this.printData.docTypeGivenBy = item.docGivenBy

  }


  gotoPrint(){
    PrintUtility.print('printDocument')
  }
}


export class PersonPrintCheckData{
  branch!: string;
  document!: string;
  status!: string;
  data_sent!: string;
  GUID!: string;
  create_date!: string;
  first_name!: string;
  last_name!: string;
  middle_name!: string;
  birth_date!: string;

  doc_series!: string;
  doc_number!: string;

  nationality!: string;
  pinfl!: string;
  birth_place!: string;
  id!: string;
  image!: string;
  given_by!: string;
  given_date!: string;
  docType!: string;
  docTypeGivenBy!: string;

}
