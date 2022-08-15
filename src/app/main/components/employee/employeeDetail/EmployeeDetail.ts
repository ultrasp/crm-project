import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {ActivatedRoute, Params} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {catchError, firstValueFrom, map, of, switchMap, tap} from 'rxjs';
import {Tab} from 'src/app/common/widgets/CrmDynamicTab/TabModel';
import {TabService} from 'src/app/common/widgets/CrmDynamicTab/TabService';
import {CrmFormDialog} from 'src/app/common/widgets/CrmFormDialog/CrmFormDialog';
import {EmployeeCollection} from 'src/app/main/models/employee-entity';
import {COFService} from 'src/app/_service/COFService';
import {Employee} from 'src/app/_shared/request/crm/Employee';
import {CrmEmpAddDialog} from '../employee-add/CrmEmpAddDialog';
import {
  EmpAddressPanel,
  EmpAwardPanel,
  EmpEducationPanel,
  EmpExperiencePanel,
  EmployeeFiles,
  EmployeeLanguages,
  EmpMilitaryPanel,
  EmpPunishPanel,
  EmpRelativePanel
} from '../EmployeeTemplatePanel/EmployeePanels';
import {DynamicEmployeePanelData, EmployeeTemplatePanel} from '../EmployeeTemplatePanel/EmployeeTemplatePanel';
import {EmpAddressForm} from '../forms/EmpAddress/EmpAddressForm';
import {EmpAwardForm} from '../forms/empAward/EmpAwardForm';
import {EmpEducationForm} from '../forms/EmpEducationForm/EmpEducationForm';
import {EmpExperienceForm} from '../forms/EmpExperienceForm/EmpExperienceForm';
import {EmpMilitaryForm} from '../forms/EmpMilitaryForm/EmpMilitaryForm';
import {EmpRelativeForm} from '../forms/EmpRelativeForm/EmpRelativeForm';
import {DateUtil} from "../../../../_service/util/DateUtil";
import {CommonUtil} from "../../../../_service/util/CommonUtil";
import {CrmRefType} from "../../../../common/enums/crm-ref-type.enum";
import {EmployeeAttachmentAdd} from "../../../../_shared/request/crm/EmployeeAttachmentAdd";
import {AttributeSetupDynamicPanel} from 'src/app/common/widgets/AttributeSetupPanel/AttributeSetupDynamicPanel';
import {IDialogAddressFormData, IDialogPersonFormData} from '../forms/IPersonFormInput';
import {ObjectOwnerType} from 'src/app/common/enums/object-owner-type.enum';
import {StringUtil} from 'src/app/_service/util/StringUtil';
import {CrmAttachmentTypes} from 'src/app/common/enums/crm-attachement-types.enum';
import {EmpPunishForm} from '../forms/EmpPunishForm/EmpPunishForm';
import {EmpChangePositionForm} from "../forms/empChangePosition/EmpChangePositionForm";
import {EmpDismissalForm} from "../forms/empDismissalForm/EmpDismissalForm";
import {EmpChangeMilitaryTitleForm} from "../forms/empChangeMilitaryTitle/EmpChangeMilitaryTitleForm";
import {CrmUploadDialog} from "../../../../common/widgets/CrmUploadDialog/CrmUploadDialog";
import {CrmApiUrl} from "../../../../common/enums/crm-api-urls.enum";
import {BreadcrumbModel, BreadCrumbService} from '../../breadcrumb/BreadCrumbService';
import {CrmOwnerImage} from 'src/app/common/widgets/CrmOwnerImage/CrmOwnerImage';
import {CrmConfirmDialog} from "../../../../common/widgets/CrmConfirmDialog/CrmConfirmDialog";
import {EmployeeAttachmentDelete} from "../../../../_shared/request/crm/EmployeeAttachmentDelete";
import {EmployeeAttachmentDownload} from "../../../../_shared/request/crm/EmployeeAttachmentDownload";
import {IntegrationChecks} from "../../../../_shared/request/crm/IntegrationChecks";
import {CrmJsonView} from "../../../../common/widgets/CrmJsonView/CrmJsonView";
import {IntegrationAnyCollection} from "../../../models/integration_any_response.entity";
import {CrmAlertDialog} from "../../../../common/widgets/CrmAlertDialog/CrmAlertDialog";
import {CrmAlertDialogTypeError} from "../../../../common/enums/crm-alert-dialog.enum";
import {ApiUrl} from "../../../../_service/util/ApiUrl";
import { EmpPunishRemoveForm } from '../forms/EmpPunishRemoveForm/EmpPunishRemoveForm';
import {CrmJsonViewDialog} from "../../../../common/widgets/CrmJsonViewDialog/CrmJsonViewDialog";
import { EmpLanguageForm } from '../forms/EmpLanguageForm/EmpLanguageForm';
import { EmployeeLanguageDelete } from 'src/app/_shared/request/crm/EmployeeLanguageDelete';

@Component({
  selector: 'employee-detail',
  templateUrl: './EmployeeDetail.html',
  styleUrls: ['./EmployeeDetail.css']
})
export class EmployeeDetail implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute, private cof: COFService, private tabService: TabService, private translate: TranslateService,private breadcrumbs: BreadCrumbService) {
    this.breadcrumbs.setItems([
      new BreadcrumbModel(this.translate.instant('MENU.SEARCH_EMPLOYEE'),'employee/search'),
      new BreadcrumbModel(this.translate.instant('MENU.EMPLOYEE_PAGE')),
    ]);

  }

  @Input() id!: string;
  private sub: any;
  tabGroupKey!:number;

  ngOnInit() {

    this.sub = this.route.params.pipe(
      map((params: Params) => {
        this.id = params['id'];
      }),
      tap(__ => {
        this.getEmployeeData();
        this.tabGroupKey = this.tabService.getKey();
        this.tabService.setTabs(this.tabGroupKey,
          [
            new Tab(EmployeeTemplatePanel, 'EMPLOYEE.ADDRESS_INFORMATION', <DynamicEmployeePanelData> {
              ownerId: this.id,
              request: (new EmpAddressPanel(this.translate)).getRequest(),
              refTablecolumnDefs: (new EmpAddressPanel(this.translate)).getColumnds(this.onRowEdit),
              onAdd: this.saveData,
              showAddbutton: true
            }, EmpTabKey.ADDRESS),
            new Tab(EmployeeTemplatePanel, "EMPLOYEE.AWARD_INFORMATION", <DynamicEmployeePanelData>{
              ownerId: this.id,
              request: (new EmpAwardPanel(this.translate)).getRequest(),
              refTablecolumnDefs: (new EmpAwardPanel(this.translate)).getColumnds(this.onRowEdit),
              onAdd: this.saveData
            }, EmpTabKey.AWARD),
            new Tab(EmployeeTemplatePanel, "EMPLOYEE.PUNISH_INFORMATION", <DynamicEmployeePanelData>{
              ownerId: this.id,
              request: (new EmpPunishPanel(this.translate)).getRequest(),
              refTablecolumnDefs: (new EmpPunishPanel(this.translate)).getColumnds(this.onRowEdit, this.onPunishIssue),
              onAdd: this.saveData
            }, EmpTabKey.PUNISH),
            new Tab(EmployeeTemplatePanel, "EMPLOYEE.EDUCATION", <DynamicEmployeePanelData>{
              ownerId: this.id,
              request: (new EmpEducationPanel(this.translate)).getRequest(),
              refTablecolumnDefs: (new EmpEducationPanel(this.translate)).getColumnds(this.onRowEdit),
              onAdd: this.saveData
            }, EmpTabKey.EDUCATION),
            new Tab(EmployeeTemplatePanel, "EMPLOYEE.EXPERIENCE", <DynamicEmployeePanelData>{
              ownerId: this.id,
              request: (new EmpExperiencePanel(this.translate)).getRequest(),
              refTablecolumnDefs: (new EmpExperiencePanel(this.translate)).getColumnds(this.onRowEdit),
              onAdd: this.saveData
            }, EmpTabKey.EXPERIENCE),
            new Tab(EmployeeTemplatePanel, "EMPLOYEE.MILITARY",<DynamicEmployeePanelData> {
              ownerId: this.id,
              request: (new EmpMilitaryPanel(this.translate)).getRequest(),
              refTablecolumnDefs: (new EmpMilitaryPanel(this.translate)).getColumnds(this.onRowEdit),
              onAdd: this.saveData
            }, EmpTabKey.MILITARY),
            new Tab(EmployeeTemplatePanel, "EMPLOYEE.RELATIVES",<DynamicEmployeePanelData> {
              ownerId: this.id,
              request: (new EmpRelativePanel(this.translate)).getRequest(),
              refTablecolumnDefs: (new EmpRelativePanel(this.translate)).getColumnds(this.onRowEdit),
              onAdd: this.saveData

            }, EmpTabKey.RELATIVE),
            new Tab(AttributeSetupDynamicPanel, "GENERAL.ATTRIBUTES", {
              ownerId: this.id,
              readMode: true,
              ownerType: ObjectOwnerType.EMPLOYEE,
            }, EmpTabKey.ATTRIBUTES),
            new Tab(EmployeeTemplatePanel, "EMPLOYEE.FILES",<DynamicEmployeePanelData> {
              ownerId: this.id,
              request: (new EmployeeFiles(this.translate)).getRequest(),
              refTablecolumnDefs: (new EmployeeFiles(this.translate)).getColumnds(this.onRowEdit, this.onRowDelete, this.onRowDownload),
              onAdd: this.saveData,
            }, EmpTabKey.FILES),
            new Tab(EmployeeTemplatePanel, "EMPLOYEE.KNOWLEDGE_LANGUAGE", {
              ownerId: this.id,
              readMode: true,
              ownerType: ObjectOwnerType.EMPLOYEE,
              request: (new EmployeeLanguages(this.translate)).getRequest(),
              refTablecolumnDefs: (new EmployeeLanguages(this.translate)).getColumnds(this.onRowDelete),
              onAdd: this.saveData
            }, EmpTabKey.LANGUAGES),

          ]

        );

      })
    ).subscribe();
    this.tabService.$tabSub.subscribe(tabs => {
      this.tabs = tabs;
    });
  }

  ngAfterViewInit() { }

  empRequest = new Employee();
  empAttachAddRequest = new EmployeeAttachmentAdd();
  @ViewChild(CrmOwnerImage, { static: true }) avatar!: CrmOwnerImage;
  emp: employeeDto = new employeeDto();
  tabs = new Array<Tab>();
  selectedTabIndex: number = 0;

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.tabService.remove(this.tabGroupKey);
  }

  menuItemsActions = [
    {
      key: 'change-position',
      title: 'EMPLOYEE.CHANGE_POSITION',
      children: [],
      component: EmpChangePositionForm,
    },
    {
      key: 'dismissal',
      title: 'EMPLOYEE.DISMISSAL',
      children: [],
      component: EmpDismissalForm,
    },
    {
      key: 'change-military-title',
      title: 'EMPLOYEE.CHANGE_MILITARY_TITLE',
      children: [],
      component: EmpChangeMilitaryTitleForm,
    }
  ]

  menuItemsCheck = [
    {
      key: 'education',
      title: 'EMPLOYEE.CHECK_EDUCATION',
      url: CrmApiUrl.MINVUZ_GET_DIPLOM
    },
    {
      key: 'property',
      title: 'EMPLOYEE.CHECK_PROPERTY',
      url: CrmApiUrl.TAX_GNK_FIZTAXOBJECTS
    },
    {
      key: 'marriage',
      title: 'EMPLOYEE.CHECK_MARRIAGE',
      url: CrmApiUrl.FXDYO_GET_MARRIAGE_INFO
    }
  ]
  menuItemsPrint = [
    {
      key: 'docx',
      title: 'GENERAL.WORD',
    },
    {
      key: 'pdf',
      title: 'GENERAL.PDF',
    },
  ]

  getComponentByKey(items: any[], key: string): any {
    let selected = null;
    items.forEach(item => {
      if(item.key == key) {
        selected = item;
      }
    });
    return selected;
  }

  selectEventPrints(key: string) {
    let selected = this.getComponentByKey(this.menuItemsPrint, key);
    if(selected) {
      window.open(ApiUrl.API_URL() + '/report/v1/crm/employee/reference/' + this.id + '/' + selected.key, "_blank");
    }
  }
  selectEventActions(key: string) {
    let selected = this.getComponentByKey(this.menuItemsActions, key);
    if(selected) {
      CrmFormDialog.show(selected.title, selected.component, {
        ownerId: this.id,
      }).subscribe(result => {
        if(result)
        this.refreshDetail();
      })
    }
  }
  selectEventCheck(key: string) {
    let selected = this.getComponentByKey(this.menuItemsCheck,key);
    if (selected) {
      let request = new IntegrationChecks(selected.url, this.emp.pinfl);
      firstValueFrom(this.cof.doRequest(request).pipe(
        switchMap(v => {
          let data = <IntegrationAnyCollection>v;
          if (data.status == 200 && data.data.length != 0) {
            CrmJsonViewDialog.show(data.data);
          } else {
            CrmAlertDialog.show('GENERAL.NO_INFORMATION_FOUND', CrmAlertDialogTypeError.WARNING);
          }
          return of();
        }),
        catchError( () => {
          CrmAlertDialog.show('GENERAL.NO_INFORMATION_FOUND', CrmAlertDialogTypeError.WARNING);
          return of();
        })
      ))
    }
  }


  photoUpload() {
    CrmUploadDialog.show('DRIVER.UPLOAD_IMAGE', parseInt(this.id), CrmApiUrl.EMPLOYEE_ATTACHMENT_SAVE, CrmAttachmentTypes.EMPLOYEE_PHOTO).subscribe(result => {
      if (result && result.data) {
        this.avatar.refresh();
      }
    });
  }
  getEmployeeData() {
    this.empRequest.setId(this.id);
    this.empRequest.setCount(1);
    this.cof.doRequest(this.empRequest).subscribe(res => {
      let data = <EmployeeCollection>res;
      if (data && data.total_elements > 0) {
        let row = data.data[0];
        this.emp = {
          name: row.last_name + ' ' + row.first_name + ' ' + row.middle_name,
          position: CommonUtil.getReferenceByTypeId(row.position_id, parseInt(CrmRefType.POSITION)),
          military_title:CommonUtil.getReferenceByTypeId(row.military_title_id, parseInt(CrmRefType.MILITARY_DEGREE)),
          birthDate: <string>DateUtil.formatDate(new Date(row.born_date),'dd/MM/yyyy'),
          nation: CommonUtil.getReferenceByTypeId(row.nationality_id, parseInt(CrmRefType.NATIONALITY)),
          birthPlace: '',
          jetonNumber: row.token_id,
          militaryNumber: row.military_id + '',
          avatar: '',
          pinfl: row.pnfl,
          branch:CommonUtil.getBranchNameById(row.branch_id.toString())
        };
      }
    });
    this.avatar.refresh();
  }


  tabChanged(event: MatTabChangeEvent) {
    this.tabService.activeTabChanged(this.tabGroupKey,event.index);
  }

  removeTab(index: number): void {
    this.tabService.removeTab(this.tabGroupKey,index);
  }

  btnClicked(data: any) {
    let tab: Tab | undefined = this.tabs.find(v => v.active);
    if (data.key == 'add') {
      tab!.tabData.onAdd();
    }
  }

  onRowDelete = (params: any) => {
    let row: any = params.rowData;
    this.deleteRow(row)
  }

  onRowDownload = (params: any) => {
    let row: any = params.rowData;
    let tab: Tab | undefined = this.tabService.getActiveTab(this.tabGroupKey);
    let id = row == null ? '' : <string>StringUtil.toStr(row.id,'');
    if(tab?.key == EmpTabKey.FILES) {
      let request = new EmployeeAttachmentDownload(id);
      firstValueFrom(this.cof.doGetFileRequest(request).pipe(tap(data => {
        let file  = new Blob([data], { type: row.content_type });
        let url = window.URL.createObjectURL(file);
        let link = document.createElement('a');
        link.href = url;
        link.download = row.file_name;
        link.click();
        link.remove();
      })));
    }
  }

  async deleteRow(row: any) {
    let tab: Tab | undefined = this.tabService.getActiveTab(this.tabGroupKey);
    let id = row == null ? '' : <string>StringUtil.toStr(row.id,'');
    if(id) {
      let needDelete: boolean = await firstValueFrom(CrmConfirmDialog.show('GENERAL.ARE_YOU_SURE_YOU_WANT_DELETE_THIS_ITEM'));
      if (needDelete) {
        let deleteRequest: any = this.getDeleteRequest(tab?.key, id);
        firstValueFrom(this.cof.doRequest(deleteRequest).pipe(tap(res => {
          this.tabService.refreshActiveTab(this.tabGroupKey);
        })));
      }
    }
  }

  getDeleteRequest(key: string | undefined, id: string) {
    let request: any;
    switch (key) {
      case EmpTabKey.FILES:
        request = new EmployeeAttachmentDelete(id);
        break;
      case EmpTabKey.LANGUAGES:
        request = new EmployeeLanguageDelete(id);
        break;
    }

    return request;
  }


  onRowEdit = (params: any) => {
    let row: any = params.rowData;
    this.saveData(row)
  }

  onPunishIssue = async (params: any) => {
    let row: any = params.rowData;
    let rowParams:IDialogPersonFormData ={
      id: row == null ? '' : <string>StringUtil.toStr(row.id,'')  ,
      ownerId: this.id,
      ownerType:ObjectOwnerType.EMPLOYEE
    }

    let needRefresh: boolean = await firstValueFrom(CrmFormDialog.show('EMPLOYEE.PUNISH_REMOVE', EmpPunishRemoveForm, rowParams));
    if (needRefresh) {
      this.refreshDetail(false);
    }
  }

  getFormParams(key: string | undefined) {
    let formParams: any;
    switch (key) {
      case EmpTabKey.ADDRESS:
        formParams = {
          title: 'EMPLOYEE.ADDRESS_SAVE_TITLE',
          component: EmpAddressForm
        };
        break;
      case EmpTabKey.AWARD:
        formParams = {
          title: 'EMPLOYEE.AWARD_SAVE_TITLE',
          component: EmpAwardForm
        };
        break;
      case EmpTabKey.EDUCATION:
        formParams = {
          title: 'EMPLOYEE.EDUCATION_SAVE_TITLE',
          component: EmpEducationForm
        }
        break;
      case EmpTabKey.EXPERIENCE:
        formParams = {
          title: 'EMPLOYEE.EXPERIENCE_SAVE_TITLE',
          component: EmpExperienceForm
        }
        break;
      case EmpTabKey.MILITARY:
        formParams = {
          title: 'EMPLOYEE.MILITARY_SAVE_TITLE',
          component: EmpMilitaryForm
        }
        break;
      case EmpTabKey.RELATIVE:
        formParams = {
          title: 'EMPLOYEE.RELATIVE_SAVE_TITLE',
          component: EmpRelativeForm
        }
        break;
        case EmpTabKey.PUNISH:
          formParams = {
            title: 'EMPLOYEE.PUNISH_SAVE_TITLE',
            component: EmpPunishForm
          }
          break;
        case EmpTabKey.FILES:
          formParams = {
            title: 'EMPLOYEE.PUNISH_SAVE_TITLE',
            component: EmpPunishForm
          }
          break;
        case EmpTabKey.LANGUAGES:
          formParams = {
            title: 'EMPLOYEE.LANGUAGE_SAVE_TITLE',
            component: EmpLanguageForm
          }
          break;
      }
    return formParams;
  }

  saveData = async (row: any | null = null) => {
    let tab: Tab | undefined = this.tabService.getActiveTab(this.tabGroupKey);
    let formParams: any = this.getFormParams(tab?.key);

    let params:IDialogPersonFormData ={
      id: row == null ? '' : <string>StringUtil.toStr(row.id,'')  ,
      ownerId: this.id,
      ownerType:ObjectOwnerType.EMPLOYEE
    }
    if(tab?.key == EmpTabKey.ADDRESS){
      (<IDialogAddressFormData>params).typeId = ( row !== null ? row.type_id : null);
    }
    if(tab?.key == EmpTabKey.FILES) {
      CrmUploadDialog.show('DRIVER.UPLOAD_IMAGE', parseInt(this.id), CrmApiUrl.EMPLOYEE_ATTACHMENT_SAVE, CrmAttachmentTypes.EMPLOYEE_FILES).subscribe(result => {
        if (result && result.data) {
          this.tabService.refreshActiveTab(this.tabGroupKey);
        }
      });
    }
    else {
      let needRefresh: boolean = await firstValueFrom(CrmFormDialog.show(formParams.title, formParams.component, params));
      if (needRefresh) {
        this.refreshDetail(false);
      }
    }
  }

  public refreshDetail(isFull = true) {
    this.getEmployeeData();
    if(isFull)
      this.tabService.refreshAll(this.tabGroupKey);
    else
    this.tabService.refreshActiveTab(this.tabGroupKey);
  }

  openEdit() {
    const dialogCloseObser = CrmEmpAddDialog.show(this.id);
    dialogCloseObser.subscribe(res => {
      if (res) {
        this.refreshDetail();
      }
    })
  }
}

export class employeeDto {
  name!: string;
  position!: string;
  military_title!:string;
  birthDate!: string;
  nation!: string;
  birthPlace!: string;
  jetonNumber!: string;
  militaryNumber!: string;
  avatar!: string;
  pinfl!: string;
  branch!:string;
}

export enum EmpTabKey {
  ADDRESS = 'address',
  AWARD = 'award',
  PUNISH = 'punish',
  EDUCATION = 'education',
  EXPERIENCE = 'experince',
  MILITARY = 'military',
  RELATIVE = 'relative',
  ATTRIBUTES = 'attributes',
  FILES = 'files',
  LANGUAGES = 'languages'
}
