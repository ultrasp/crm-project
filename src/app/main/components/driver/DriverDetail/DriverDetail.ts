import {AfterViewInit, Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject, firstValueFrom, map, merge, mergeMap, of, switchMap, tap} from 'rxjs';
import {Tab} from 'src/app/common/widgets/CrmDynamicTab/TabModel';
import {TabService} from 'src/app/common/widgets/CrmDynamicTab/TabService';
import {CrmFormDialog} from 'src/app/common/widgets/CrmFormDialog/CrmFormDialog';
import {COFService} from 'src/app/_service/COFService';
import {DateUtil} from "../../../../_service/util/DateUtil";
import {CommonUtil} from "../../../../_service/util/CommonUtil";
import {CrmRefType} from "../../../../common/enums/crm-ref-type.enum";
import {AttributeSetupDynamicPanel} from 'src/app/common/widgets/AttributeSetupPanel/AttributeSetupDynamicPanel';
import {Driver} from 'src/app/_shared/request/crm/Driver';
import {IDriverCollection} from 'src/app/main/models/driver.entity';
import {EmpAddressForm} from '../../employee/forms/EmpAddress/EmpAddressForm';
import {ObjectOwnerType} from 'src/app/common/enums/object-owner-type.enum';
import {
  DynamicEmployeePanelData,
  EmployeeTemplatePanel
} from '../../employee/EmployeeTemplatePanel/EmployeeTemplatePanel';
import {DriverAddressPanel, DriverCarList, DriverCertificatHistory, DriverCheckPanel, DriverDocumentPanel} from './DriverPanelConfig';
import {IDialogAddressFormData, IDialogPersonFormData} from '../../employee/forms/IPersonFormInput';
import {StringUtil} from 'src/app/_service/util/StringUtil';
import {CrmAttachmentTypes} from 'src/app/common/enums/crm-attachement-types.enum';
import {DriverAddDialog} from '../driver-add/driverAddDialog';
import {PersonDocumentForm} from '../forms/PersonDocumentForm/PersonDocumentForm';
import {
  DriverDocumentWrapperComponent,
  DriverDocumentWrapperData
} from '../driver-add/driver-document/DriverDocumentWrapperComponent';
import {CrmUploadDialog} from "../../../../common/widgets/CrmUploadDialog/CrmUploadDialog";
import { DriverPrintDialog } from './DriverPrintDialog/DriverPrintDialog';
import {AuditListForm} from "../forms/AuditListForm/AuditListForm";
import {DriverDepriveForm} from "../forms/DepriveForm/DriverDepriveForm";
import {CrmApiUrl} from "../../../../common/enums/crm-api-urls.enum";
import { BreadcrumbModel, BreadCrumbService } from '../../breadcrumb/BreadCrumbService';
import {DriverCertificate} from "../../../../_shared/request/crm/DriverCertificate";
import {IDriverCertificateCollection} from "../../../models/driver-certificate.entity";
import {DriverCheckForm} from "../forms/CheckForm/DriverCheckForm";
import { CrmOwnerImage } from 'src/app/common/widgets/CrmOwnerImage/CrmOwnerImage';
import { SystemDefault } from 'src/app/common/enums/system-defaults.enum';
import { CertificateState } from 'src/app/common/enums/certificate-state.enum';
import { DriverSearch } from 'src/app/_shared/request/crm/DriverSearch';
import { IDriverSearch } from 'src/app/main/models/driver-search.entity';
import { DriverCertificateLast } from 'src/app/_shared/request/crm/DriverCertificateLast';
import { ICertificateLast, ICertificateLastData } from 'src/app/main/models/certificate-last.entity';
import { CrmSignDialog } from 'src/app/common/widgets/CrmSignDialog/CrmSignDialog';
import {CrmDriverImageDialog} from "../../../../common/widgets/CrmDriverImageDialog/CrmDriverImageDialog";
import { Country } from 'src/app/_shared/request/crm/Country';
import {DriverCertHistoryForm} from "../forms/DriverCertHistoryForm/DriverCertHistoryForm";
import { IMultiTabComponent } from '../../MultiTab/IMultiTabComponent';

@Component({
  selector: 'driver-detail',
  templateUrl: './DriverDetail.html',
  styleUrls: ['./DriverDetail.css']
})
export class DriverDetail implements OnInit, AfterViewInit,IMultiTabComponent {

  constructor(private route: ActivatedRoute, private cof: COFService, private tabService: TabService, private translate: TranslateService,private breadcrumbs: BreadCrumbService,
    private router: Router) {

  }

  certificateState = false;
  @Input() id!: string;
  private sub: any;
  @ViewChild('avatar', { static: true }) avatarComponent!: CrmOwnerImage;
  @ViewChild('sign', { static: true }) signComponent!: CrmOwnerImage;
  getRequest = new Driver();
  person: personDto = new personDto();
  tabs = new Array < Tab > ();
  selectedTabIndex:number = 0;
  ownerType:ObjectOwnerType = ObjectOwnerType.DRIVER;
  ownerAvatarType:string = CrmAttachmentTypes.DRIVER_PHOTO + '';
  ownerSIGNType:string = CrmAttachmentTypes.DRIVER_SIGNATURE + '';
  $refreshDetail = new BehaviorSubject(null);
  hasActiveCertificate = false;
  canAddCertificate = false;
  hasStopedCertificate = false;

  @Input() isTab:boolean = false;
  // @Output() openTabComponent:EventEmitter<eventItem> = new EventEmitter()
  tabGroupKey!:number;
  ngOnInit() {

    if(!this.isTab){
      let breadcrumbMenu:BreadcrumbModel[] =[
        new BreadcrumbModel(this.translate.instant('DRIVER.SEARCH_FORM_TITLE'),'driver/search'),
        new BreadcrumbModel(this.translate.instant('DRIVER.DRIVER_DETAIL_PAGE')),
      ]
      this.breadcrumbs.setItems(breadcrumbMenu);
    }

    this.sub = merge(this.route.params).pipe(
      map((params: Params) => {
        this.id = !this.isTab ? params['id'] : this.id;
      }),
      switchMap( () => this.$refreshDetail),
      switchMap( ()=> this.getData()),
      tap(__ => {
        this.tabGroupKey = this.tabService.getKey();
        this.tabService.setTabs(this.tabGroupKey,
          [
            new Tab(DriverDocumentWrapperComponent, 'GENERAL.CATEGORY', <DriverDocumentWrapperData>{
              driver_id: this.id,
              readonly:true,
              isSetOwnerValue:true
            }, DriverTabKey.CATEGORY),
            new Tab(EmployeeTemplatePanel, 'GENERAL.DOCUMENTS', <DynamicEmployeePanelData>{
              ownerId: this.id,
              request: (new DriverDocumentPanel(this.translate)).getRequest(),
              refTablecolumnDefs: (new DriverDocumentPanel(this.translate)).getColumnds(this.onRowEdit),
              onAdd: this.saveData,
              showAddbutton:true
            }, DriverTabKey.DOCUMENTS),
            new Tab(EmployeeTemplatePanel, 'EMPLOYEE.ADDRESS_INFORMATION', <DynamicEmployeePanelData>{
              ownerId: this.id,
              request: (new DriverAddressPanel(this.translate)).getRequest(),
              refTablecolumnDefs: (new DriverAddressPanel(this.translate)).getColumnds(this.onRowEdit),
              onAdd: this.saveData,
              showAddbutton:true
            }, DriverTabKey.ADDRESS),
            new Tab(AttributeSetupDynamicPanel, "GENERAL.ATTRIBUTES", {
              ownerId: this.id,
              readMode: true,
              ownerType:ObjectOwnerType.DRIVER
            }, DriverTabKey.ATTRIBUTES),
            new Tab(EmployeeTemplatePanel, 'DRIVER.INSPECTION_RESULTS', <DynamicEmployeePanelData>{
              ownerId: this.id,
              request: (new DriverCheckPanel(this.translate)).getRequest(),
              refTablecolumnDefs: (new DriverCheckPanel(this.translate)).getColumnds(this.onRowEdit),
              showAddbutton: false
            }, DriverTabKey.CHECK),
            new Tab(EmployeeTemplatePanel, 'DRIVER.CAR_LIST', <DynamicEmployeePanelData>{
              ownerId: this.person.pnfl,
              request: (new DriverCarList(this.translate)).getRequest(),
              refTablecolumnDefs: (new DriverCarList(this.translate)).getColumnds(),
              showAddbutton: false
            }, DriverTabKey.CARS),
            new Tab(EmployeeTemplatePanel, 'DRIVER.CERTIFICAT_LIST', <DynamicEmployeePanelData>{
              ownerId: this.id,
              request: (new DriverCertificatHistory(this.translate)).getRequest(),
              refTablecolumnDefs: (new DriverCertificatHistory(this.translate)).getColumnds(),
              onAdd: this.saveData,
              showAddbutton: true
            }, DriverTabKey.CERTIFICATES),
          ],this.selectedTabIndex

        );

      })
    ).subscribe();
    this.tabService.$tabSub.subscribe(tabs => {
      this.tabs = tabs;
    });
  }

  ngAfterViewInit() {}


  ngOnDestroy() {
    this.sub.unsubscribe();
    this.tabService.remove(this.tabGroupKey);
  }

  clearData(){
    this.hasActiveCertificate = false;
    this.canAddCertificate = false;
    this.person = {
        kod:'',
        fullName: '',
        gender: '',
        status: '',
        birthDate: '',
        birthPlace: '',
        avatar:null,
        pnfl: '',
        certificate: '',
        depriveButton: false,
      };
   }

  getData() {
    this.clearData();

    this.getRequest.setId(this.id);
    this.getRequest.setCount(1);
    return this.cof.doRequest(this.getRequest).pipe(tap(async res =>{
      let data = < IDriverCollection > res;
      if (data && data.total_elements > 0) {
        let row = data.data[0];
        this.person = {
          kod:row.id,
          fullName: row.last_name + ' ' +row.first_name + ' ' + row.middle_name,
          gender: CommonUtil.getReferenceByTypeId(row.sex_id,CrmRefType.GENDER),
          status: CommonUtil.getReferenceByTypeId(row.status,parseInt(CrmRefType.DRIVER_STATE)),
          birthDate: DateUtil.formatDate(new Date(row.born_date)),
          birthPlace: CommonUtil.getReferenceByTypeId( parseInt(row.born_country_id),parseInt(CrmRefType.CITIZENSHIP)),
          avatar:null,
          pnfl: row.pnfl == null ? '-1': row.pnfl,
          certificate: '',
          depriveButton: false,
        };
        if(row.born_country_id){
          let  countryRequest = new Country()
          countryRequest.setCount(1);
          countryRequest.id = row.born_country_id + '';
          let res = await firstValueFrom(this.cof.doRequest(countryRequest))
          if(res){
            let data = (<any> res).data;
            if(data.length > 0 ){
              this.person.birthPlace = data[0].name;
            }
          }
        }
      }else{
        this.router.navigate(['/driver/search/']);
      }
      this.checkCertState();
      this.avatarComponent.refresh();
      this.signComponent.refresh();
    }));
  }


  tabChanged(event: MatTabChangeEvent) {
    this.tabService.activeTabChanged(this.tabGroupKey,event.index);
    this.selectedTabIndex = event.index;
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


  onRowEdit = (params: any) => {
    let row: any = params.rowData;
    this.saveData(row)
  }

  getFormParams(key: string | undefined) {
    let formParams: any;
    switch (key) {
      case DriverTabKey.ADDRESS:
        formParams = {
          title: 'EMPLOYEE.ADDRESS_SAVE_TITLE',
          component: EmpAddressForm
        };
        break;
        case DriverTabKey.DOCUMENTS:
          formParams = {
            title: 'EMPLOYEE.DOCUMENTS_SAVE_TITLE',
            component: PersonDocumentForm
          };
          break;
          case DriverTabKey.CHECK:
          formParams = {
            title: 'DRIVER.ADD_INSPECTION_RESULT',
            component: DriverCheckForm
          };
          break;
          case DriverTabKey.CERTIFICATES:
          formParams = {
            title: 'DRIVER.ADD_CERTIFICATION_HISTORY',
            component: DriverCertHistoryForm
          };
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
      ownerType:ObjectOwnerType.DRIVER
    }
    if(tab?.key == DriverTabKey.ADDRESS){
      (<IDialogAddressFormData>params).typeId = ( row !== null ? row.type_id : null);
    }
    if(tab?.key == DriverTabKey.DOCUMENTS){
      (<IDialogAddressFormData>params).typeId = ( row !== null ? row.type_id : null);
    }
    let needRefresh: boolean = await firstValueFrom(CrmFormDialog.show(formParams.title, formParams.component, params));
    if (needRefresh) {
      this.tabService.refreshActiveTab(this.tabGroupKey);
    }
  }

  public refreshDetail() {
    this.$refreshDetail.next(null);
  }

  openEdit(){
    const dialogCloseObser  = DriverAddDialog.open(this.id);
    dialogCloseObser.subscribe(res =>{
      if(res){
        this.refreshDetail();
      }
    })
  }

  photoUpload() {
    CrmDriverImageDialog.show('DRIVER.UPLOAD_IMAGE', parseInt(this.id), CrmApiUrl.ATTACHMENT_DRIVER_SAVE, CrmAttachmentTypes.DRIVER_PHOTO).subscribe(result => {
      if (result) {
        this.avatarComponent.refresh();
      }
    });
  }

  signUpload() {
    CrmSignDialog.show('DRIVER.UPLOAD_SIGNATURE',this.id).subscribe(result=>{
      console.log(result && result.data,result , result.data,'result && result.data sign')
      if (result) {
        this.refreshDetail();
      }
    })
  }

  printDetails() {
    DriverPrintDialog.show(this.id).subscribe(res => {
      if(res){
        this.refreshDetail();
      }
    })
  }
  openAudit() {
    AuditListForm.show(this.id);
  }

  openDriverCerf() {
    CrmFormDialog.show('GENERAL.CATEGORY', DriverDocumentWrapperComponent, <DriverDocumentWrapperData>{
      driver_id: this.id,
      readonly: false,
      isSetOwnerValue:false
    }).subscribe(result => {
      if(result) {
        this.refreshDetail();
      }
    });
  }

  doDeprive() {
    DriverDepriveForm.show(this.id).subscribe(result => {
      if(result) {
        this.refreshDetail();
      }
    });
  }

  doActiveStoped(){
    DriverDepriveForm.show(this.id,false).subscribe(result => {
      if(result) {
        this.refreshDetail();
      }
    });

  }

  doNewCertificate(){
    CrmFormDialog.show('GENERAL.CATEGORY', DriverDocumentWrapperComponent, <DriverDocumentWrapperData>{
      driver_id: this.id,
      readonly: false,
      isSetOwnerValue:true
    }).subscribe(result => {
      if(result) {
        this.refreshDetail();
      }
    });

  }

  async checkCertState() {
    let request = new DriverCertificateLast();
    request.driver_id  = this.id;
    request.setCount(1);
    this.hasStopedCertificate = false;
    this.hasActiveCertificate = false;
    this.canAddCertificate = false;
    let result: any = await firstValueFrom(this.cof.doRequest(request));
    if(result && result.data) {
      let data: ICertificateLastData = result;
      if(data) {
        let cert = data.data;
        if(cert.state_id == parseInt(CertificateState.ACTIVE)){
          this.hasActiveCertificate = true;
        }
        if(cert.state_id == parseInt(CertificateState.STOPED)){
          this.hasStopedCertificate = true;
        }

        if(cert.state_id == parseInt(CertificateState.CLOSED)){
          this.canAddCertificate = true;
        }
      }
    }
  }
}

export class personDto {
  kod!:string;
  fullName!: string;
  gender!: string;
  status!: string;
  birthDate!: string |  null;
  birthPlace!: string;
  avatar!:string | null
  pnfl!:string;
  certificate!:string;
  depriveButton!: boolean;
}

export enum DriverTabKey {
  CATEGORY = 'category',
  DOCUMENTS = 'document',
  PASPORT = 'pasport',
  ADDRESS = 'address',
  ATTRIBUTES = 'attributes',
  CHECK = 'check',
  CARS = 'cars',
  CERTIFICATES = 'certificates'
}
