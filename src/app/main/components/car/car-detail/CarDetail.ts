import {Component, Input, OnInit} from "@angular/core";
import {Car} from "../../../../_shared/request/crm/Car";
import {COFService} from "../../../../_service/COFService";
import {CarClientRelationList} from "../../../../_shared/request/crm/CarClientRelationList";
import {CarClientRelationCollection} from "../../../models/car-client-relation";
import {CommonUtil} from "../../../../_service/util/CommonUtil";
import {CrmRefType} from "../../../../common/enums/crm-ref-type.enum";
import {DateUtil} from "../../../../_service/util/DateUtil";
import {CarPersonList} from "../../../../_shared/request/crm/CarPersonList";
import {ActivatedRoute, Params} from "@angular/router";
import {firstValueFrom, map, merge, of, Subject, switchMap, tap} from "rxjs";
import {CarAddressList} from "../../../../_shared/request/crm/CarAddressList";
import {AddressType} from "../../../../common/enums/address-type.enum";
import {ITableViewData} from "../../../models/table-view-data.entity";
import {CarCompanyList} from "../../../../_shared/request/crm/CarCompanyList";
import {TabService} from "../../../../common/widgets/CrmDynamicTab/TabService";
import {TranslateService} from "@ngx-translate/core";
import {Tab} from "../../../../common/widgets/CrmDynamicTab/TabModel";
import {
  DynamicEmployeePanelData,
  EmployeeTemplatePanel
} from "../../employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import {DriverTabKey} from "../../driver/DriverDetail/DriverDetail";
import {IDialogPersonFormData} from "../../employee/forms/IPersonFormInput";
import {StringUtil} from "../../../../_service/util/StringUtil";
import {ObjectOwnerType} from "../../../../common/enums/object-owner-type.enum";
import {CrmFormDialog} from "../../../../common/widgets/CrmFormDialog/CrmFormDialog";
import {EmpAddressForm} from "../../employee/forms/EmpAddress/EmpAddressForm";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {
  CarBlockTab,
  CarCheckPanel,
  CarGasTab,
  CarOwnerHistory,
  CarTechnicalInspection,
  CarTrustTab,
  CarTuningTab
} from "./CarPanelConfig";
import {CarClientList} from "../../../../_shared/request/crm/CarClientList";
import {CarClientType} from "../../../../common/enums/car_client_type";
import {TechnicalInspectionForm} from "../forms/TechnicalInspection/TechnicalInspectionForm";
import {CarCheckForm} from "../forms/CheckForm/CarCheckForm";
import {CarTuningForm} from "../forms/CarTuningForm/CarTuningForm";
import {CarEdit} from "../car-edit/CarEdit";
import {CarAdd} from "../car-add2/CarAdd";
import {AttributeSetupDynamicPanel} from "src/app/common/widgets/AttributeSetupPanel/AttributeSetupDynamicPanel";
import {BreadcrumbModel, BreadCrumbService} from "../../breadcrumb/BreadCrumbService";
import {madePlaceOptions} from "../forms/CarTechnicParams/CarTechnicParams";
import {CarModel} from "src/app/_shared/request/crm/CarModel";
import {CarBlockForm} from "./CarBlockForm/CarBlockForm";
import {CarPrintDialog, ITableViewDataPrint} from "./CarPrintDialog/CarPrintDialog";
import {CarPersonDocuments} from "../../../../_shared/request/crm/CarPersonDocuments";
import {IEmployeeDocumentCollection} from "../../../models/employee-document.entity";
import {CarGetWithDetails} from "../../../../_shared/request/crm/CarGetWithDetails";
import {ICarGetWithDetailsResponse} from "../../../models/car-get-with-details-entity";
import {ICaraddress, ICompany, IPerson} from "../../../models/car-save-with-details-entity";
import {CarClientAddress} from "../../../../_shared/request/crm/CarClientAddress";
import {IObjectAddressCollection} from "../../../models/object-address.entity";
import {CarTechnicalInspectionList} from "../../../../_shared/request/crm/CarTechnicalInspectionList";
import {CarTechnicalInspectionListCollection} from "../../../models/car-technical-inspection-list.entity";
import { CrmAlertDialog } from "src/app/common/widgets/CrmAlertDialog/CrmAlertDialog";
import { CrmAlertDialogTypeError } from "src/app/common/enums/crm-alert-dialog.enum";
import {CarAttribute} from "../../../../_shared/request/crm/CarAttribute";
import {IEmployeeAttribute, IEmployeeAttributeCollection} from "../../../models/employee-attribute.entity";
import { Country } from "src/app/_shared/request/crm/Country";
import { CrmConfirmDialog } from "src/app/common/widgets/CrmConfirmDialog/CrmConfirmDialog";
import { CarClientRelationsCheckRequest } from "src/app/_shared/request/crm/CarClientRelationsCheckRequest";


@Component({
  selector: 'car-detail',
  templateUrl: 'CarDetail.html',
  styleUrls: ['CarDetail.css'],
})
export class CarDetail implements OnInit {

  constructor(private cof: COFService, private route: ActivatedRoute, private tabService: TabService, private translate: TranslateService, private breadcrumbs: BreadCrumbService) {
    this.breadcrumbs.setItems([
      new BreadcrumbModel(this.translate.instant('CAR.SEARCH'), 'car/list'),
      new BreadcrumbModel(this.translate.instant('CAR.DETAIL')),
    ]);
  }

  @Input() id!: string;
  clientRelationId = 0;
  client_id = 0;
  carDetailData = new CarDetailData();
  tabs = new Array<Tab>();
  selectedTabIndex: number = 0;
  getRequest = new Car();
  getRelationRequest = new CarClientRelationList();
  getPersonRequest = new CarPersonList();
  getClientRequest = new CarClientList();
  getCompanyRequest = new CarCompanyList();
  getPersonAddressRequest = new CarAddressList();
  $refreshDetail: Subject<null> = new Subject();
  private sub: any;
  tabGroupKey!:number;

  ngOnInit() {
    this.sub = merge(this.route.params, this.$refreshDetail).pipe(
      map((params: Params | null) => {
        if (params)
          this.id = params['id'];
      }),
      tap(() => {
        this.clearDetail();
        this.setTabs();
      }),
      map(__ => {
        firstValueFrom(this.getRelationData())
      }),
    ).subscribe();
    this.tabService.$tabSub.subscribe(tabs => {
      this.tabs = tabs;
    });
  }

  clearDetail() {
    this.carDetailData.clear();
  }

  setTabs() {
    this.tabGroupKey = this.tabService.getKey();
    this.tabService.setTabs(this.tabGroupKey,
      [

        new Tab(EmployeeTemplatePanel, 'CAR.TECHNICAL_INSPECTION', <DynamicEmployeePanelData>{
          ownerId: this.id,
          request: (new CarTechnicalInspection(this.translate)).getRequest(),
          refTablecolumnDefs: (new CarTechnicalInspection(this.translate)).getColumnds(this.onRowEdit),
          onAdd: this.saveData,
          showAddbutton: true
        }, CarTabKey.TECHNICAL_INSPECTION),
        new Tab(EmployeeTemplatePanel, 'DRIVER.INSPECTION_RESULTS', <DynamicEmployeePanelData>{
          ownerId: this.id,
          request: (new CarCheckPanel(this.translate)).getRequest(),
          refTablecolumnDefs: (new CarCheckPanel(this.translate)).getColumnds(this.onRowEdit),
          //onAdd: this.saveData,
          showAddbutton: false
        }, CarTabKey.INSPECTION),
        new Tab(EmployeeTemplatePanel, 'GENERAL.HISTORY', <DynamicEmployeePanelData>{
          ownerId: this.id,
          request: (new CarOwnerHistory(this.translate)).getRequest(),
          refTablecolumnDefs: (new CarOwnerHistory(this.translate)).getColumnds(this.onHistoryShow),
          showAddbutton: false,
          onAdd: null
        }, CarTabKey.HISTORY),
        new Tab(EmployeeTemplatePanel, 'CAR.BLACK_TUNING', <DynamicEmployeePanelData>{
          ownerId: this.id,
          request: (new CarTuningTab(this.translate)).getRequest(),
          refTablecolumnDefs: (new CarTuningTab(this.translate)).getColumnds(),
          showAddbutton: true,
          onAdd: this.saveData
        }, CarTabKey.TUNING),
        new Tab(EmployeeTemplatePanel, 'CAR.BLOCKS', <DynamicEmployeePanelData>{
          ownerId: this.id,
          request: (new CarBlockTab(this.translate)).getRequest(),
          refTablecolumnDefs: (new CarBlockTab(this.translate)).getColumnds(this.onRowUnblock),
          showAddbutton: true,
          onAdd: this.saveData
        }, CarTabKey.BLOCK),
        new Tab(EmployeeTemplatePanel, 'CAR.TRUSTEE', <DynamicEmployeePanelData>{
          ownerId: this.id,
          request: (new CarTrustTab(this.translate)).getRequest(),
          refTablecolumnDefs: (new CarTrustTab(this.translate)).getColumnds(),
          showAddbutton: false,
          onAdd: null
        }, CarTabKey.TRUST),
        new Tab(EmployeeTemplatePanel, 'CAR.GAZ_INFO', <DynamicEmployeePanelData>{
          ownerId: this.id,
          request: (new CarGasTab(this.translate)).getRequest(),
          refTablecolumnDefs: (new CarGasTab(this.translate)).getColumnds(),
          showAddbutton: true,
          onAdd: this.saveData
        }, CarTabKey.GAZ),
        new Tab(AttributeSetupDynamicPanel, "GENERAL.ATTRIBUTES", {
          ownerId: this.id,
          readMode: true,
          ownerType: ObjectOwnerType.CAR
        }, DriverTabKey.ATTRIBUTES),
      ],this.selectedTabIndex
    )
  }

  tabChanged(event: MatTabChangeEvent) {
    this.tabService.activeTabChanged(this.tabGroupKey,event.index);
    this.selectedTabIndex = event.index;
  }

  btnClicked(data: any) {
    let tab: Tab | undefined = this.tabs.find(v => v.active);
    if (data.key == 'add') {
      tab!.tabData.onAdd();
    }
  }

  onRowEdit = (params: any) => {
    let row: any = params.rowData;
    this.saveData(row)
  }

  onRowUnblock = (params: any) => {
    let row: any = params.rowData;

    CrmFormDialog.show('CAR.REMOVE_BAN', CarBlockForm, {car_id: this.id, block_id: row.id}).subscribe(result => {
      if (result) {
        this.$refreshDetail.next(null);
      }
    });
  }

  onHistoryShow = (params: any) => {
    let row: any = params.rowData;
    CarPrintDialog.show(row.id,1).subscribe()
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
    this.tabService.remove(this.tabGroupKey);
  }

  removeTab(index: number): void {
    this.tabService.removeTab(this.tabGroupKey,index);
  }

  getFormParams(key: string | undefined) {
    let formParams: any;
    switch (key) {
      case CarTabKey.GAZ:
      case CarTabKey.TUNING:
        formParams = {
          title: key == CarTabKey.GAZ ? 'CAR.GAZ_FORM' : 'CAR.TUNING_FORM',
          component: CarTuningForm
        };
        break;
      case DriverTabKey.ADDRESS:
        formParams = {
          title: 'EMPLOYEE.ADDRESS_SAVE_TITLE',
          component: EmpAddressForm
        };
        break;
      case CarTabKey.TECHNICAL_INSPECTION:
        formParams = {
          title: 'CAR.TECHNICAL_INSPECTION',
          component: TechnicalInspectionForm
        };
        break;
      case CarTabKey.BLOCK:
        formParams = {
          title: 'CAR.BLOCKS',
          component: CarBlockForm
        };
        break;
      case CarTabKey.INSPECTION:
        formParams = {
          title: 'DRIVER.ADD_INSPECTION_RESULT',
          component: CarCheckForm
        };
        break;
    }
    return formParams;
  }

  saveData = async (row: any | null = null) => {
    let tab: Tab | undefined = this.tabService.getActiveTab(this.tabGroupKey);
    let formParams: any = this.getFormParams(tab?.key);

    let params: IDialogPersonFormData = {
      id: row == null ? '' : <string>StringUtil.toStr(row.id, ''),
      ownerId: this.id,
      ownerType: ObjectOwnerType.CAR
    }
    if (tab?.key == CarTabKey.GAZ)
      (<any>params).isGaz = (tab?.key == CarTabKey.GAZ);

    let needRefresh: boolean = await firstValueFrom(CrmFormDialog.show(formParams.title, formParams.component, params));
    if (needRefresh) {
      this.tabService.refreshActiveTab(this.tabGroupKey);
    }
  }

  printDetails() {
    CarPrintDialog.show(this.clientRelationId).subscribe()
  }

  public getPlaceTitle(key: string): string {
    return madePlaceOptions.find(v => v.key == key)?.title || '';
  }

  getRelationData() {
    this.getRelationRequest.setCount(10000);
    this.getRelationRequest.car_id = this.id;
    return this.cof.doRequest(this.getRelationRequest).pipe(tap(res => {
        let data = <CarClientRelationCollection>res;
        if (data && data.total_elements > 0) {
          let row = data.data[data.total_elements - 1];
          this.clientRelationId = row.id;
          this.client_id = row.client_id;
        }
      }),
      switchMap(() => {
        if (this.clientRelationId == 0)
          return of("");
        return this.getAllData();
      })
    );
  }

  getAllData() {
    let request = new CarGetWithDetails(String(this.clientRelationId));
    return this.cof.doGetRequest(request).pipe(tap(async res => {
      let data = <ICarGetWithDetailsResponse>res;
      if (data && data.status == 200) {
        let row = data.data;
        if(row.car?.flag === 2) {
          CrmAlertDialog.show('CAR.THE_CAR_BLOCKED',CrmAlertDialogTypeError.WARNING);
        }

        this.carDetailData.govNumber = row.car_client_relation.drb_number;
        this.carDetailData.car.push(
          {
            title: 'CAR.TEXNO_PROCESS',
            value: CommonUtil.getReferenceByTypeId(row.car_client_relation.reason_id, parseInt(CrmRefType.CAR_TEXNO_TYPES)),
            number: '1'
          },
          {
            title: 'CAR.REGISTRATION_TIME',
            value: DateUtil.parseDateFromStringWithTimeZone(row.car_client_relation.start_date),
            number: '2'
          },
          {
            title: 'CAR.GOV_NUMBER',
            value: row.car_client_relation.drb_number,
            number: '3'
          },
          {
            title: 'CAR.PREVIOUS_GOV_NUMBER',
            value: (row.car_client_relation.old_drb_number ? row.car_client_relation.old_drb_number : '-'),
            number: '4',
          },
          {
            title: 'CAR.MODEL',
            value: row.car.model_id,
            number: '5',
          },
          {
            title: 'CAR.TYPE',
            value: CommonUtil.getReferenceByTypeId(row.car.type_id, parseInt(CrmRefType.CAR_MODEL_TYPE)),
            number: '5a',
          },
          {
            title: 'CAR.MADE_PLACE',
            // value: this.translate.instant(this.getPlaceTitle(row.car.country_id + '')),
            value: [1,2,3].includes(row.car.country_id) ? this.translate.instant(this.getPlaceTitle(row.car.country_id + '')) : '',
            number: '5б'
          },
          {
            title: 'CAR.YEAR',
            value: row.car.year,
            number: '6'
          },
          {
            title: 'CAR.ENGINE_NUMBER',
            value: row.car.engine_number,
            number: '7',
          },
          {
            title: 'CAR.CHASSIS_NUMBER',
            value: row.car.chassis_number,
            number: '8',
          },
          {
            title: 'CAR.BODY_NUMBER',
            value: row.car.body_number,
            number: '9'
          },
          {
            title: 'CAR.MAIN_COLOR',
            value: CommonUtil.getReferenceTreeByTypeId(row.car.color_id, parseInt(CrmRefType.CAR_COLOR)),
            number: '10'
          },
          {
            title: 'CAR.COLOR',
            value: row.car.sub_color_id ? CommonUtil.getReferenceTreeByTypeId(parseInt(String(row.car.sub_color_id)), parseInt(CrmRefType.CAR_COLOR)) : row.car.sub_color_name,
            number: '10'
          },
          {
            title: 'DRIVER_DETAIL_PRINT.CERTIFICATE',
            value: row.car_client_relation.document_number,
            number: '11'
          }
        )
        this.carDetailData.clientType = row.client.sector;
        await this.getAddress(row.car_address);
        if (row.company)
        this.carDetailData.carAddress.push(
          {
            title: 'GENERAL.GARAGE',
            value: row.company?.garaj || '',
            number: '11'
          }
        )
        if (this.carDetailData.clientType == CarClientType.LEGAL) {
          if (row.company) {
            this.getCompany(row.company);
          }
        } else {
          if (row.person) {
            this.getPersonData(row.person);
            this.carDetailData.carAddress.push({
              title: 'CAR.PHONE',
              number: '22',
              value: <string>row.client.phone,
            })
          }
        }
        this.carDetailData.carNotes.push({
            title: 'CAR.SPEC_NOTE',
            value: <string>row.car_client_relation.spec_note,
          }, {
            title: 'CAR_PRINT_DIALOG.BASIC_DOCUMENT',
            value: <string>row.car_client_relation.document_serial,
          }, {
            title: 'CAR.EXTRA_NOTE',
            value: <string>row.car_client_relation.extra_note,
          }, {
            title: 'CAR.PHONE',
            value: <string>row.client.phone,
          });

      }
    }),
    switchMap(__ => {
      let row = this.carDetailData.car.find(v => v.title == 'CAR.MODEL')
      if (row && row.value) {
        let request = new CarModel();
        request.setCount(1);
        request.id = row.value + '';
        return this.cof.doRequest(request).pipe(tap((res: any) => {
          if (row && res && res.total_elements) {
              row.value = res.data[0].name;
              this.carDetailData.carModelDetails.push(
                {
                  title: 'CAR.WEIGHT',
                  number: 'weight',
                  value: res.data[0].weight,
                },
                {
                  title: 'CAR.PURE_WEIGHT',
                  number: 'pure_weight',
                  value: res.data[0].pure_weight,
                },
                {
                  title: 'CAR.PLACE_COUNT',
                  number: 'place_count',
                  value: res.data[0].place_count,
                })
          }
        }))
      } else
        return of("");
    }),
    switchMap(__ => {
      if (this.carDetailData.clientType == CarClientType.INDIVIDUAL)
        return this.getPersonDocuments();
      // if(this.carDetailData.clientType == CarClientType.LEGAL)
      //   return this.getCompanyAddressData();
      return of("");
    }),
    switchMap(__ => {
      return this.getAttributeList();
    }));
  }

  getPersonData(row: IPerson) {
    this.carDetailData.carPerson.push({
        title: 'GENERAL.LASTNAME',
        value: row.last_name,
        number: '12'
      },
      {
        title: 'GENERAL.NAME',
        value: row.first_name,
        number: '13',
      },
      {
        title: 'GENERAL.MIDDLENAME',
        value: row.middle_name,
        number: '14'
      },
      {
        title: 'GENERAL.BIRTH_YEAR',
        value: <string>DateUtil.formatDate(new Date(row.born_date)),
        number: '15',
      },
      {
        title: 'GENERAL.PASPORT_SERIA',
        value: '-',
        number: '16'
      });

  }

  getCompanyAddressData() {
    let request = new CarClientAddress();
    request.setOwnerId(String(this.client_id));
    request.setCount(1000000);
    return this.cof.doRequest(request).pipe(tap(res => {
      let data = <IObjectAddressCollection>res;
      if (data && data.total_elements > 0) {
        let row = data.data[0];
        this.carDetailData.companyAddress.push(
          {
            title: 'ADDRESS.REGION',
            value: CommonUtil.getAddressTypeId(row.region_id, parseInt(AddressType.REGION)),
            number: '18'
          },
          {
            title: 'ADDRESS.CITY',
            value: CommonUtil.getAddressTypeId(row.city_id, parseInt(AddressType.CITY)),
            number: '18'
          },
          {
            title: 'ADDRESS.STREET',
            value: row.street_name ,
            number: '19a'
          },
          {
            title: 'ADDRESS.HOUSE',
            value: row.house,
            number: '20'
          },
          {
            title: 'ADDRESS.FLAT',
            value: row.flat,
            number: '21'
          },
          {
            title: 'ADDRESS.KORPUS',
            value: row.block,
            number: '22'
          })
      }
    }));
  }

  getPersonDocuments() {
    let request = new CarPersonDocuments();
    request.setOwnerId(String(this.client_id));
    request.setCount(1);
    return this.cof.doRequest(request).pipe(tap(res => {
      let data = <IEmployeeDocumentCollection>res;
      if (data && data.total_elements > 0) {
        let row = data.data[0];
        this.carDetailData.carPerson[4] = {
          title: 'GENERAL.PASPORT_SERIA',
          value: row.document_number,
          number: '16'
        }
      }
    }),
      switchMap(__ => {
        return this.getTechnicalInspection();
      }));
  }

  getAttributeList() {
    let request = new CarAttribute();
    request.setOwnerId(String(this.id));
    request.setCount(1000);
    return this.cof.doRequest(request).pipe(tap(res => {
      let data = <IEmployeeAttributeCollection>res;
      if (data && data.total_elements > 0) {
        let row = data.data;
        row.forEach((item: IEmployeeAttribute) => {
          this.carDetailData.carModelDetails.forEach((field) => {
            if(item.key == field.number && !field.value) {
              field.value = item.value;
            }
          })
        })
      }
    }));
  }

  getTechnicalInspection() {
    let request = new CarTechnicalInspectionList();
    request.setOwnerId(String(this.id));
    request.setCount(1);
    return this.cof.doRequest(request).pipe(tap(res => {
        let data = <CarTechnicalInspectionListCollection>res;
        if (data && data.total_elements > 0) {
          let row = data.data[0];
          this.carDetailData.carAddress.push({
            title: 'CAR_PRINT_DIALOG.TEX_INSPECTION_MARK',
            value: CommonUtil.getReferenceByTypeId(row.state_id, parseInt(CrmRefType.CAR_TEXNO_TYPES)),
            number: '23'
          });
        }
        else {
          this.carDetailData.carAddress.push({
            title: 'CAR_PRINT_DIALOG.TEX_INSPECTION_MARK',
            value: '-',
            number: '23'
          });
        }
      }));
  }

  getCompany(row: ICompany) {
    this.carDetailData.carPerson.push({
        title: 'GENERAL.ORGANIZATION_TITLE',
        value: row.name,
        number: '12'
      },
      {
        title: 'GENERAL.TYPE',
        value: CommonUtil.getReferenceByTypeId(row.type_id, parseInt(CrmRefType.COMPANY_TYPE)),
        number: '13'
      });
  }

  async getAddress(row: ICaraddress) {
    if(row) {

      let request = new Country();
      request.setCount(1);
      request.setId(row.country_id+ "")
      let res = await firstValueFrom(this.cof.doRequest(request));
      let country = res ? (<any>res).data[0].name : '';

      this.carDetailData.carAddress.push(
        {
          title: 'ADDRESS.COUNTRY',
          value: country,
          number: '18'
        },
        {
          title: 'ADDRESS.REGION',
          value: CommonUtil.getAddressTypeId(row.region_id, parseInt(AddressType.REGION)),
          number: '18'
        },
      {
          title: 'ADDRESS.CITY',
          value: CommonUtil.getAddressTypeId(row.city_id, parseInt(AddressType.CITY)),
          number: '18'
        },
        {
          title: 'ADDRESS.STREET',
          value: row.street_name,
          number: '19a'
        },
        {
          title: 'ADDRESS.HOUSE',
          value: row.house,
          number: '20'
        },
        {
          title: 'ADDRESS.FLAT',
          value: row.flat,
          number: '21'
        },
        {
          title: 'ADDRESS.KORPUS',
          value: row.block,
          number: '22'
        })
    }
    else {
      this.carDetailData.carAddress.push(
        {
          title: 'ADDRESS.COUNTRY',
          value: '-',
          number: '18'
        },
        {
          title: 'ADDRESS.REGION',
          value: '-',
          number: '18'
        },        {
          title: 'ADDRESS.CITY',
          value: '-',
          number: '18'
        },
        {
          title: 'ADDRESS.STREET',
          value: '-',
          number: '19a'
        },
        {
          title: 'ADDRESS.HOUSE',
          value: '-',
          number: '20'
        },
        {
          title: 'ADDRESS.FLAT',
          value: '-',
          number: '21'
        },
        {
          title: 'ADDRESS.KORPUS',
          value: '-',
          number: '22'
        })
    }
  }

  async onEdit() {
    let needRefresh: boolean = await firstValueFrom(CrmFormDialog.show(null, CarEdit, {car_id: this.id}));
    if (needRefresh) {
      this.$refreshDetail.next(null);
    }

  }

  async onTechnoProcess() {
    let needRefresh: any = await firstValueFrom(CrmFormDialog.show(null, CarAdd, {car_id: this.id}));
    if (needRefresh) {
      this.$refreshDetail.next(null);
    }
  }

  async addBan() {
    let needRefresh: boolean = await firstValueFrom(CrmFormDialog.show('CAR.ADD_BAN', CarBlockForm, {car_id: this.id}));
    if (needRefresh) {
      this.$refreshDetail.next(null);
    }
  }

  async sendToCheck() {
    let needRefresh: boolean = await firstValueFrom(CrmConfirmDialog.show(''));
    if (needRefresh) {
      let request = new CarClientRelationsCheckRequest()
      request.id = this.clientRelationId
      let res = await firstValueFrom(this.cof.doRequest(request));
      console.log(res,'res')
      // this.$refreshDetail.next(null);
    }
  }

  
}

export class CarDetailData {
  car: ITableViewDataPrint[] = [];
  carPerson: ITableViewDataPrint[] = [];
  carAddress: ITableViewDataPrint[] = [];
  companyAddress: ITableViewDataPrint[] = [];
  carNotes: ITableViewData[] = [];
  carModelDetails: ITableViewDataPrint[] = [];
  govNumber: string = '';
  carPersonAndAddress: ITableViewDataPrint[] = [];

  clientType = CarClientType.INDIVIDUAL;
  clear() {
    this.car = [];
    this.carPerson = [];
    this.carAddress = [];
    this.carModelDetails = [];
    this.carNotes = [];
    this.companyAddress = [];
    this.carPersonAndAddress = [];
  }

  joinPersonAndAddress() {
    if(this.isLegal()) {
      // this.carPersonAndAddress = [...this.carPerson];
      this.carPersonAndAddress.push({
        title: 'CAR_PRINT_DIALOG.BUSINESS_ADDRESS',
        number: '-1',
        value: '',
      })
      // this.carPersonAndAddress = [...this.carPersonAndAddress, ...this.companyAddress]
      // this.carPersonAndAddress.push({
      //   title: 'CAR_PRINT_DIALOG.GARAGE_ADDRESS',
      //   number: '-1',
      //   value: '',
      // })
      this.carPersonAndAddress = [...this.carPersonAndAddress, ...this.carAddress];
    }
    else {
      this.carPersonAndAddress = [...this.carPerson];
      this.carPersonAndAddress.push({
        title: 'DRIVER.ADDRESS',
        number: '-1',
        value: '',
      })
      this.carPersonAndAddress = [...this.carPersonAndAddress, ...this.carAddress];
    }

  }

  isArrayIndexExist(index: number, array: ITableViewDataPrint[]) {
    return index < array.length;
  }

  isLegal() {
    return this.clientType == CarClientType.LEGAL;
  }
}

export enum CarTabKey {
  TRUST = 'trust',
  TECHNICAL_INSPECTION = 'technical_inspection',
  INSPECTION = 'inspection',
  HISTORY = 'history',
  ACCOUNT_PAYMENT = 'account_payment',
  INSURANCE = 'insurance',
  BLOCK = 'block',
  TUNING = 'tuning',
  GAZ = 'gaz'
}
