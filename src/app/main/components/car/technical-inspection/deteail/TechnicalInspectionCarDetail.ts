import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {firstValueFrom, map, merge, of, Subject, switchMap, tap} from "rxjs";
import {COFService} from "../../../../../_service/COFService";
import {TabService} from "../../../../../common/widgets/CrmDynamicTab/TabService";
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbModel, BreadCrumbService} from "../../../breadcrumb/BreadCrumbService";
import {CarClientRelationList} from "../../../../../_shared/request/crm/CarClientRelationList";
import {Tab} from "../../../../../common/widgets/CrmDynamicTab/TabModel";
import {
  DynamicEmployeePanelData,
  EmployeeTemplatePanel
} from "../../../employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import {CarTechnicalInspection} from "../../car-detail/CarPanelConfig";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {CrmFormDialog} from "../../../../../common/widgets/CrmFormDialog/CrmFormDialog";
import {TechnicalInspectionForm} from "../../forms/TechnicalInspection/TechnicalInspectionForm";
import {IDialogPersonFormData} from "../../../employee/forms/IPersonFormInput";
import {StringUtil} from "../../../../../_service/util/StringUtil";
import {ObjectOwnerType} from "../../../../../common/enums/object-owner-type.enum";
import {CarGetWithDetails} from "../../../../../_shared/request/crm/CarGetWithDetails";
import {ICarGetWithDetailsResponse} from "../../../../models/car-get-with-details-entity";
import {CommonUtil} from "../../../../../_service/util/CommonUtil";
import {DateUtil} from "../../../../../_service/util/DateUtil";
import {CrmRefType} from "../../../../../common/enums/crm-ref-type.enum";
import {CarClientType} from "../../../../../common/enums/car_client_type";
import {CarModel} from "../../../../../_shared/request/crm/CarModel";
import {ICompany, IPerson} from "../../../../models/car-save-with-details-entity";
import {CarDetailData} from "../../car-detail/CarDetail";
import {Car} from "../../../../../_shared/request/crm/Car";
import {madePlaceOptions} from "../../forms/CarTechnicParams/CarTechnicParams";
import {CarClientRelationCollection} from "../../../../models/car-client-relation";


@Component({
  selector: 'technical-inspection-car-detail',
  templateUrl: 'TechnicalInspectionCarDetail.html',
  styleUrls: ['TechnicalInspectionCarDetail.css'],
})
export class TechnicalInspectionCarDetail implements OnInit {

  constructor(private cof: COFService, private route: ActivatedRoute, private tabService: TabService, private translate: TranslateService, private breadcrumbs: BreadCrumbService) {
    this.breadcrumbs.setItems([
      new BreadcrumbModel(this.translate.instant('CAR.TECHNICAL_INSPECTION'), 'car/technical-inspection/search'),
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

  async onAdd() {
    let params: IDialogPersonFormData = {
      id: "",
      ownerId: this.id,
      ownerType: ObjectOwnerType.CAR
    }
    let needRefresh: boolean = await firstValueFrom(CrmFormDialog.show('CAR.TECHNICAL_INSPECTION', TechnicalInspectionForm, params));
    if (needRefresh) {
      this.tabService.refreshActiveTab(this.tabGroupKey);
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
      case CarTabKey.TECHNICAL_INSPECTION:
        formParams = {
          title: 'CAR.TECHNICAL_INSPECTION',
          component: TechnicalInspectionForm
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
    let needRefresh: boolean = await firstValueFrom(CrmFormDialog.show(formParams.title, formParams.component, params));
    if (needRefresh) {
      this.tabService.refreshActiveTab(this.tabGroupKey);
    }
  }

  public getPlaceTitle(key: string): string {
    return madePlaceOptions.find(v => v.key == key)?.title || '';
  }

  getRelationData() {
    this.getRelationRequest.setCount(1);
    this.getRelationRequest.car_id = this.id;
    return this.cof.doRequest(this.getRelationRequest).pipe(tap(res => {
        let data = <CarClientRelationCollection>res;
        if (data && data.total_elements > 0) {
          let row = data.data[0];
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
    return this.cof.doGetRequest(request).pipe(tap(res => {
      let data = <ICarGetWithDetailsResponse>res;
      if (data && data.status == 200) {
        let row = data.data;
        this.carDetailData.car.push(
          {
            title: 'CAR.TEXNO_PROCESS',
            value: CommonUtil.getReferenceByTypeId(row.car_client_relation.reason_id, parseInt(CrmRefType.CAR_TEXNO_TYPES)),
            number: '1'
          },
          {
            title: 'CAR.REGISTRATION_TIME',
            value: <string>DateUtil.formatDate(new Date(row.car_client_relation.agr_date)),
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
            value: this.translate.instant(this.getPlaceTitle(row.car.country_id + '')),
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
            value: CommonUtil.getReferenceTreeByTypeId(parseInt(String(row.car.sub_color_id)), parseInt(CrmRefType.CAR_COLOR)),
            number: '10'
          },
          {
            title: 'DRIVER_DETAIL_PRINT.CERTIFICATE',
            value: row.car_client_relation.document_number,
            number: '11'
          }
        )
        this.carDetailData.clientType = row.client.sector;
        if (this.carDetailData.clientType == CarClientType.LEGAL) {
          if (row.company) {
            this.getCompany(row.company);
          }
        } else {
          if (row.person) {
            this.getPersonData(row.person);
          }
        }
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
          }
        }))
      } else
        return of("");
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
      });

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
}

export enum CarTabKey {
  TECHNICAL_INSPECTION = 'technical_inspection',
}
