import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {LoadListSrvice} from "../../../../../common/services/LoadListSrvice";
import {BehaviorSubject, firstValueFrom, Observable, ObservableInput, of} from "rxjs";
import {Reference} from "../../../../../_shared/request/crm/Reference";
import {CrmRefType} from "../../../../../common/enums/crm-ref-type.enum";
import {COFService} from "../../../../../_service/COFService";
import {ObjectOwnerType} from "../../../../../common/enums/object-owner-type.enum";
import {EmployeeDocumentSave} from "../../../../../_shared/request/crm/EmployeeDocumentSave";
import {DriverDocumentSave} from "../../../../../_shared/request/crm/DriverDocumentSave";
import {merge} from "rxjs";
import { RequestClassKey } from "src/app/_shared/request/crm/RequestList";
import { DriverCertificate } from "src/app/_shared/request/crm/DriverCertificate";
import { IDriverCertificate, IDriverCertificateCollection } from "src/app/main/models/driver-certificate.entity";
import { DriverCategorySave } from "src/app/_shared/request/crm/DriverCategorySave";
import { DriverCertificateSave } from "src/app/_shared/request/crm/DriverCertificateSave";
import { CrmDriverCategoryEnum } from "src/app/common/enums/crm-driver-category.enum";
import { DriverCategoryUtil } from "../../DriverDetail/DriverCategoryUtil";
import { SystemDefault } from "src/app/common/enums/system-defaults.enum";
import { SessionInfoService } from "../../../services/session-info.service";
import { CertificateState } from "src/app/common/enums/certificate-state.enum";
import { DriverSearch } from "src/app/_shared/request/crm/DriverSearch";
import { IDriverInfo, IDriverSearch } from "src/app/main/models/driver-search.entity";
import { DriverCertificateLast } from "src/app/_shared/request/crm/DriverCertificateLast";
import { ICertificateLast, ICertificateLastData } from "src/app/main/models/certificate-last.entity";
import { AttributeInfoService } from "../../../services/attribute-info.service";
import { AttributeParamConfig } from "src/app/common/widgets/AttributeSetupPanel/AttributeParam/AttributeParamConfig";
import { DateUtil } from "src/app/_service/util/DateUtil";

@Component({
  selector: 'app-driver-document',
  templateUrl: './driver-document.component.html',
  styleUrls: ['./driver-document.component.css']
})
export class DriverDocumentComponent implements OnInit {

  constructor(private loader: LoadListSrvice, private cof: COFService, private fb: FormBuilder, private session:SessionInfoService,private attributeService: AttributeInfoService) {
  }

  lisenceCategories = this.fb.array([]);
  dataSource: BehaviorSubject<AbstractControl[]> = new BehaviorSubject<AbstractControl[]>([]);
  @ViewChild(MatTable) table!: MatTable<any>;
  @Input() form!: FormGroup;
  @Input() ownerId!: string;
  @Input() readonly: boolean = false;
  @Input() isHistoryFormShow: boolean = false;
  @Input() isRequired: boolean = true;
  @Input() isSetOwnerValue:boolean = true;
  @Output() onItemDataLoaded:EventEmitter<ICertificateLast> = new EventEmitter();
  selection = new SelectionModel<any>(true, []);
  savedCagetories: [] = [];
  ngOnInit(): void {
    this.loadList();
  }
  docNum!:string;

  get categories() {
    return this.form.controls["categories"] as FormArray;
  }

  driverCategoryParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.DRIVER_CATEGORY);
    return;
  }

  categoryReasonParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.DRIVER_CATEGORY_REASON);
    return;
  }

  isSelectedNotFirstTime() {
    return this.form.get('categoryReason_id')?.value && this.form.get('categoryReason_id')?.value != '1'
  }

  async loadList() {
    let catKeys = DriverCategoryUtil.getKeys();
    catKeys.forEach(title => {
      const row = this.fb.group({
        checked: [false, []],
        key: DriverCategoryUtil.getKeyValue(title),
        title: title
      });
      this.categories.push(row);
    });
    this.dataSource.next(this.categories.controls);
    if(this.ownerId && this.isSetOwnerValue) {
      this.getOwnerValues();
      this.getCatDateEnds();
    }
  }

  public certDates = new Map<string,Date>()

  async getCatDateEnds(){
    if(this.ownerId){
      let ownerType = ObjectOwnerType.DRIVER;
      let attrValues:AttributeParamConfig[] = await firstValueFrom(this.attributeService.getAttrListWithVal(this.ownerId,ownerType));
      let keys: string[] =[
      ]
      attrValues.forEach(v=>{
        if ((<string[]>Object.values(CertAttrKeys)).includes(v.name) && v.dataValue && v.dataValue != '' ) {
          const date = v.dataValue && v.dataValue.indexOf('.') ? DateUtil.parseDateFromString(v.dataValue,'DD.MM.YYYY') : new Date(v.dataValue)
          if(date)
          this.certDates.set(v.name.substring(0,v.name.indexOf('_')).toUpperCase(),date);
        }
      })
    }

  }

  async getOwnerValues() {

    let request = new DriverCertificateLast();
    request.driver_id  = this.ownerId;
    request.setCount(1);

    let value: any[] = [];

    let result: any = await firstValueFrom(this.cof.doRequest(request));
    if(result && result.data) {
      let data: ICertificateLastData = result;
      if(data.data) {
        let cert = data.data;
        this.docNum = cert.document_number;
        this.form.patchValue({
          categoryStartDate: cert.given_date,
          categoryEndDate: cert.issue_date,
          categoryReason_id: cert.reason_id,
        });

        this.categories.value.forEach((category: any) => {
          if(category.key & cert.flag){
            this.certDates.set(category.title,new Date(cert.given_date));
          }
          value.push({
            checked: (category.key & cert.flag) ? true : false,
          })
        });
        this.onItemDataLoaded.emit(cert);
      }
    }

    this.categories.patchValue(value);

  }


  prepareSaveRequest() {
    let request = new DriverCertificateSave();
    request.setDriverId(this.ownerId);
    request.setStartDate(this.form.get('categoryStartDate')?.value);
    request.setEndDate(this.form.get('categoryEndDate')?.value);
    request.setFlag(this.getFlagValue());
    request.reason_id = this.form.get('categoryReason_id')?.value
    request.branch_id = this.session.getSesionInfo().data?.user_info.branch_id + '';
    return request;
  }

  getFlagValue() {
    let flag= 0;
    this.categories.value.forEach((result: any) => {
      if (result && result.checked) {
        flag = flag | result.key ;
      }
    })
    return flag;
  }

  save(): Observable<Object> {
    return (this.readonly ? of() : this.cof.doRequest(this.prepareSaveRequest()));
  }

  onChecked(categoryForm:any){
    let item = categoryForm.value
    this.certDates.set(item.title,this.form.get('categoryStartDate')?.value);
    this.form.patchValue({
      certificateFlag:this.getFlagValue()
    })
  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return  formControl!.status == 'INVALID' && formControl!.touched;
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return '';
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

}

export enum CertAttrKeys {
  A_DATE = 'a_date',
  B_DATE = 'b_date',
  C_DATE = 'c_date',
  D_DATE = 'd_date',
  E_DATE = 'e_date',
  BE_DATE = 'be_date',
  CE_DATE = 'ce_date',
  DE_DATE = 'de_date',
  T_DATE = 't_date'
}



