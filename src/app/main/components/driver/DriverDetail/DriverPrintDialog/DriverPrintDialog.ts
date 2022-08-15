import {
  MatDialog, MatDialogRef
} from "@angular/material/dialog";
import {
  firstValueFrom,
} from "rxjs";
import {
  MAT_DIALOG_DATA
} from '@angular/material/dialog'
import {
  Component,
  Inject,
  OnInit,
  ViewChild
} from "@angular/core";
import {
  InjectorInstance
} from "../../../../../app.module";
import {
  Driver
} from "src/app/_shared/request/crm/Driver";
import {
  COFService
} from "src/app/_service/COFService";
import {
  IDriverCollection
} from "src/app/main/models/driver.entity";
import {
  CommonUtil
} from "src/app/_service/util/CommonUtil";
import {
  DateUtil
} from "src/app/_service/util/DateUtil";
import {
  CrmRefType
} from "src/app/common/enums/crm-ref-type.enum";
import {
  DriverAttachmentList
} from "src/app/_shared/request/crm/DriverAttachmentList";
import {
  CrmAttachmentTypes
} from "src/app/common/enums/crm-attachement-types.enum";
import {
  IEmployeeAttachmentCollection
} from "src/app/main/models/employee-attachment.entity";
import {
  SystemConfig
} from "src/app/common/enums/system-config.enum";
import {
  TranslateService
} from "@ngx-translate/core";
import {
  CrmImage
} from "src/app/common/widgets/CrmImage/CrmImage";
import {
  LoadListSrvice
} from "src/app/common/services/LoadListSrvice";
import {
  Reference
} from "src/app/_shared/request/crm/Reference";
import {
  IDriverCertificate,
  IDriverCertificateCollection
} from "src/app/main/models/driver-certificate.entity";
import {
  DriverCertificate
} from "src/app/_shared/request/crm/DriverCertificate";
import {
  DriverDocuments
} from "src/app/_shared/request/crm/DriverDocuments";
import {
  DriverAddress
} from "src/app/_shared/request/crm/DriverAddress";
import {
  DriverCheckList
} from "src/app/_shared/request/crm/DriverCheckList";

import {
  Address
} from "src/app/_shared/request/crm/Address";
import {
  AddressType
} from "src/app/common/enums/address-type.enum";
import {
  IAddressCollection
} from "src/app/main/models/address-entity";
import {
  IDriverCheckCollection
} from "src/app/main/models/driver-check.entity";
import {
  IEmployeeDocumentCollection
} from "src/app/main/models/employee-document.entity";
import {
  IReference
} from "src/app/main/models/reference.entity";
import { IObjectAddressCollection } from "src/app/main/models/object-address.entity";
import { SessionInfoService } from "../../../services/session-info.service";
import { DriverCategoryUtil } from "../DriverCategoryUtil";
import { PrintUtility } from "src/app/_service/util/PrintUtility";
import { DriverCertificateLast } from "src/app/_shared/request/crm/DriverCertificateLast";
import { AttributeInfoService } from "../../../services/attribute-info.service";
import { ObjectOwnerType } from "src/app/common/enums/object-owner-type.enum";
import { Country } from "src/app/_shared/request/crm/Country";
import { AttributeParamConfig } from "src/app/common/widgets/AttributeSetupPanel/AttributeParam/AttributeParamConfig";
import { CertAttrKeys } from "../../driver-add/driver-document/driver-document.component";
import { DriverCertificateHistory } from "src/app/_shared/request/crm/DriverCertificateHistory";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import moment from "moment";
@Component({
  selector: 'driver-print-dialog',
  templateUrl: './DriverPrintDialog.html',
  styleUrls: ['./DriverPrintDialog.css']
})
export class DriverPrintDialog implements OnInit {
  id!: string;
  pageItem: DriverDetailPrint = new DriverDetailPrint();

  addressReq: Address = new Address();
  getRequest = new Driver();
  requestDocument = new DriverDocuments();

  empty = "__n__";

  refCategotyList: IReference[] = []
  @ViewChild(CrmImage, {
    static: true
  }) avatar!: CrmImage;
  @ViewChild(CrmImage, {
    static: true
  }) qr_code!: CrmImage;
  @ViewChild(CrmImage, {
    static: true
  }) signature!: CrmImage;
  ownerType:ObjectOwnerType = ObjectOwnerType.DRIVER;
  driverAvatarType:string = CrmAttachmentTypes.DRIVER_PHOTO + '';
  driverSignType:string = CrmAttachmentTypes.DRIVER_SIGNATURE + '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private attributeService: AttributeInfoService, public dialogRef: MatDialogRef <DriverPrintDialog>, private cof: COFService, private loader: LoadListSrvice, private translate: TranslateService, private session:SessionInfoService,
  private sanitizer: DomSanitizer) {
    this.id = this.data.id;
    this.refCategotyList = CommonUtil.getReferenceListByTypeId(parseInt(CrmRefType.DRIVER_CATEGORY));
  }
  public certDates = new Map<string,string>()

  ngOnInit() {
    this.fillStaticData();
    this.getData();
    this.getDriverDocument();
    this.getDriverAddress();
    this.getDriverCheck();
    this.getDriverCert();
    this.getAttr();
    this.getDriverCertHistory();
    this.getCatDateEnds()
  }

  static show(id: string) {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(DriverPrintDialog, {
      data: {
        id
      }
    });

    return dialogRef.afterClosed();
  }

  driverCategoryParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.DRIVER_CATEGORY);
    return;
  }

  async getAttr(){
    let allParams = await firstValueFrom(this.attributeService.getAttrListWithVal(this.id,ObjectOwnerType.DRIVER));
    let param = allParams.find( v => v.name == 'number_exam')
    if(param){
      this.pageItem.attendExamCount =param.dataValue
    }
    param = allParams.find( v => v.name == 'school')
    if(param){
      this.pageItem.drivingSchool = CommonUtil.getReferenceByTypeId(parseInt(param.dataValue),parseInt(CrmRefType.DRIVER_SCHOLL))
    }
    param = allParams.find( v => v.name == 'phone')
    if(param){
      this.pageItem.phone = param.dataValue; //CommonUtil.getReferenceByTypeId(parseInt(),parseInt(CrmRefType.DRIVER_SCHOLL))
    }

    console.log(allParams,'allParams');
  }

  async getDriverCert() {
    let request = new DriverCertificateLast();
    request.setDriverId(this.id);
    request.setCount(1);
    // request.setState('1');
    let result: any = await firstValueFrom(this.cof.doRequest(request));
    if (result && result.data) {
      let data: any = result;
      if (!data || data.data.length == 0)
        return;
      let row:IDriverCertificate = data.data;
      this.pageItem.editDate = < string > DateUtil.formatDate(new Date(row.edit_date));

      this.pageItem.certId = row.id;
      this.pageItem.certSeria = row.document_number.slice(0,2);
      this.pageItem.certNumber = row.document_number.slice(2);
      this.pageItem.certGivenDate = < string > DateUtil.formatDate(new Date(row.given_date));
      this.pageItem.certIssueDate = < string > DateUtil.formatDate(new Date(row.issue_date));
      this.pageItem.certFlag = row.flag;
      this.pageItem.certReason = CommonUtil.getReferenceByTypeId(row.reason_id,parseInt(CrmRefType.DRIVER_CATEGORY_REASON));
      this.pageItem.certInfo = row.document_number + ' ' +(<string>DateUtil.formatDate(new Date(row.given_date)))+ ' ' + CommonUtil.getReferenceByTypeId(row.reason_id,parseInt(CrmRefType.DRIVER_CATEGORY_REASON));
    }
  }

  getDriverDocument() {
    this.requestDocument.setOwnerId(this.id);
    this.requestDocument.setCount(1);
    this.cof.doRequest(this.requestDocument).subscribe(res => {
      let data = < IEmployeeDocumentCollection > res;
      if (data && data.total_elements > 0) {
        let doc = data.data[0];

        // console.log(CommonUtil.getReferenceListByTypeId(parseInt(CrmRefType.PERSON_DOC_TYPE)));
        this.pageItem.docType =  CommonUtil.getReferenceByTypeId(doc.type_id, parseInt(CrmRefType.PERSON_DOC_TYPE));
        this.pageItem.docSeria = doc.document_number.slice(0, 2);
        this.pageItem.docNumber = doc.document_number.slice(2);
        this.pageItem.docGivenBy = doc.given_by_id != null ?  CommonUtil.getReferenceByTypeId(parseInt(doc.given_by_id), parseInt(CrmRefType.GIVEN_PLACE)) : doc.given_by;
        this.pageItem.docGivenDate = doc.given_date ? < string > DateUtil.formatDate(new Date(doc.given_date)) : '';
        this.pageItem.docIssueDate = doc.issue_date ? < string > DateUtil.formatDate(new Date(doc.issue_date)) : '';
      }
    })
  }

  getDriverAddress() {
    let requestAddress = new DriverAddress()
    requestAddress.setOwnerId(this.id);
    requestAddress.setCount(1);
    this.cof.doRequest(requestAddress).subscribe(res => {
      let data = < IObjectAddressCollection > res;
      if (data && data.total_elements > 0) {
        let addressItem = data.data[0];

        this.pageItem.addrText = addressItem.note;
        this.pageItem.addrHouse = addressItem.house;
        this.pageItem.addrBlock = addressItem.block;
        this.pageItem.addrFlat = addressItem.flat ? addressItem.flat+'' : '';

        let cityRequest: Address = this.setAddress(this.addressReq, addressItem.city_id, AddressType.CITY)
        this.cof.doRequest(cityRequest).subscribe(res => {
          let data = < IAddressCollection > res;
          if(data.data && data.data.length > 0)
          this.pageItem.addrCity = data.data[0].name;
        })

        let regionRequest: Address = this.setAddress(this.addressReq, addressItem.region_id, AddressType.REGION)
        this.cof.doRequest(regionRequest).subscribe(res => {
          let data = < IAddressCollection > res;
          if(data.data && data.data.length > 0)
          this.pageItem.addrRegion = data.data[0].name;
        })

        let massivRequest: Address = this.setAddress(this.addressReq, addressItem.massiv_id, AddressType.LIVE_PLACE)
        this.cof.doRequest(massivRequest).subscribe(res => {
          let data = < IAddressCollection > res;
          if(data.data && data.data.length > 0)
          this.pageItem.addrMassiv = data.data[0].name;
        })

        if(addressItem.street_id == null){
          this.pageItem.addrStreet = data.data[0].street_name;
        }else{
          let streetRequest: Address = this.setAddress(this.addressReq, addressItem.street_id, AddressType.STREET)
          this.cof.doRequest(streetRequest).subscribe(res => {
            let data = < IAddressCollection > res;
            if(data.data && data.data.length > 0)
            this.pageItem.addrStreet = data.data[0].name;
          })
  
        }

      }
    })
  }

  setAddress(request: Address, addressId: number, addressType: string) {
    request.setId(String(addressId));
    request.setType(addressType);
    request.setCount(1);
    return request;
  }

  getDriverCheck() {
    let driverCheckRequest = new DriverCheckList();
    driverCheckRequest.setOwnerId(this.id);
    driverCheckRequest.setCount(999);
    this.cof.doRequest(driverCheckRequest).subscribe(res => {
      let data = < IDriverCheckCollection > res;
      if (data && data.total_elements > 0) {
        let driverChecks = data.data;
        driverChecks.forEach( row =>{
          this.pageItem.driverChecks.push( <IDriverPrintCheck>{
            end_date:DateUtil.formatDate(new Date(row.end_date)),
            id:row.id,
            note:row.note,
            result_id: CommonUtil.getReferenceByTypeId(row.result_id, parseInt(CrmRefType.DRIVER_CHECK_RESULT)),
            start_date:DateUtil.formatDate(new Date(row.start_date)),
            type_id:CommonUtil.getReferenceByTypeId( row.type_id, parseInt(CrmRefType.DRIVER_CHECK_TYPE)),
            signed:row.signed
          })
        })
      }
    })
  }

  fillStaticData() {
    this.pageItem.printTime = new Date().toLocaleString();
    this.pageItem.userFullName = this.session.getSesionInfo().data?.user_info.name;
  }

  getData() {
    this.getRequest.setId(this.id);
    this.getRequest.setCount(1);
    this.cof.doRequest(this.getRequest).subscribe(async res => {
      let data = < IDriverCollection > res;
      if (data && data.total_elements > 0) {
        let row = data.data[0];
        this.pageItem.kod = row.id;
        // this.pageItem.editDate = < string > DateUtil.formatDate(new Date(row.edit_date));

        this.pageItem.lastName = row.last_name;
        this.pageItem.firstName = row.first_name;
        this.pageItem.middleName = row.middle_name;

        this.pageItem.rlastName = row.rlast_name;
        this.pageItem.rfirstName = row.rfirst_name;
        this.pageItem.rmiddleName = row.rmiddle_name;

        this.pageItem.ulastName = row.ulast_name;
        this.pageItem.ufirstName = row.ufirst_name;
        this.pageItem.umiddleName = row.umiddle_name;


        this.pageItem.bornDate = < string > DateUtil.formatDate(new Date(row.born_date));
        this.pageItem.gender = CommonUtil.getReferenceByTypeId(row.sex_id, CrmRefType.GENDER);
        this.pageItem.citizenship = CommonUtil.getReferenceByTypeId(Number.parseInt(row.citizenship_id), parseInt(CrmRefType.CITIZENSHIP))

        if(row.born_country_id){
          let  countryRequest = new Country()
          countryRequest.setCount(1);
          countryRequest.id = row.born_country_id + '';
          let res = await firstValueFrom(this.cof.doRequest(countryRequest))
          if(res){
            let data = (<any> res).data;
            if(data.length > 0 ){
              this.pageItem.bornCountry = data[0].name;
            }
          }
        }
        this.pageItem.bornPlace = row.born_place;

        if (row.born_city_id) {
          let cityRequest: Address = this.setAddress(this.addressReq, row.born_city_id, AddressType.CITY)
          this.cof.doRequest(cityRequest).subscribe(res => {
            let data = < IAddressCollection > res;
            this.pageItem.bornCity = data.data[0].name;
          })
        }

        if (row.born_region_id) {
          let regionRequest: Address = this.setAddress(this.addressReq, row.born_region_id, AddressType.REGION)
          this.cof.doRequest(regionRequest).subscribe(res => {
            let data = < IAddressCollection > res;
            this.pageItem.bornRegion = data.data[0].name;
          })
        }
      }
    });
  }

  hasCategory(title:string){
    return (this.pageItem.certFlag != undefined) && (this.pageItem.certFlag & DriverCategoryUtil.getKeyValue(title) );
  }

  async getCatDateEnds(){
    if(this.id){
      let ownerType = ObjectOwnerType.DRIVER;
      let attrValues:AttributeParamConfig[] = await firstValueFrom(this.attributeService.getAttrListWithVal(this.id,ownerType));
      let keys: string[] =[
      ]
      attrValues.forEach(v=>{
        if ((<string[]>Object.values(CertAttrKeys)).includes(v.name) && v.dataValue && v.dataValue != '' ) {
          // console.log(v.name,v.name.indexOf('_'))
          const date = v.dataValue && v.dataValue.indexOf('.') ? DateUtil.parseDateFromString(v.dataValue,'DD.MM.YYYY') : new Date(v.dataValue)
          if(date)
          this.certDates.set(v.name.substring(0,v.name.indexOf('_')).toUpperCase(),moment(date).format('DD.MM.YYYY'));
        }
      })
      // console.log(this.certDates,'this.certDates')
    }

  }

  async getDriverCertHistory(){
    let request = new DriverCertificateHistory();
    request.driver_id = this.id;
    request.setCount(999);
    // request.setSorts([{direction:'DESC',field:'GIVEN_DATE'}])
    let res:any = await firstValueFrom(this.cof.doRequest(request));

    if(res && res.data && res.data.length > 0){
      let row = res.data[res.data.length - 1]
      this.pageItem.prevCertNum = row.document_number;
      this.pageItem.prevCertGivenDate = < string > DateUtil.formatDate(new Date(row.given_date))
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  gotoPrint(){
    PrintUtility.print('printDocument')
  }

  public qrCodeDownloadLink!:any;
  onChangeURL(url: any) {
    this.qrCodeDownloadLink = this.sanitizer.bypassSecurityTrustResourceUrl(url.changingThisBreaksApplicationSecurity);
  }

}

const NO_DATA: string = "_NO_DATA_";

export class DriverDetailPrint {
  pageUniqueNumber: string = NO_DATA;
  printTime: string = NO_DATA;
  avatarImage: string = '/assets/images/profile.jpg';
  qrCodeImage: string = '/assets/images/qrcode.png';
  signature:string = '/assets/images/signature_001.png';
  qrdata:string = '';
  kod!:string;

  userFullName ? : string;

  editDate: string = NO_DATA;

  drivingSchool?: string;
  phone?: string ;
  attendExamCount: string = NO_DATA;
  workPlace: string = NO_DATA;

  unknownField: string = 'unknown';

  lastName ? : string;
  firstName ? : string;
  middleName ? : string;

  rfirstName ? : string;
  rlastName ? : string;
  rmiddleName ? : string;

  ufirstName ? : string;
  ulastName ? : string;
  umiddleName ? : string;

  bornDate ? : string;
  gender ? : string;
  citizenship ? : string;

  bornCountry ? : string;
  bornCity ? : string;
  bornRegion ? : string;
  bornPlace ? : string;

  docType ? : string;
  docSeria ? : string;
  docNumber ? : string;
  docGivenBy ? : string;
  docGivenDate ? : string;
  docIssueDate ? : string;

  certId?:number;
  certGivenDate ? : string;
  certIssueDate ? : string;
  certSeria?:string;
  certNumber?:string;
  certFlag?:number;
  certReason!:string;

  certInfo!:string;

  addrRegion ? : string;
  addrCity ? : string;
  addrMassiv ? : string;
  addrStreet ? : string;
  addrText ? : string;
  addrHouse ? : string;
  addrBlock ? : string;
  addrFlat ? : string;

  driverChecks:IDriverPrintCheck[] = [];

  prevCertNum!:string;
  prevCertGivenDate!:string;

  getQrData():string{
    return this.kod+'*'+ this.lastName + '*'+this.firstName+'*'+this.middleName + '*' + this.docSeria + '*'+ this.docNumber + '*' + this.certId + '*' +this.printTime
  }
}


export interface IDriverPrintCheck {
  id: number;
  type_id:string;
  result_id:string;
  note:string;
  start_date:string;
  end_date:string;
  signed:boolean;
}
