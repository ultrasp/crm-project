import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { BaseForm } from "src/app/common/base.form/base-form";
import { COFService } from "src/app/_service/COFService";
import { CarSave } from "src/app/_shared/request/crm/CarSave";
import { CarCollection, CarSaveResponse } from "src/app/main/models/car-entity";
import { Router } from "@angular/router";
import { FormDialogComponent } from "src/app/common/widgets/CrmFormDialog/CrmFormDialog";
import { Car } from "src/app/_shared/request/crm/Car";
import {firstValueFrom, map, of, switchMap, tap} from "rxjs";
import { ObjectOwnerType } from "src/app/common/enums/object-owner-type.enum";
import { AttributeSetupPanel } from "src/app/common/widgets/AttributeSetupPanel/AttributeSetupPanel";
import { CrmAlertDialog } from "src/app/common/widgets/CrmAlertDialog/CrmAlertDialog";
import { CrmAlertDialogTypeError } from "src/app/common/enums/crm-alert-dialog.enum";
import {CarTuningForm} from "../forms/CarTuningForm/CarTuningForm";
import {CarTuningList} from "../../../../_shared/request/crm/CarTuningList";
import {CarTuningType} from "../../../../common/enums/car-tuning-type.enum";
import {CarTuningCollection} from "../../../models/car-tuning-list.entity";
import {DateUtil} from "../../../../_service/util/DateUtil";

@Component({
  selector: 'crm-car-edit',
  templateUrl: './CarEdit.html',
  styleUrls: ['./CarEdit.css'],
})
export class CarEdit extends BaseForm  implements OnInit,FormDialogComponent {

  constructor(override cof: COFService,private router: Router) {
    super(cof);
  }
  setData(data: any): void {
    this.car_id = data.car_id;
    this.fillCar();
  }

  @Output() closeForm: EventEmitter<boolean> =  new EventEmitter();
  @Input() car_id!: string;
  ownerType:ObjectOwnerType = ObjectOwnerType.CAR;
  @ViewChild('attributePanel') attributePanel!:AttributeSetupPanel;
  @ViewChild(CarTuningForm) gazInfoPanel!: CarTuningForm;

  gazInfoData = {};

  ngOnInit(): void {
    this.gazInfoData = {
      car_id: this.car_id,
    }

  }


  fillCar(){
    let getRequest = new Car();
    getRequest.id = this.car_id;
    getRequest.setCount(1);
    firstValueFrom(this.cof.doRequest(getRequest).pipe(
      tap( (res :any) =>{
        let data= <CarCollection>res;
        if(data && data.total_elements > 0 ){
          let car = data.data[0];
          this.form.patchValue({
            fuel_type_id: car.fuel_type_id,
            brand_id: car.brand_id,
            model_id: car.model_id,
            type_id: car.type_id,
            body_type_id: car.body_type_id,
            engine_number: car.engine_number,
            body_number: car.body_number,
            chassis_number: car.chassis_number,
            vin_code: car.vin_code,
            color_id: car.color_id,
            sub_color_id: car.sub_color_id,

            made_place: car.country_id + '',
            year: car.year,
          })
        }
      }),
      switchMap( __=> {
        let request = new CarTuningList();
        request.type_ids = [CarTuningType.GAZ];
        request.car_id = this.car_id;
        request.from_issue_date = <string>DateUtil.formatDateToServer(new Date());
        request.setCount(10000);
        return  this.cof.doRequest(request).pipe(tap(res => {
          let data = <CarTuningCollection> res;
          if(data.total_elements > 0) {
            this.form.patchValue({
              'hasGaz': true,
            })
            this.gazInfoData = {
              id: data.data[0].id,
              car_id: data.data[0].car_id,
              type_id: data.data[0].type_id,
              document_number: data.data[0].document_number,
              given_by: data.data[0].given_by,
              given_date: data.data[0].given_date,
              issue_date: data.data[0].issue_date,
              ud1: data.data[0].ud1,
            };
          }
        }))
      })));
  }

  override form: FormGroup = new FormGroup({
    fuel_type_id: new FormControl(null,[Validators.required]),
    brand_id: new FormControl(null,[Validators.required]),
    model_id: new FormControl(null,[Validators.required]),
    type_id: new FormControl(null,[Validators.required]),
    body_type_id: new FormControl(null,[Validators.required]),
    engine_number: new FormControl(null,[Validators.required]),
    body_number: new FormControl(null,[Validators.required]),
    chassis_number: new FormControl(null,[Validators.required]),
    vin_code: new FormControl(null,[]),
    color_id: new FormControl(null,[Validators.required]),
    sub_color_id: new FormControl(null,[Validators.required]),

    made_place: new FormControl(null,[Validators.required]),
    year: new FormControl(null,[Validators.required]),
    weight: new FormControl(null, []),
    pure_weight: new FormControl(null, []),
    power: new FormControl(null, [Validators.required]),
    place_count: new FormControl(null, []),
    common_place: new FormControl(null, []),
    gas_number: new FormControl(null),
    hasGaz: new FormControl(null),
    gas_installed_place: new FormControl(null),
    prohibited: new FormControl(null),

  });


   getFormValidationErrors() {

    const result:any[] = [];
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

    return result;
  }
  override beforeSave(): void {
  }

  prepareRequest(): any {
    let saveRequest = new CarSave();
    saveRequest.id = this.car_id;
    saveRequest.body_number = this.form.get('body_number')?.value;
    saveRequest.body_type_id = this.form.get('body_type_id')?.value;
    saveRequest.brand_id = this.form.get('brand_id')?.value;
    saveRequest.chassis_number = this.form.get('chassis_number')?.value;
    saveRequest.color_id = this.form.get('color_id')?.value;
    saveRequest.sub_color_id = this.form.get('sub_color_id')?.value;
    saveRequest.country_id = this.form.get('country_id')?.value;
    saveRequest.engine_number = this.form.get('engine_number')?.value;
    saveRequest.fuel_type_id = this.form.get('fuel_type_id')?.value;
    saveRequest.model_id = this.form.get('model_id')?.value;
    saveRequest.type_id = this.form.get('type_id')?.value;
    saveRequest.vin_code = this.form.get('vin_code')?.value;
    saveRequest.year = this.form.get('year')?.value;
    saveRequest.country_id  = this.form.get('made_place')?.value;
    return saveRequest;
  }

  save() {
    this.saveProcess();
  }


  override saveCallback(result: CarSaveResponse): void {
    this.car_id = result.data.id;

    setTimeout(() => {
      this.attributePanel.save().subscribe(res =>{
        if(res) {
          if(this.form.get('hasGaz')?.value) {
            this.cof.doRequest(this.gazInfoPanel.prepareRequest()).subscribe(res => {
              if(res){
                CrmAlertDialog.show('GENERAL.DATA_SAVED',CrmAlertDialogTypeError.INFO);
                this.closeForm.emit(true);
              }
            });
          }
          CrmAlertDialog.show('GENERAL.DATA_SAVED',CrmAlertDialogTypeError.INFO);
          this.closeForm.emit(true);
        }
      })
    }, 300);

  }
}

