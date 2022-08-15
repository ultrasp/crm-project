import {BaseForm} from "../../../../../common/base.form/base-form";
import {Component, EventEmitter, Inject, Input, OnInit, Output} from "@angular/core";
import {COFService} from "../../../../../_service/COFService";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CarTechnicalInspectionSave} from "../../../../../_shared/request/crm/CarTechnicalInspectionSave";
import {IDialogPersonFormData} from "../../../employee/forms/IPersonFormInput";
import {firstValueFrom} from "rxjs";
import {CarTechnicalInspectionList} from "../../../../../_shared/request/crm/CarTechnicalInspectionList";
import {CarTechnicalInspectionListCollection} from "../../../../models/car-technical-inspection-list.entity";
import {Reference} from "../../../../../_shared/request/crm/Reference";
import {CrmRefType} from "../../../../../common/enums/crm-ref-type.enum";

@Component({
  selector: 'app-car-technical-inspection-form',
  templateUrl: 'TechnicalInspectionForm.html',
  styleUrls: ['TechnicalInspectionForm.css'],
})
export class TechnicalInspectionForm extends BaseForm implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, override cof: COFService,
              private dialogRef: MatDialogRef<TechnicalInspectionForm>) {
    super(cof);
  }

  @Output() closeForm = new EventEmitter();

  @Input() carId!: string;
  @Input() id!: string;

  technicalInspectionRequest(request: Reference) {
    request.setTypeId(CrmRefType.DRIVER_TECHNICAL_INSPECTION_STATE);
  }

  override form: FormGroup = new FormGroup({
    check_date: new FormControl(null, [Validators.required]),
    next_date: new FormControl(null, [Validators.required]),
    state_id: new FormControl(null, [Validators.required]),
    note: new FormControl(null, []),
  })

  getData() {
    let request = new CarTechnicalInspectionList();
    request.setId(this.id);
    request.setCount(1);
    firstValueFrom(this.cof.doRequest(request)).then(result => {
      if (result && !!result) {
        let itemCollection = <CarTechnicalInspectionListCollection>result;
        if (itemCollection.data.length > 0) {
          let item = itemCollection.data[0];
          this.form.patchValue({
            check_date: item.check_date,
            note: item.note,
            next_date: item.next_date,
            state_id: item.state_id,
          })
        }
      }
    });
  }

  ngOnInit(): void {
    if (this.id)
      this.getData();
  }

  save() {
    this.saveProcess();
  }


  override afterSave() {
    this.form.reset();
    this.closeForm.emit(true);
  }


  public setData(item: IDialogPersonFormData) {
    this.id = item.id;
    this.carId = item.ownerId;
  }

  prepareRequest(): any {
    let request = new CarTechnicalInspectionSave();
    request.note = this.form.get('note')?.value;
    request.car_id = this.carId;
    request.id = this.id;
    request.check_date = this.form.get('check_date')?.value;
    request.next_date = this.form.get('next_date')?.value;
    request.state_id = this.form.get('state_id')?.value;
    return request;
  }

}
