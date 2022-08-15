import {BaseForm} from "../../../../common/base.form/base-form";
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from "@angular/core";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Reference} from "../../../../_shared/request/crm/Reference";
import {CrmRefType} from "../../../../common/enums/crm-ref-type.enum";
import {COFService} from "../../../../_service/COFService";
import {SessionInfoService} from "../../services/session-info.service";
import {Router} from "@angular/router";
import {EmployeePassportComponent} from "../../employee/employee-add/employee-passport/employee-passport.component";
import {CrmAddressPanel} from "../../../../common/widgets/CrmAddressPanel/CrmAddressPanel";
import {firstValueFrom, merge, of, tap} from "rxjs";
import {CrmAlertDialog} from "../../../../common/widgets/CrmAlertDialog/CrmAlertDialog";
import {CrmAlertDialogTypeError} from "../../../../common/enums/crm-alert-dialog.enum";
import {DriverDocumentComponent} from "./driver-document/driver-document.component";
import {CrmPasportPanel} from "../../../../common/widgets/CrmPasportPanel/CrmPasportPanel";
import {ObjectOwnerType} from "../../../../common/enums/object-owner-type.enum";
import {AttributeSetupPanel, saveAttributesRequest} from "../../../../common/widgets/AttributeSetupPanel/AttributeSetupPanel";
import {NumberUtil} from "../../../../_service/util/NumberUtil";
import {Driver} from "../../../../_shared/request/crm/Driver";
import {IDriver, IDriverCollection} from "../../../models/driver.entity";
import { StringUtil } from "src/app/_service/util/StringUtil";
import { DriverSave } from "src/app/_shared/request/crm/DriverSave";
import { HttpCodes } from "src/app/common/enums/http-codes.enum";
import { DriverFullSave,IDriverAddress, IDriverCertificate, IDriverDocument, IDriverItem } from "src/app/_shared/request/crm/DriverFullSave";
import { DateUtil } from "src/app/_service/util/DateUtil";
import { IDriverSaveWithDetails } from "src/app/main/models/driver-save-with-detail.entity";
import { certificateFlagCheck } from "src/app/common/validators/certificateFlagCheck";
import { CrmFormDialog } from "src/app/common/widgets/CrmFormDialog/CrmFormDialog";
import { MatDialogRef } from "@angular/material/dialog";
import {DriverCertificateHistorySave} from "../../../../_shared/request/crm/DriverCertificateHistorySave";
import { ISaveState } from "./driverAddDialog";

@Component({
  selector: 'app-driver-add',
  templateUrl: './driver-add.component.html',
  styleUrls: ['./driver-add.component.css'],
})
export class DriverAddComponent extends BaseForm implements OnInit, OnDestroy {
  @Input() driver_id!: string;

  constructor(override cof: COFService, private router: Router, private fb: FormBuilder,private session:SessionInfoService,  public dialogRef: MatDialogRef < CrmFormDialog >) {
    super(cof);
  }

  ownerType: ObjectOwnerType = ObjectOwnerType.DRIVER;
  isNewDriver:boolean = true;

  @ViewChild('driverDocument', {static: true}) driverDocument!: DriverDocumentComponent;
  @ViewChild('passportPanel', {static: true}) passportPanel!: CrmPasportPanel;
  @ViewChild('addressPanel', {static: true}) addressPanel!: CrmAddressPanel;
  @ViewChild('attributePanel', {static: true}) attributePanel!: AttributeSetupPanel;
  @Output() dataSaved = new EventEmitter();
  @Input() isForeign: boolean = false;

  ngOnInit(): void {
    if(this.driver_id) {
      this.fillDriverData();
      this.clearUdateValidators();
      this.isNewDriver = false;
    }else{
      let today  = new Date()
      this.form.patchValue({
        categoryStartDate: new Date(),
        categoryEndDate:new Date(today.getFullYear() + 10, today.getMonth(), today.getDate())
    })

    }
    this.onNameChange();
  }

  clearUdateValidators(){
    this.form.get('categoryStartDate')?.clearValidators();
    this.form.get('categoryEndDate')?.clearValidators();
    this.form.get('pnfl')?.clearValidators();
    this.form.get('certificateFlag')?.clearValidators();
    this.form.get('doc_num')?.clearValidators();
    this.form.get('doc_ser')?.clearValidators();
    this.form.get('history_note')?.clearValidators();
    this.form.get('given_date')?.clearValidators();
    this.form.get('issue_date')?.clearValidators();
  }
  onNameChange(){
    let $firstNameChange = this.form.get('first_name')!.valueChanges
    .pipe(
      tap( v=> {
        this.form.patchValue({
          rfirst_name:StringUtil.toCyrilic(v),
          ufirst_name:StringUtil.toEnglish(v)
          })
        }
      )
    )
    let $lastNameChange = this.form.get('last_name')!.valueChanges
    .pipe(
      tap( v=> {
        this.form.patchValue({
          rlast_name:StringUtil.toCyrilic(v),
          ulast_name:StringUtil.toEnglish(v)
          })
        }
      )
    )
    let $middleNameChange = this.form.get('middle_name')!.valueChanges
    .pipe(
      tap( v=> {
        this.form.patchValue({
          rmiddle_name:StringUtil.toCyrilic(v),
          umiddle_name:StringUtil.toEnglish(v)
          })
        }
      )
    )
    merge($firstNameChange,$lastNameChange,$middleNameChange).subscribe();
  }

  categories = this.fb.array([]);
  override form: FormGroup = new FormGroup({

    ufirst_name: new FormControl('', []),
    umiddle_name: new FormControl('', []),
    ulast_name: new FormControl('', []),
    first_name: new FormControl('', [Validators.required]),
    middle_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    rfirst_name: new FormControl('', []),
    rmiddle_name: new FormControl('', []),
    rlast_name: new FormControl('', []),
    sex_id: new FormControl('', [Validators.required]),
    born_date: new FormControl(null, [Validators.required]),
    citizenship_id: new FormControl('', [Validators.required]),
    born_country_id: new FormControl('', [Validators.required]),
    born_region_id: new FormControl(null, []),
    born_city_id:new FormControl(null, []),
    born_place:new FormControl(null, []),
    pnfl: new FormControl('', [Validators.pattern('^[0-9]{14}$') ]),


    region: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    livePlace: new FormControl(),
    street:new FormControl('', []),
    note:new  FormControl('', []),
    house:new FormControl('', []),
    korpus:new FormControl('', []),
    flat:new FormControl('', []),
    addrTypeId: new FormControl(0, []),
    cadas_id: new FormControl(),

    seriya: new FormControl('', [Validators.required]),
    nomer: new FormControl('', [Validators.required]),
    givenDate: new FormControl('', [Validators.required]),
    issueDate: new FormControl('', [Validators.required]),
    givenBy: new FormControl('', [Validators.required]),
    docType: new FormControl('1', [Validators.required]),
    docId: new FormControl(null),

    doc_num:new FormControl('', [Validators.required]),
    doc_ser: new FormControl('', [Validators.required]),
    history_note: new FormControl('', [Validators.required]),
    given_date: new FormControl('', [Validators.required]),
    issue_date: new FormControl('', [Validators.required]),

    isAttrValid: new FormControl('', [Validators.required]),
    categories: this.categories,

    categoryStartDate: new FormControl('', [Validators.required]),
    categoryEndDate: new FormControl('', [Validators.required]),
    certificateFlag: new FormControl(0,[certificateFlagCheck() ]),
    categoryReason_id: new FormControl(null,[Validators.required]),
  });

  fillDriverData(){
    let request = new Driver();
    request.setId(this.driver_id);
    request.setCount(1);
    this.cof.doRequest(request).subscribe(res => {
      let data = < IDriverCollection > res;
      if (data && data.total_elements > 0) {
        let emp :IDriver = data.data[0];

        this.form.patchValue({

          sex_id: NumberUtil.toString(emp.sex_id),
          born_date: emp.born_date,
          citizenship_id: emp.citizenship_id,
          born_country_id: emp.born_country_id,
          pnfl: emp.pnfl,
          born_region_id:emp.born_region_id,
          born_place:emp.born_place,
          born_city_id:emp.born_city_id,

          rfirst_name: emp.rfirst_name,
          rlast_name: emp.rlast_name,
          rmiddle_name: emp.rmiddle_name,

          ufirst_name: emp.ufirst_name,
          umiddle_name: emp.umiddle_name,
          ulast_name: emp.ulast_name,
        });

        this.form.patchValue({
          first_name: emp.first_name,
          middle_name: emp.middle_name,
          last_name: emp.last_name,
        },{emitEvent: false});
        if(emp.citizenship_id != '182') {
          this.isForeign = true;
        }
        else {
          this.form.get('pnfl')?.addValidators([Validators.required, Validators.pattern('^[0-9]{14}$')])
        }
      }
    })
  }

  genderParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.GENDER);
    return;
  }

  nationalityParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CITIZENSHIP);
    return;
  }

  override beforeSave(): void {
    this.form.patchValue({
      isAttrValid: this.attributePanel.isValid() ? '1' : ''
    });
    if(this.isNewDriver || !this.driverDocument.isSelectedNotFirstTime()) {
      this.form.get('doc_num')?.clearValidators();
      this.form.get('doc_ser')?.clearValidators();
      this.form.get('history_note')?.clearValidators();
      this.form.get('given_date')?.clearValidators();
      this.form.get('issue_date')?.clearValidators();
      this.form.get('doc_num')?.updateValueAndValidity();
      this.form.get('doc_ser')?.updateValueAndValidity();
      this.form.get('history_note')?.updateValueAndValidity();
      this.form.get('given_date')?.updateValueAndValidity();
      this.form.get('issue_date')?.updateValueAndValidity();
    }
  }

  getFormValidationErrors() {

    const result: any[] = [];
    Object.keys(this.form.controls).forEach(key => {

      const controlErrors: any = this.form.get(key)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          result.push({
            'control': key,
            'error': keyError,
            'value': controlErrors[keyError]
          });
        });
      }
    });
    console.log(result,'errors');
    return result;
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
  }

  override onValidError(): void {
    this.getFormValidationErrors();
    CrmAlertDialog.show('FORM.NOT_ALL_FIELDS_FILLED',CrmAlertDialogTypeError.INFO);
  }

  override saveCallback(result: any): void {
    this.driver_id = (<IDriverSaveWithDetails>result).data.driver.id + '';
    if(this.driverDocument.isSelectedNotFirstTime()) {
      let request = new DriverCertificateHistorySave();
      request.doc_num = this.form.get('doc_num')?.value;
      request.flag = String(this.driverDocument.getFlagValue());
      request.driver_id = this.driver_id;
      request.note = this.form.get('history_note')?.value;
      request.doc_ser = this.form.get('doc_ser')?.value;
      request.given_date = this.form.get('given_date')?.value;
      request.issue_date = this.form.get('issue_date')?.value;
      firstValueFrom(this.cof.doRequest(request).pipe(tap(res => {
        if(res) {
          CrmAlertDialog.show('GENERAL.DATA_SAVED', CrmAlertDialogTypeError.INFO);
          this.dataSaved.emit(<ISaveState>{isSaved:true,driverId:this.driver_id});
        }
      })));
    }
    else {
      CrmAlertDialog.show('GENERAL.DATA_SAVED', CrmAlertDialogTypeError.INFO);
      this.dataSaved.emit(<ISaveState>{isSaved:true,driverId:this.driver_id});
    }
  }



  prepareRequest(): any {
    let request = new DriverFullSave();
    let driver = <IDriverItem>{
      born_city_id: this.form.get('born_city_id')?.value,
      born_country_id: this.form.get('born_country_id')?.value,
      born_date: DateUtil.formatDateToServer(this.form.get('born_date')?.value),
      born_place: this.form.get('born_place')?.value,
      born_region_id: <string>StringUtil.toStr(this.form.get('born_region_id')?.value,'0'),
      citizenship_id: this.form.get('citizenship_id')?.value,
      first_name: this.form.get('first_name')?.value,
      id: this.driver_id ? this.driver_id : null,
      last_name: this.form.get('last_name')?.value,
      middle_name: this.form.get('middle_name')?.value,
      pnfl: this.form.get('pnfl')?.value,
      rfirst_name: this.form.get('rfirst_name')?.value,
      rlast_name: this.form.get('rlast_name')?.value,
      rmiddle_name: this.form.get('rmiddle_name')?.value,
      sex_id: this.form.get('sex_id')?.value,
      ufirst_name: this.form.get('ufirst_name')?.value,
      ulast_name: this.form.get('ulast_name')?.value,
      umiddle_name: this.form.get('umiddle_name')?.value,
    };

    let address = <IDriverAddress>{
      address: this.addressPanel.getAddressText(),
      block: this.form.get('korpus')?.value,
      cadas_id: this.form.get('cadas_id')?.value,
      city_id: this.form.get('city')?.value,
      driver_id: this.driver_id ? this.driver_id : null,
      flat: this.form.get('flat')?.value,
      house: this.form.get('house')?.value,
      id: null,
      naspunkt: this.form.get('livePlace')?.value,
      note: this.form.get('note')?.value,
      region_id: this.form.get('region')?.value,
      street_name: this.form.get('street')?.value,
      type_id: this.form.get('addrTypeId')?.value,
    }

    let document = <IDriverDocument>{
      document_number: this.form.get('seriya')?.value + this.form.get('nomer')?.value,
      driver_id: this.driver_id ? this.driver_id : null,
      given_by: this.form.get('givenBy')?.value,
      given_date: this.form.get('givenDate')?.value,
      id:  this.form.get('docId')?.value,
      issue_date: this.form.get('issueDate')?.value,
      type_id: this.form.get('docType')?.value,
    }

    let certificat = <IDriverCertificate>{
      branch_id: this.session.getSesionInfo().data?.user_info.branch_id,
      driver_id: null,
      flag: this.driverDocument.getFlagValue(),
      given_date: this.form.get('categoryStartDate')?.value,
      id: null,
      issue_date: this.form.get('categoryEndDate')?.value,

      reason_id: this.form.get('categoryReason_id')?.value,
      state_id: 0,
    }
    let savReq:saveAttributesRequest = this.attributePanel.prepareSaveRequest()

    request.addresses = [address];
    request.attributes = savReq.attributes;
    request.documents = [ document];
    request.driver = driver;

    if(!this.driver_id)
    request.certificate = certificat;

    return request;
  }

  save() {
    this.saveProcess();
  };

  onEnd(){
    this.form.reset();
    this.router.navigate(['/driver/detail/', this.driver_id ]);
  }
  close(isNeedRefresh : boolean = false) {
    this.dialogRef.close(isNeedRefresh);
  }


}
