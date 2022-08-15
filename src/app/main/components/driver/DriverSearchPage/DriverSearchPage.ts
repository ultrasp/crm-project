import {
  AfterContentInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import {
  ColDef, RowClassParams
} from "ag-grid-community";
import {
  FormControl,
  FormGroup
} from "@angular/forms";
import {
  AgGridBean
} from "../../../../common/widgets/DataGrid/AgGridBean";
import {
  CrmBranch
} from "../../../../common/widgets/CrmBranch/CrmBranch";
import {
  Router
} from "@angular/router";
import {
  MatDialog
} from "@angular/material/dialog";
import {
  CommonUtil
} from "../../../../_service/util/CommonUtil";
import {
  StringUtil
} from "../../../../_service/util/StringUtil";
import {
  CrmRefType
} from "src/app/common/enums/crm-ref-type.enum";
import {
  DateUtil
} from "../../../../_service/util/DateUtil";
import {
  TranslateService
} from "@ngx-translate/core";
import {
  DriverSearch
} from "src/app/_shared/request/crm/DriverSearch";
import { Reference } from "src/app/_shared/request/crm/Reference";
import { DriverAddComponent } from "../driver-add/driver-add.component";
import { DriverAddDialog } from "../driver-add/driverAddDialog";
import { IConvertedMipData, MipData } from "src/app/main/models/mip.entity";
import { Address } from "src/app/_shared/request/crm/Address";
import { AddressType } from "src/app/common/enums/address-type.enum";
import { BreadcrumbModel, BreadCrumbService } from "../../breadcrumb/BreadCrumbService";
import { DriverCategoryUtil } from "../DriverDetail/DriverCategoryUtil";
import { SessionInfoService } from "../../services/session-info.service";
import { CrmPersonDataPasport } from "src/app/common/widgets/CrmPersonDataPasport/CrmPersonDataPasport";
import { CloseValuesEvents } from "src/app/common/widgets/CrmPersonDataPnfl/CrmPersonDataPnfl";
import { CrmDriverCertificateStateEnum } from "src/app/common/enums/crm-driver-certificate-state.enum";
import { eventItem, IMultiTabComponent } from "../../MultiTab/IMultiTabComponent";
import { ComponentKeyNames } from "../../MultiTab/MultiTab";

@Component({
  selector: 'crm-driver-search',
  templateUrl: './DriverSearchPage.html',
  styleUrls: ['./DriverSearchPage.css'],
})
export class DriverSearchPage implements OnInit,IMultiTabComponent {
  constructor(private router: Router, private dialog: MatDialog, private translate: TranslateService,private breadcrumbs: BreadCrumbService, public sessionInfoSvc: SessionInfoService) {
  }

  tableContainer: any;
  ngOnInit(): void {
    if(!this.isTab){
      let breadcrumbMenu:BreadcrumbModel[] =[
        new BreadcrumbModel(this.translate.instant('DRIVER.SEARCH_FORM_TITLE'))
      ]
      this.breadcrumbs.setItems(breadcrumbMenu);
    }

  }

  @Input() isTab:boolean = false;
  @Output() openTabComponent:EventEmitter<eventItem> = new EventEmitter()

  form: FormGroup = new FormGroup({

    own_number: new FormControl(),
    fromBornDate: new FormControl(null),
    toBornDate: new FormControl(null),
    pasport: new FormControl(null),
    lastname: new FormControl(null),
    firstname: new FormControl(null),
    middleName: new FormControl(null),
    sex:new FormControl(null),
    driverLicense:new FormControl(null),
    fromStopedData:new FormControl(null),
    toStopedData:new FormControl(null),
    pnfl:new FormControl(null),
    state:new FormControl(),
    region:new FormControl(),
    city:new FormControl(),
    certificate_state:new FormControl()
  });

  refTableColumnDefs: ColDef[] = [{
      field: 'id',
      headerName: 'DRIVER.OWN_NUMBER',
      resizable: true,
    },
    {
      field: 'last_name&first_name&middle_name',
      headerName: 'DRIVER.FULLNAME',
      resizable: true,
      valueGetter: params => { return (params.data) ?  params.data.last_name + ' ' + params.data.first_name+' '+ params.data.middle_name: ''},
      width:600
    },
    {
      field: 'born_date',
      headerName: 'GENERAL.BORN_DATE',
      resizable: true,
      cellRenderer: params =>( (params.value) ? DateUtil.formatDate(params.value) + '' : ''),
    },
    {
      field: 'status',
      headerName: 'DRIVER.STATUS',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value,parseInt(CrmRefType.DRIVER_STATE))
    },
    {
      field: 'certificate_state',
      headerName: 'DRIVER.CERTIFICATE_STATUS',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.DRIVER_CERTIFICATE_STATE))
    },
    
    {
      field: 'sex_id',
      headerName: 'GENERAL.SEX',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, CrmRefType.GENDER)
    },
    {
      field: 'passport_number',
      headerName: 'GENERAL.PASPORT',
      resizable: true,
    },
    {
      field: 'certificate_flag',
      headerName: 'GENERAL.CATEGORY',
      resizable: true,
      cellRenderer: params => DriverCategoryUtil.getText(params.value)
    },
    {
      field: 'certificate_issue_date',
      headerName: 'GENERAL.ISSUE_DATE',
      resizable: true,
      cellRenderer: params => ( (params.value) ? DateUtil.formatDate(params.value) + '' : ''),
    },
  ];

  pageSize =12;
  requestDrivers = new DriverSearch();
  rowClassRules = {
    "bg-color-red": (params: RowClassParams) => {
      return params.data?.certificate_state === CrmDriverCertificateStateEnum.DEPRIVED;
    }
  }

  @ViewChild(AgGridBean, {
    static: true
  }) dataGrid!: AgGridBean;
  @ViewChild(CrmBranch, {
    static: true
  }) branch!: CrmBranch;

  gridSelectEvent(event: any) {
    if(this.sessionInfoSvc.hasAccess('dr_view')){
      if(!this.isTab){
        this.router.navigate(['/driver/detail/', event.id]);
      }else{
        this.openTabComponent.emit({
          component:ComponentKeyNames.TDriverDetail,
          inputData:{
            id:event.id
          }
        })
      }
    }
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key == 'F7'){
      this.getList()
      // setTimeout(() => this.getList())
    }
  }


  getList() {


    this.requestDrivers.setId(<string>StringUtil.toStr(this.form.get('own_number')!.value, null));
    this.requestDrivers.setFromBornDate(<string>DateUtil.formatDateToServer(this.form.get('fromBornDate')!.value));
    this.requestDrivers.setToBornDate(<string>DateUtil.formatDateToServer(this.form.get('toBornDate')!.value));

    this.requestDrivers.last_name = <string>StringUtil.toStr(this.form.get('lastname')!.value, null);
    this.requestDrivers.first_name = <string>StringUtil.toStr(this.form.get('firstname')!.value, null);
    this.requestDrivers.middle_name = <string>StringUtil.toStr(this.form.get('middleName')!.value, null);

    this.requestDrivers.sex_id = <string>StringUtil.toStr(this.form.get('sex')!.value, null);


    this.requestDrivers.pnfl =  <string>StringUtil.toStr(this.form.get('pnfl')!.value, null);
    this.requestDrivers.from_deprivation = <string>StringUtil.toStr(this.form.get('fromStopedData')!.value);
    this.requestDrivers.to_deprivation = <string>StringUtil.toStr(this.form.get('toStopedData')!.value);

    this.requestDrivers.passport_number = <string>StringUtil.toStr(this.form.get('pasport')!.value,null);
    this.requestDrivers.certificate_number = <string>StringUtil.toStr(this.form.get('driverLicense')!.value,null);
    this.requestDrivers.certificate_state = <number>this.form.get('certificate_state')?.value;
    this.requestDrivers.pnfl = <string>StringUtil.toStr(this.form.get('pnfl')!.value,null);

    this.requestDrivers.statuses = this.form.get('state')!.value || [];
    this.requestDrivers.region_id =  <string>StringUtil.toStr(this.form.get('region')!.value,null);
    this.requestDrivers.city_id =  <string>StringUtil.toStr(this.form.get('city')!.value,null);
    if (this.dataGrid) {
      this.dataGrid.reloadGrid();
    }
  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl!.status == 'INVALID' && formControl!.touched;
  }

  genderParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.GENDER);
    return;
  }

  stateParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.DRIVER_STATE);
    return;
  }

  certificateStateParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.DRIVER_CERTIFICATE_STATE);
    return;
  }

  setRegionParam = (request:Address):void =>{
    request.setType(AddressType.REGION);
  }

  setCityParam = (request: Address): void => {
    request.setType(AddressType.CITY);
    if (this.form.get('region')?.value !== undefined)
      request.setParentId((this.form.get('region')?.value) ? this.form.get('region')?.value : '-1');
    else
      request.setParentId('-1');
    return;
  }

  openForm() {

    CrmPersonDataPasport.openDialog('', true).subscribe((result) => {
      if (result && !!result) {
        if(result == CloseValuesEvents.AddNewCitizen) {
          DriverAddDialog.open('', true).subscribe(v => {
            if(v)
              this.dataGrid.reloadGrid();
          });
        }
        else {
          let $observer = DriverAddDialog.openFromMip(result.data, result.address);
          $observer.subscribe( v => {
            if(v){
              this.dataGrid.reloadGrid();
            }
          })
        }
      }
    });
  }
  resetForm(){
    this.form.reset();
  }

}
