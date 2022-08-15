import {BaseForm} from "../../../../../common/base.form/base-form";
import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit} from "@angular/core";
import {COFService} from "../../../../../_service/COFService";
import {Reference} from "../../../../../_shared/request/crm/Reference";
import {CrmRefType} from "../../../../../common/enums/crm-ref-type.enum";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {InjectorInstance} from "../../../../../app.module";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DriverCertificateDeprivation} from "../../../../../_shared/request/crm/DriverCertificateDeprivation";
import {CarTechnicalInspectionSave} from "../../../../../_shared/request/crm/CarTechnicalInspectionSave";
import { FocusMonitor } from "@angular/cdk/a11y";
import { CarTuningSave } from "src/app/_shared/request/crm/CarTuningSave";
import { FormDialogComponent } from "src/app/common/widgets/CrmFormDialog/CrmFormDialog";
import { CarTuningType } from "src/app/common/enums/car-tuning-type.enum";
import {DateUtil} from "../../../../../_service/util/DateUtil";

@Component({
  selector: 'app-car-tuning-form-2',
  templateUrl: 'CarTuningForm2.html',
  styleUrls: ['CarTuningForm2.css'],
})
export class CarTuningForm2 extends BaseForm implements OnInit,FormDialogComponent, OnDestroy {

  constructor(override cof: COFService) {
    super(cof);
  }
  closeForm: EventEmitter<boolean> = new EventEmitter();

  override form: FormGroup = new FormGroup({
    type_id: new FormControl(null, [Validators.required]),
    document_number: new FormControl(null, [Validators.required]),
    given_by:new FormControl(),
    given_date: new FormControl(null, [Validators.required]),
    issue_date:new FormControl(null, [Validators.required]),
    ud1:new FormControl(),
  })
  private carId!:string;
  private id?:string;
  @Input() isGaz:boolean = false;
  @Input() parentForm:FormGroup | null = null;

  setData(data: any): void {
    this.carId = data.ownerId;
    this.id = data.id;
    this.isGaz = data.isGaz;
  }

  _data: any = {};

  @Input() set data(value: any) {
    this._data = value;
    if(this.form) {
      if(value.id)
        this.id = value.id;
      if(value.car_id)
        this.carId = value.car_id;
      this.form.patchValue(value);
    }
  }
  get data() {
    return this._data;
  }


  setGazType(){
    if(this.isGaz){
      this.form.patchValue({
        type_id:CarTuningType.GAZ,
      })

      if(this.parentForm){

        let startDate = this.parentForm?.get('start_date')?.value;
        startDate = new Date(startDate);
        this.form.patchValue({
          given_date: startDate,
          issue_date: (startDate) ? new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate()) : null
        })

        this.parentForm.get('start_date')?.valueChanges.subscribe(date => {
          date = new Date(date);
          this.form.patchValue({
            given_date: date,
            issue_date: (date) ? new Date(date.getFullYear() + 1, date.getMonth(), date.getDate()) : null
          })
        })
      }
    }
  }

  ngOnInit(): void {
    if(this.parentForm)
      this.parentForm.addControl('gasInfo', this.form);
    this.setGazType()
  }

  override ngOnDestroy(): void {
    if(this.parentForm)
    this.parentForm.removeControl('gasInfo');
  }

  setRefType = (request: Reference): void => {
    request.setTypeId(CrmRefType.CAR_DOC_TYPE);
    return;
  }

  carGasInstalledPlaceParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CAR_GAS_PLACE);
    return;
  }

  override saveCallback(result: Object): void {
    this.closeForm.emit(true);
  }

  save() {
    this.saveProcess();
  }

  prepareRequest(): any {
    let request = new CarTuningSave();
    request.car_id = this.carId;
    request.document_number = this.form.get('document_number')?.value;
    request.given_by = this.form.get('given_by')?.value;
    request.given_date = this.form.get('given_date')?.value;
    request.issue_date = this.form.get('issue_date')?.value;
    request.type_id = this.form.get('type_id')?.value;
    if(this.id){
      request.id = this.id
    }
    if(this.isGaz){
      request.ud1 = this.form.get('ud1')?.value;
    }
    return request;
  }

}
