import {BaseForm} from "../../../../../common/base.form/base-form";
import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit} from "@angular/core";
import {COFService} from "../../../../../_service/COFService";
import {Reference} from "../../../../../_shared/request/crm/Reference";
import {CrmRefType} from "../../../../../common/enums/crm-ref-type.enum";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { CarTuningSave } from "src/app/_shared/request/crm/CarTuningSave";
import { FormDialogComponent } from "src/app/common/widgets/CrmFormDialog/CrmFormDialog";
import { CarTuningType } from "src/app/common/enums/car-tuning-type.enum";
import { RequestClassKey } from "src/app/_shared/request/crm/RequestList";

@Component({
  selector: 'app-car-tuning-form',
  templateUrl: 'CarTuningForm.html',
  styleUrls: ['CarTuningForm.css'],
})
export class CarTuningForm extends BaseForm implements OnInit,FormDialogComponent, OnDestroy {

  constructor(override cof: COFService) {
    super(cof);
  }
  closeForm: EventEmitter<boolean> = new EventEmitter();

  override form: FormGroup = new FormGroup({
    type_id: new FormControl(null, [Validators.required]),
    document_number: new FormControl(null, [Validators.required]),
    given_by:new FormControl(),
    given_by_id:new FormControl(),
    given_date: new FormControl(null, [Validators.required]),
    issue_date: new FormControl(null, [Validators.required]),
    check_date: new FormControl(null),
    next_check_date: new FormControl(null),
    provide_date: new FormControl(null),
    ud1: new FormControl(),
    ud2: new FormControl(),
    ud3: new FormControl(),
  })
  private carId!:string;
  private id?:string;
  @Input() isGaz:boolean = false;
  @Input() parentForm:FormGroup | null = null;
  referenceKey: string = RequestClassKey.REFERENCE;

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
        type_id:CarTuningType.GAZ
      })
      this.form.controls["check_date"].setValidators([Validators.required])
      this.form.controls["next_check_date"].setValidators([Validators.required])
      this.form.controls["provide_date"].setValidators([Validators.required])
      this.form.controls["ud1"].setValidators([Validators.required])
      this.form.controls["ud2"].setValidators([Validators.required])
      this.form.controls["ud3"].setValidators([Validators.required])
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
    request.given_date = this.form.get('given_date')?.value;
    request.given_by = this.form.get('given_by')?.value;
    if(this.form.get('given_by_id')?.value == null){
      request.given_by_id = '-1';
    }else{
      request.given_by_id = this.form.get('given_by_id')?.value;
    }
    request.issue_date = this.form.get('issue_date')?.value;
    request.type_id = this.form.get('type_id')?.value;
    if(this.id){
      request.id = this.id
    }
    if(this.isGaz){
      request.provide_date = this.form.get('provide_date')?.value;
      request.next_check_date = this.form.get('next_check_date')?.value;
      request.check_date = this.form.get('check_date')?.value;
      request.ud1 = this.form.get('ud1')?.value;
      request.ud2 = this.form.get('ud2')?.value;
      request.ud3 = this.form.get('ud3')?.value;
    }
    return request;
  }

  givenPlaceParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.GIVEN_PLACE);
    return;
  }

}
