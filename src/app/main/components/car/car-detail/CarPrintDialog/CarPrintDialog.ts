import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {firstValueFrom, of, switchMap, tap,} from "rxjs";
import {Component, Inject, OnInit,} from "@angular/core";
import {InjectorInstance} from "../../../../../app.module";
import {COFService} from "src/app/_service/COFService";
import {CommonUtil} from "src/app/_service/util/CommonUtil";
import {DateUtil} from "src/app/_service/util/DateUtil";
import {CrmRefType} from "src/app/common/enums/crm-ref-type.enum";
import {TranslateService} from "@ngx-translate/core";
import {LoadListSrvice} from "src/app/common/services/LoadListSrvice";
import {SessionInfoService} from "../../../services/session-info.service";
import {PrintUtility} from "src/app/_service/util/PrintUtility";
import {madePlaceOptions} from "../../forms/CarTechnicParams/CarTechnicParams";
import {CarClientType} from "../../../../../common/enums/car_client_type";
import {ITableViewData} from "../../../../models/table-view-data.entity";
import {Car} from "../../../../../_shared/request/crm/Car";
import {CarClientRelationList} from "../../../../../_shared/request/crm/CarClientRelationList";
import {CarPersonList} from "../../../../../_shared/request/crm/CarPersonList";
import {CarClientList} from "../../../../../_shared/request/crm/CarClientList";
import {CarCompanyList} from "../../../../../_shared/request/crm/CarCompanyList";
import {CarAddressList} from "../../../../../_shared/request/crm/CarAddressList";
import {CarTuningList} from "../../../../../_shared/request/crm/CarTuningList";
import {CarTuning, CarTuningCollection} from "../../../../models/car-tuning-list.entity";
import {CarTuningType} from "../../../../../common/enums/car-tuning-type.enum";
import {CarTrustList} from "../../../../../_shared/request/crm/CarTrustList";
import {CarTrust, CarTrustCollection} from "../../../../models/car-trust-list.entity";
import {CarDetailData} from "../CarDetail";
import {CarBlockList} from "../../../../../_shared/request/crm/CarBlockList";
import {CarBlock, CarBlockCollection} from "../../../../models/car-block-list.entity";
import {CarClientAddress} from "../../../../../_shared/request/crm/CarClientAddress";
import {IObjectAddressCollection} from "../../../../models/object-address.entity";
import {AddressType} from "../../../../../common/enums/address-type.enum";
import { CarGetWithDetails } from "src/app/_shared/request/crm/CarGetWithDetails";
import { ICarGetWithDetailsResponse } from "src/app/main/models/car-get-with-details-entity";
import { ICaraddress, ICarclientrelation, IClient, ICompany, IPerson } from "src/app/main/models/car-save-with-details-entity";
import { CarModel } from "src/app/_shared/request/crm/CarModel";
import { CarPersonDocuments } from "src/app/_shared/request/crm/CarPersonDocuments";
import { IEmployeeDocumentCollection } from "src/app/main/models/employee-document.entity";
import { CarAttribute } from "src/app/_shared/request/crm/CarAttribute";
import { IEmployeeAttribute, IEmployeeAttributeCollection } from "src/app/main/models/employee-attribute.entity";
import { CarTechnicalInspectionList } from "src/app/_shared/request/crm/CarTechnicalInspectionList";
import { CarTechnicalInspectionListCollection } from "src/app/main/models/car-technical-inspection-list.entity";
import { Country } from "src/app/_shared/request/crm/Country";

@Component({
  selector: 'car-print-dialog',
  templateUrl: './CarPrintDialog.html',
  styleUrls: ['./CarPrintDialog.css']
})
export class CarPrintDialog implements OnInit {
  private carClientRelationId!: number;
  private isArchive!:number;
  public printData:CarPrintData =  new CarPrintData();

  client_id = 0;
  isBanned: boolean = false;
  tuning: CarTuning[] = [];
  trust: CarTrust[] = [];
  block: CarBlock[] = [];
  clientType = CarClientType.INDIVIDUAL;
  getRequest = new Car();
  getRelationRequest = new CarClientRelationList();
  getPersonRequest = new CarPersonList();
  getClientRequest = new CarClientList();
  getCompanyRequest = new CarCompanyList();
  getPersonAddressRequest = new CarAddressList();
  constructor(@Inject(MAT_DIALOG_DATA) public data: {carClientRelationId: number, isArchive: number}, private cof: COFService,
              public dialogRef: MatDialogRef <CarPrintDialog>, private loader: LoadListSrvice,  private session:SessionInfoService) {
    this.carClientRelationId = this.data.carClientRelationId;
    this.isArchive = this.data.isArchive;
    // this.data.data.joinPersonAndAddress();
  }

  ngOnInit() {
    this.getAllData();
    // firstValueFrom(this.getTuningData())
  }

  static show(carClientRelationId: number, isArchive: number  = 0) {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(CarPrintDialog, {
      data: {
        carClientRelationId: carClientRelationId,
        isArchive: isArchive,
      }
    });

    return dialogRef.afterClosed();
  }


  getAllData() {
    let request = new CarGetWithDetails(this.carClientRelationId.toString(),this.isArchive);
    this.cof.doGetRequest(request).pipe(tap(res => {
      console.log(res,'res');
      let data = <ICarGetWithDetailsResponse>res;
      if (data && data.status == 200) {
        let row = data.data;

        this.printData.govNumber = row.car_client_relation.drb_number;
        this.printData.reason = CommonUtil.getReferenceByTypeId(row.car_client_relation.reason_id, parseInt(CrmRefType.CAR_TEXNO_TYPES));
        this.printData.registerTime = DateUtil.parseDateFromStringWithTimeZone(row.car_client_relation.start_date);
        this.printData.previousGovNumber = (row.car_client_relation.old_drb_number ? row.car_client_relation.old_drb_number : '-')
        this.printData.carModelId = row.car.model_id;
        this.printData.carType = CommonUtil.getReferenceByTypeId(row.car.type_id, parseInt(CrmRefType.CAR_MODEL_TYPE))
        this.printData.madePlace =  this.getPlaceTitle(row.car.country_id + '')
        this.printData.year = row.car.year.toString();
        this.printData.engineNumber =  row.car.engine_number;
        this.printData.chassisNumber = row.car.chassis_number;
        this.printData.bodyNumber = row.car.body_number;
        this.printData.mainColor = CommonUtil.getReferenceTreeByTypeId(row.car.color_id, parseInt(CrmRefType.CAR_COLOR))
        this.printData.subColor = CommonUtil.getReferenceTreeByTypeId(parseInt(String(row.car.sub_color_id)), parseInt(CrmRefType.CAR_COLOR));
        this.printData.certificate =  row.car_client_relation.document_number;

        this.printData.clientId = row.client.id;
        this.printData.carId = row.car.id || 0;

        this.printData.clientType = row.client.sector;
        this.getAddress(row.car_address);
        if (this.printData.isLegal() && row.company) {
            this.getCompany(row.company);
            this.printData.garajAddress = row.company.garaj;
        }
        if (!this.printData.isLegal() && row.person) {
            this.getPersonData(row.person);
        }
        this.setClientData(row.client);
        this.setNotes(row.car_client_relation);
      }
    }),
    switchMap(__ => this.getModelName()),
    switchMap(__ => {
      if (!this.printData.isLegal())
        return this.getPersonDocuments();
      // if(this.printData.isLegal())
      //   return this.getCompanyAddressData();
      return of("");
    }),
    switchMap(_ =>this.getTuningData()),
    // switchMap(__ => {
    //   return this.getAttributeList();
    // })
    ).subscribe();
  }

  getModelName(){
    if (this.printData.carModelId) {
      let request = new CarModel();
      request.setCount(1);
      request.id = this.printData.carModelId + '';
      return this.cof.doRequest(request).pipe(tap((res: any) => {
        if (res && res.total_elements) {
            this.printData.carModel = res.data[0].name;
        }
      }))
    } else
      return of("");
  }

  getPersonDocuments() {
    let request = new CarPersonDocuments();
    request.setOwnerId(this.printData.clientId.toString());
    // request.setTypeId()
    request.setCount(1);
    return this.cof.doRequest(request).pipe(tap(res => {
      let data = <IEmployeeDocumentCollection>res;
      if (data && data.total_elements > 0) {
        let row = data.data[0];
        this.printData.pasportSeria = row.document_number;
      }
    }),
      switchMap(__ => {
        return this.getTechnicalInspection();
      })
      );
  }

  async getAddress(row: ICaraddress) {
    let request = new Country();
    request.setCount(1);
    request.setId(row.country_id+ "")
    let res = await firstValueFrom(this.cof.doRequest(request));
    this.printData.country = res ? (<any>res).data[0].name : '';

    this.printData.region = row ? CommonUtil.getAddressTypeId(row.city_id, parseInt(AddressType.REGION)) : '';
    this.printData.city = row ? CommonUtil.getAddressTypeId(row.city_id, parseInt(AddressType.CITY)) : '';
    this.printData.street = (row  ?  row.street_name : '-');
    this.printData.house = row ? row.house : '-';
    this.printData.flat = row ? row.flat + '' : '-';
    this.printData.addressBlock = row ? row.block : '-';
  }

  getCompany(row: ICompany) {
    this.printData.companyName = row.name;
    this.printData.companyType = CommonUtil.getReferenceByTypeId(row.type_id, parseInt(CrmRefType.COMPANY_TYPE));
  }

  getPersonData(row: IPerson) {
    this.printData.personLastName = row.last_name;
    this.printData.personFirstName = row.first_name;
    this.printData.personMiddleName = row.middle_name;
    this.printData.birthYear = <string>DateUtil.formatDate(new Date(row.born_date));
    
  }

  setClientData(client:IClient){
    this.printData.phone =  client.phone;
  }

  setNotes(clientRelation:ICarclientrelation){
    this.printData.specNote = clientRelation.spec_note || ''; 
    this.printData.basicDocument = clientRelation.document_serial; 
    this.printData.extraNote = clientRelation.extra_note || ''; 

  }

  close() {
    this.dialogRef.close(false);
  }

  public getPlaceTitle(key:string):string{
    return madePlaceOptions.find( v=> v.key == key)?.title || '';
  }

  getAttributeList() {
    let request = new CarAttribute();
    request.setOwnerId(String(this.printData.carId));
    request.setCount(1000);
    return this.cof.doRequest(request).pipe(tap(res => {
      let data = <IEmployeeAttributeCollection>res;
      if (data && data.total_elements > 0) {
        let row = data.data;
        this.printData.objAttrs = row;
      }
    }));
  }


  getTuningData() {
    let request = new CarTuningList();
    request.setOwnerId(this.printData.carId + '');
    request.setCount(1000000);
    request.type_ids = Array.from({length: CarTuningType.TUNING9}, (_, i) => i + 1)
    return this.cof.doRequest(request).pipe(tap(res => {
        let data = <CarTuningCollection>res;
        if (data && data.total_elements > 0) {
         this.tuning = data.data;
         this.tuning.forEach(item => {
           item.type_id = CommonUtil.getReferenceByTypeId(Number(item.type_id), parseInt(CrmRefType.CAR_DOC_TYPE))
         })
        }
      }),
      switchMap(() => {
      return this.getTrustData();
    })

    );
  }

  getTrustData() {
    let request = new CarTrustList();
    request.setOwnerId(this.printData.carId + '');
    request.setCount(1000000);
    return this.cof.doRequest(request).pipe(tap(res => {
        let data = <CarTrustCollection>res;
        if (data && data.total_elements > 0) {
          this.trust = data.data;
        }
      }),
      switchMap(() => {
        return this.getBlockData();
      })
    );
  }
  getBlockData() {
    let request = new CarBlockList();
    request.setOwnerId(this.printData.carId + '');
    request.setCount(1000000);
    return this.cof.doRequest(request).pipe(tap(res => {
        let data = <CarBlockCollection>res;
        if (data && data.total_elements > 0) {
          this.block = data.data;
          this.block.forEach(item => {
            item.block_date = DateUtil.parseDateFromStringWithTimeZone(item.block_date)
          })
        }
      }));
  }

  getTechnicalInspection() {
    let request = new CarTechnicalInspectionList();
    request.setOwnerId(String(this.printData.carId));
    request.setCount(1);
    return this.cof.doRequest(request).pipe(tap(res => {
        let data = <CarTechnicalInspectionListCollection>res;
        if (data && data.total_elements > 0) {
          let row = data.data[0];
          this.printData.texInspectionMark =  CommonUtil.getReferenceByTypeId(row.state_id, parseInt(CrmRefType.CAR_TEXNO_TYPES));
        }
      }));
  }

  // getCompanyAddressData() {
  //   let request = new CarClientAddress();
  //   request.setOwnerId(this.printData.clientId.toString());
  //   request.setCount(1);
  //   return this.cof.doRequest(request).pipe(tap(res => {
  //     let data = <IObjectAddressCollection>res;
  //     if (data && data.total_elements > 0) {
  //       let row = data.data[0];
  //       this.printData.companyCity = CommonUtil.getAddressTypeId(row.city_id, parseInt(AddressType.CITY));
  //       this.printData.companyStreet = row.street_name; 
  //       this.printData.companyHouse = row.house;
  //       this.printData.companyFlat = row.flat + '';
  //       this.printData.companyAddressBlock = row.block + '';
  //     }
  //   }));
  // }
  gotoPrint(){
    PrintUtility.print('printDocument')
  }
}

export interface ITableViewDataPrint extends ITableViewData{
  number: string;
}


export class CarPrintData{
  public clientId!:number;
  public carId!:number;

  public clientType!:number;
  public govNumber!:string;
  public reason!:string;
  public registerTime!:string;
  public previousGovNumber!:string;
  public carModelId!:number;
  public carModel!:string;
  public carType!:string;
  public madePlace!:string;
  public year!:string;
  public engineNumber!:string;
  public chassisNumber!:string;
  public bodyNumber!:string;
  public mainColor!:string;
  public subColor!:string;
  public certificate!:string

  public country!:string;
  public region!:string;
  public city!:string;
  public street!:string;
  public house!:string;
  public flat!:string;
  public addressBlock!:string;
  public garajAddress!:string;

  public companyCity!:string;
  public companyStreet!:string;
  public companyHouse!:string;
  public companyFlat!:string;
  public companyAddressBlock!:string;

  public companyName!:string;
  public companyType!:string;

  public personLastName!:string;
  public personFirstName!:string;
  public personMiddleName!:string;
  public birthYear!:string;
  public pasportSeria!:string;
  public phone!:string;

  public specNote!:string;
  public basicDocument!:string;
  public extraNote!:string;

  public texInspectionMark:string = '-';

  public objAttrs:any;
  public isLegal() {
    return this.clientType == CarClientType.LEGAL;
  }
}