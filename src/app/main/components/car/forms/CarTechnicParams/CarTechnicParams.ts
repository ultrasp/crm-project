import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { empty, filter, map, Observable, pairwise, switchMap, tap } from "rxjs";
import { CrmRefType } from "src/app/common/enums/crm-ref-type.enum";
import { ISelectOption } from "src/app/common/widgets/CrmSelect/CrmSelect";
import { ICarModel, ICarModelCollection } from "src/app/main/models/car-model.entity";
import { COFService } from "src/app/_service/COFService";
import { CarModel } from "src/app/_shared/request/crm/CarModel";
import { Reference } from "src/app/_shared/request/crm/Reference";
import { RequestClassKey } from "src/app/_shared/request/crm/RequestList";
import {IButtonParams} from "../../../../../common/widgets/DataGrid/renderer/button-renderer.component";
import {RefenceFormDialog} from "../../../reference/refFormDialog/refFormDialog";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RefType} from "../../../../../_shared/request/crm/RefType";
import {CarModelFormDialog} from "../../car-model/CarModelFormDialog/CarModelFormDialog";
import {CrmAutocompleteLoadList} from "../../../../../common/widgets/CrmAutocompleteLoadList/CrmAutocompleteLoadList";
import {ResourceService} from "../../../../../_service/resources-service.service";

@Component({
  selector: 'crm-car-technic-params',
  templateUrl: './CarTechnicParams.html',
  styleUrls: ['./CarTechnicParams.css'],
})
export class CarTechnicParams implements OnInit, OnDestroy {

  constructor(private cof:COFService,private translate: TranslateService,
              private dialog: MatDialog, private resourceService: ResourceService){

  }
  ngOnInit(): void {
    this.onModelChange();
    this.onBrandChanges();
  }

  brandCustomButtons: any[] = [
    {
      key: 'add',
      title: 'FORM.ADD',
      icon: 'add'
    }
  ]

   ngOnDestroy(): void {

   }

   @ViewChild('brandInput') brandInput!: CrmAutocompleteLoadList;
   @ViewChild('modelInput') modelInput!: CrmAutocompleteLoadList;

  @Input() form!: FormGroup;
  @Input() isAdd:boolean = true;
  public referenceKey: string = RequestClassKey.REFERENCE;
  public modelReferenceKey: RequestClassKey = RequestClassKey.CAR_MODEL

  madePlaceOptions: ISelectOption[] = madePlaceOptions;

  carFuelTypeParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CAR_FUEL_TYPE);
    return;
  }

  carBrandParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CAR_BRAND);
  }

  carBodyTypeParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CAR_BODY_TYPE);
    return;
  }

  carColorParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CAR_COLOR);
    return;
  }

  carCommonColorParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CAR_COLOR);
    return;
  }

  carGasInstalledPlaceParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CAR_GAS_PLACE);
    return;
  }

  setModelParams = (modelRequest:CarModel):void =>{
    if(this.form.get('brand_id')?.value){
      modelRequest.setBrandId(this.form.get('brand_id')?.value);
    }
    return;
  }

  carTypes = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CAR_MODEL_TYPE);
    return;
  }

  refreshModel = true;
  onBrandChanges(){
    this.form.get('brand_id')?.valueChanges.subscribe( v=>{
      this.clearModelParams()
      this.refreshModel  = !this.refreshModel
    })
  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl != null && formControl!.status == 'INVALID' && formControl!.touched;
  }

  onModelChange(){
    this.form.get("model_id")?.valueChanges.pipe(
      filter(val => (val)),
      switchMap(val =>  this.getModelInfo(val)),
      map( resp => ( resp as ICarModelCollection).data[0]),
      tap(res =>  this.filModelData(res))
    )
    .subscribe();
  }

  getModelInfo(id:string){
    let reqModel = new CarModel();
    reqModel.id = id;
    reqModel.setCount(1);
    return this.cof.doRequest(reqModel);
  }

  filModelData(item:ICarModel) {
    if(item) {
      this.form.patchValue({
        place_count:item.place_count,
        common_place:item.common_place,
        pure_weight:item.pure_weight,
        weight: item.weight,
        power: item.engine,
        type_id:item.type_id
      })
      this.form.get('brand_id')?.setValue(item.brand_id, { emitEvent: false })
    }
  }

  brandAddButtonClicked() {
    let refType: RefType = new RefType();
    refType.category_id = '1';
    refType.id = CrmRefType.CAR_BRAND;
    let ref: MatDialogRef<RefenceFormDialog> = RefenceFormDialog.openDialog(this.dialog, refType, null, false);
    ref.afterClosed().subscribe(v => {
      if (v) {
        this.resourceService.loadOnlyReferences().then(r => {
          this.brandInput.loadList(true).then(r => {
            this.form.patchValue({
              brand_id: v,
            })
          });

        })
      }
    })
  }

  modelAddButtonClicked() {
    CarModelFormDialog.openDialog('').subscribe(result => {
      if (result) {
        this.modelInput.loadList(true).then(r => {
          this.form.patchValue({
            model_id: result,
          })
        });
      }
    });
  }

  clearModelParams(){
    this.form.patchValue({
      place_count:null,
      common_place:null,
      pure_weight:null,
      weight: null,
      power: null,
      model_id:null,
      type_id:null
    })
  }

  onBrandChange(row:any){
  }


}

export enum CAR_MANUFACTURE_COUNTRY_KEYS {
  UZB = '1',
  BMT = '2',
  FOREIGN = '3',
}

export const madePlaceOptions: ISelectOption[] = [
  {
    title: 'CAR_MANUFACTURE_COUNTRY.AT_UZBEKISTAN',
    key: CAR_MANUFACTURE_COUNTRY_KEYS.UZB
  },
  {
    title: 'CAR_MANUFACTURE_COUNTRY.AT_BMT',
    key: CAR_MANUFACTURE_COUNTRY_KEYS.BMT
  },
  {
    title: 'CAR_MANUFACTURE_COUNTRY.AT_FORIEGN',
    key: CAR_MANUFACTURE_COUNTRY_KEYS.FOREIGN
  }
];
