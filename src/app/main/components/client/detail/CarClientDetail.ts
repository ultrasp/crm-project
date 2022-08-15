import {Component, Input, OnInit} from "@angular/core";
import {COFService} from "../../../../_service/COFService";
import {CommonUtil} from "../../../../_service/util/CommonUtil";
import {CrmRefType} from "../../../../common/enums/crm-ref-type.enum";
import {DateUtil} from "../../../../_service/util/DateUtil";
import {CarPersonList} from "../../../../_shared/request/crm/CarPersonList";
import {ICarPersonList} from "../../../models/car-person-list.entity";
import {ActivatedRoute, Params} from "@angular/router";
import {firstValueFrom, map, merge, Subject, switchMap, tap} from "rxjs";
import {CarAddressList} from "../../../../_shared/request/crm/CarAddressList";
import {ITableViewData} from "../../../models/table-view-data.entity";
import {CarCompanyList} from "../../../../_shared/request/crm/CarCompanyList";
import {CarCompanyListCollection} from "../../../models/car-company-list.entity";
import {TabService} from "../../../../common/widgets/CrmDynamicTab/TabService";
import {TranslateService} from "@ngx-translate/core";
import {Tab} from "../../../../common/widgets/CrmDynamicTab/TabModel";
import {IDialogPersonFormData} from "../../employee/forms/IPersonFormInput";
import {StringUtil} from "../../../../_service/util/StringUtil";
import {ObjectOwnerType} from "../../../../common/enums/object-owner-type.enum";
import {CrmFormDialog} from "../../../../common/widgets/CrmFormDialog/CrmFormDialog";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {CarClientList} from "../../../../_shared/request/crm/CarClientList";
import {CarClientListCollection} from "../../../models/car-client-list.entity";
import {CarClientType} from "../../../../common/enums/car_client_type";
import {BreadcrumbModel, BreadCrumbService} from "../../breadcrumb/BreadCrumbService";
import {CarPersonDocuments} from "../../../../_shared/request/crm/CarPersonDocuments";
import {IEmployeeDocumentCollection} from "../../../models/employee-document.entity";
import {
  DynamicEmployeePanelData,
  EmployeeTemplatePanel
} from "../../employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import {CarClientAddressPanel, CarClientRelationPanel, CarPersonDocumentPanel} from "./CarClientPanelConfig";
import {EmpAddressForm} from "../../employee/forms/EmpAddress/EmpAddressForm";
import {PersonDocumentForm} from "../../driver/forms/PersonDocumentForm/PersonDocumentForm";


@Component({
  selector: 'car-client-detail',
  templateUrl: 'CarClientDetail.html',
  styleUrls: ['CarClientDetail.css'],
})
export class CarClientDetail implements OnInit {

  constructor(private cof: COFService, private route: ActivatedRoute, private tabService: TabService, private translate: TranslateService, private breadcrumbs: BreadCrumbService) {
    this.breadcrumbs.setItems([
      new BreadcrumbModel(this.translate.instant('CAR.SEARCH'), 'car/list'),
      new BreadcrumbModel(this.translate.instant('CAR.DETAIL')),
    ]);
  }

  @Input() id!: string;
  client_id = 0;
  clientType = CarClientType.INDIVIDUAL;
  carPersonLeft: ITableViewData[] = [];
  carPersonRight: ITableViewData[] = [];
  tabs = new Array<Tab>();
  selectedTabIndex: number = 0;
  getPersonRequest = new CarPersonList();
  getClientRequest = new CarClientList();
  getCompanyRequest = new CarCompanyList();
  getPersonAddressRequest = new CarAddressList();
  $refreshDetail: Subject<null> = new Subject();
  private sub: any;

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
        firstValueFrom(this.getData())
      }),
    ).subscribe();
    this.tabService.$tabSub.subscribe(tabs => {
      this.tabs = tabs;
    });
  }

  clearDetail() {
    this.carPersonLeft = [];
    this.carPersonRight = [];
  }

  tabGroupKey!:number

  setTabs() {
    this.tabGroupKey = this.tabService.getKey();
    this.tabService.setTabs(this.tabGroupKey,
      [
        new Tab(EmployeeTemplatePanel, 'EMPLOYEE.ADDRESS_INFORMATION', <DynamicEmployeePanelData>{
          ownerId: this.id,
          request: (new CarClientAddressPanel(this.translate)).getRequest(),
          refTablecolumnDefs: (new CarClientAddressPanel(this.translate)).getColumnds(this.onRowEdit),
          onAdd: this.saveData,
          showAddbutton: true
        }, CarClientTabKey.ADDRESS),
        new Tab(EmployeeTemplatePanel, 'MENU.CAR', <DynamicEmployeePanelData>{
          ownerId: this.id,
          request: (new CarClientRelationPanel(this.translate)).getRequest(),
          refTablecolumnDefs: (new CarClientRelationPanel(this.translate)).getColumnds(),
          onAdd: this.saveData,
          showAddbutton: false
        }, CarClientTabKey.CAR),
      ]
    )
  }

  tabChanged(event: MatTabChangeEvent) {
    this.tabService.activeTabChanged(this.tabGroupKey,event.index);
  }

  btnClicked(data: any) {
    let tab = this.tabService.getActiveTab(this.tabGroupKey);
    if (tab && data.key == 'add') {
      tab!.tabData.onAdd();
    }
  }

  addDocTab() {
    if (this.clientType == CarClientType.INDIVIDUAL) {
      this.tabService.addTab(this.tabGroupKey,
        new Tab(EmployeeTemplatePanel, 'GENERAL.DOCUMENTS', <DynamicEmployeePanelData>{
          ownerId: this.id,
          request: (new CarPersonDocumentPanel(this.translate)).getRequest(),
          refTablecolumnDefs: (new CarPersonDocumentPanel(this.translate)).getColumnds(this.onRowEdit),
          onAdd: this.saveData,
          showAddbutton: true
        }, CarClientTabKey.DOCUMENTS))
    }
  }

  onRowEdit = (params: any) => {
    let row: any = params.rowData;
    this.saveData(row)
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
      case CarClientTabKey.ADDRESS:
        formParams = {
          title: 'EMPLOYEE.ADDRESS_SAVE_TITLE',
          component: EmpAddressForm
        };
        break;
      case CarClientTabKey.DOCUMENTS:
        formParams = {
          title: 'EMPLOYEE.DOCUMENTS_SAVE_TITLE',
          component: PersonDocumentForm
        };
    }
    return formParams;
  }

  saveData = async (row: any | null = null) => {
    let tab: Tab | undefined = this.tabService.getActiveTab(this.tabGroupKey);
    let formParams: any = this.getFormParams(tab?.key);

    let params: IDialogPersonFormData = {
      id: row == null ? '' : <string>StringUtil.toStr(row.id, ''),
      ownerId: this.id,
      ownerType: ObjectOwnerType.CAR_CLIENT
    }
    let needRefresh: boolean = await firstValueFrom(CrmFormDialog.show(formParams.title, formParams.component, params));
    if (needRefresh) {
      this.tabService.refreshActiveTab(this.tabGroupKey);
    }
  }


  getData() {
    this.getClientRequest.setCount(1);
    this.getClientRequest.id = Number(this.id);
    return this.cof.doRequest(this.getClientRequest).pipe(tap(res => {
        let data = <CarClientListCollection>res;
        if (data && data.total_elements > 0) {
          let row = data.data[0];
          this.clientType = row.sector
          this.addDocTab();
        }
      }),
      switchMap(() => {
        if (this.clientType == CarClientType.LEGAL) {
          return this.getCompany();
        } else {
          return this.getPersonData();
        }
      }));
  }

  getPersonData() {
    this.getPersonRequest.setCount(1);
    this.getPersonRequest.id = String(this.id);
    return this.cof.doRequest(this.getPersonRequest).pipe(tap(res => {
        let data = <ICarPersonList>res;
        if (data && data.total_elements > 0) {
          let row = data.data[0];
          this.carPersonLeft.push({
              title: 'GENERAL.LASTNAME',
              value: row.last_name,
            },
            {
              title: 'GENERAL.MIDDLENAME',
              value: row.middle_name,
            },
            {
              title: 'GENERAL.CITIZENSHIP',
              value: CommonUtil.getReferenceByTypeId(row.citizenship_id, parseInt(CrmRefType.CITIZENSHIP)),
            });
          this.carPersonRight.push(
            {
              title: 'GENERAL.NAME',
              value: row.first_name,
            },
            {
              title: 'GENERAL.BIRTHDATE',
              value: <string>DateUtil.formatDate(new Date(row.born_date)),
            },
          )
        } else {
          this.carPersonLeft.push({
              title: 'GENERAL.LASTNAME',
              value: '-',
            },
            {
              title: 'GENERAL.MIDDLENAME',
              value: '-',
            },
            {
              title: 'GENERAL.CITIZENSHIP',
              value: '-',
            });
          this.carPersonRight.push(
            {
              title: 'GENERAL.NAME',
              value: '-',
            },
            {
              title: 'GENERAL.BIRTHDATE',
              value: '-',
            },
          )
        }
      }),
      switchMap(() => {
        return this.getPersonDocuments();
      }));
  }

  getPersonDocuments() {
    let request = new CarPersonDocuments();
    request.setOwnerId(String(this.id));
    request.setCount(1);
    return this.cof.doRequest(request).pipe(tap(res => {
      let data = <IEmployeeDocumentCollection>res;
      if (data && data.total_elements > 0) {
        let row = data.data[0];
        this.carPersonRight.push({
          title: 'GENERAL.PASPORT_SERIA_NUMBER',
          value: row.document_number,
        })
      } else {
        this.carPersonRight.push({
          title: 'GENERAL.PASPORT_SERIA_NUMBER',
          value: '-',
        })
      }
    }));
  }

  getCompany() {
    this.getCompanyRequest.setCount(1);
    this.getCompanyRequest.id = String(this.id);
    return this.cof.doRequest(this.getCompanyRequest).pipe(tap(res => {
      let data = <CarCompanyListCollection>res;
      if (data && data.total_elements > 0) {
        let row = data.data[0];
        this.carPersonLeft.push({
            title: 'GENERAL.ORGANIZATION_TITLE',
            value: row.name,
          },

          {
            title: 'GENERAL.STIR',
            value: row.tax_id,
          });
        this.carPersonRight.push(
          {
            title: 'GENERAL.TYPE',
            value: CommonUtil.getReferenceByTypeId(row.type_id, parseInt(CrmRefType.COMPANY_TYPE)),
          },
        )
      } else {
        this.carPersonLeft.push({
            title: 'GENERAL.ORGANIZATION_TITLE',
            value: '',
          },
          {
            title: 'GENERAL.STIR',
            value: '',
          });
        this.carPersonRight.push(
          {
            title: 'GENERAL.TYPE',
            value: '',
          },
        )
      }
    }));
  }
}

export enum CarClientTabKey {
  ADDRESS = 'address',
  CAR = 'car',
  DOCUMENTS = 'documents',
}
