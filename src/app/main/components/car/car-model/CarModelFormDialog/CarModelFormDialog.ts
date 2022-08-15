import {
  Component,
  Inject,
  Injector,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
  firstValueFrom
} from 'rxjs';
import {
  ICarModelCollection
} from 'src/app/main/models/car-model.entity';
import {
  COFService
} from 'src/app/_service/COFService';
import { BaseForm } from 'src/app/common/base.form/base-form';
import { InjectorInstance } from 'src/app/app.module';
import { CarModel } from 'src/app/_shared/request/crm/CarModel';
import { RequestClassKey } from 'src/app/_shared/request/crm/RequestList';
import { CrmRefType } from 'src/app/common/enums/crm-ref-type.enum';
import { Reference } from 'src/app/_shared/request/crm/Reference';
import { CarModelSave } from 'src/app/_shared/request/crm/CarModelSave';
import {ICarModelSaveCollection} from "../../../../models/car-model-save.entity";

@Component({
  selector: 'app-CarModelFormDialog',
  templateUrl: './CarModelFormDialog.html',
  styleUrls: ['./CarModelFormDialog.css']
})
export class CarModelFormDialog extends BaseForm implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CarModelFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CarModelDialogData,
    override cof: COFService
  ) {
    super(cof);
  }

  ngOnInit() {
    if (this.data.id) {
      this.getUserData();
    }
  }

  referenceKey: string = RequestClassKey.REFERENCE;

  saveRequest: any = new CarModelSave();
  getRequest = new CarModel();

  carBrandParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CAR_BRAND);
  }

  carTypeIdParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CAR_MODEL_TYPE);
  }


  override form: FormGroup = new FormGroup({
    brand_id: new FormControl('', [Validators.required]),
    type_id:new FormControl('', [Validators.required]),
    common_place: new FormControl('', [Validators.required, Validators.max(1000000000)]),
    engine: new FormControl('', [Validators.required, Validators.max(1000000000)]),
    name: new FormControl('', [Validators.required]),
    place_count: new FormControl('', [Validators.required, Validators.max(1000000000)]),
    pure_weight: new FormControl('', [Validators.required, Validators.max(1000000000)]),
    weight: new FormControl('', [Validators.required, Validators.max(1000000000)])
  });

  getUserData() {
    this.getRequest.setId(this.data.id);
    this.getRequest.setCount(1);
    firstValueFrom(this.cof.doRequest(this.getRequest)).then(result => {
      if (result && !!result) {
        let carModelResponse = <ICarModelCollection>result;
        if (carModelResponse.data.length > 0) {
          let car_model = carModelResponse.data[0];
          this.form.patchValue({
            brand_id: car_model.brand_id,
            common_place: car_model.common_place,
            engine: car_model.engine,
            name: car_model.name,
            place_count: car_model.place_count,
            pure_weight: car_model.pure_weight,
            weight: car_model.weight,
            type_id:car_model.type_id
          });
        }
      }
    });
  }

  isValid() {
    return this.form.valid;
  }

  prepareRequest(): any {
    this.saveRequest.setBrandId(this.form.get('brand_id')?.value);
    this.saveRequest.setCommonPlace(this.form.get('common_place')?.value);
    this.saveRequest.setEnginePower(this.form.get('engine')?.value);
    this.saveRequest.setName(this.form.get('name')?.value)
    this.saveRequest.setPlaceCount(this.form.get('place_count')?.value)
    this.saveRequest.setPureWeight(this.form.get('pure_weight')?.value);
    this.saveRequest.setWeight(this.form.get('weight')?.value);
    this.saveRequest.type_id = this.form.get('type_id')?.value;
    if (this.data.id) {
      this.saveRequest.setId(this.data.id);
    }
    return this.saveRequest;
  }

  save() {
    this.saveProcess();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  override saveCallback(result: Object) {
    this.form.reset();
    let data = <ICarModelSaveCollection> result;
    this.dialogRef.close(data.data.id);
  }

  close(isSaved: boolean = false) {
    this.dialogRef.close(isSaved);
  }

  public static openDialog(id?: string) {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(CarModelFormDialog, {
      width: '700px',
      data: {
        id
      },
    });
    return dialogRef.afterClosed();
  }
}

export interface CarModelDialogData {
  id: string;
}
