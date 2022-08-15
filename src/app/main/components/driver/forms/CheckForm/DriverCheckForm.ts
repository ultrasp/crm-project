import {BaseForm} from "../../../../../common/base.form/base-form";
import {Component, EventEmitter, Inject, Input, OnInit, Output} from "@angular/core";
import {COFService} from "../../../../../_service/COFService";
import {Reference} from "../../../../../_shared/request/crm/Reference";
import {CrmRefType} from "../../../../../common/enums/crm-ref-type.enum";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {InjectorInstance} from "../../../../../app.module";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DriverCertificateDeprivation} from "../../../../../_shared/request/crm/DriverCertificateDeprivation";
import {DriverCheckSave} from "../../../../../_shared/request/crm/DriverCheckSave";
import {firstValueFrom} from "rxjs";
import {IEmployeeMilitary, IEmployeeMilitaryCollection} from "../../../../models/employee-military.entity";
import {DriverCheckList} from "../../../../../_shared/request/crm/DriverCheckList";
import {IDialogPersonFormData} from "../../../employee/forms/IPersonFormInput";
import {IDriverCheck, IDriverCheckCollection} from "../../../../models/driver-check.entity";

@Component({
  selector: 'app-driver-check-form',
  templateUrl: 'DriverCheckForm.html',
  styleUrls: ['DriverCheckForm.css'],
})
export class DriverCheckForm extends BaseForm implements OnInit {

  constructor(override cof: COFService) {
    super(cof);
  }
  @Input() id!: string;
  @Input() driverId!: string;
  @Output() closeForm = new EventEmitter();

  override form: FormGroup = new FormGroup({
    end_date: new FormControl(null, [Validators.required]),
    note: new FormControl(null, [Validators.required]),
    result_id: new FormControl(null, [Validators.required]),
    start_date: new FormControl(null, [Validators.required]),
    type_id: new FormControl(null, [Validators.required]),
  })

  checkTypeRequest(request: Reference) {
    request.setTypeId(CrmRefType.DRIVER_CHECK_TYPE);
  }

  checkResultRequest(request: Reference) {
    request.setTypeId(CrmRefType.DRIVER_CHECK_RESULT);
  }

  ngOnInit(): void {
    if(this.id)
      this.getData();
  }

  getData() {
    let request = new DriverCheckList();
    request.setId(this.id);
    request.setCount(1);
    firstValueFrom(this.cof.doRequest(request)).then(result => {
      if (result && !!result) {
        let itemCollection = < IDriverCheckCollection > result;
        if (itemCollection.data.length > 0) {
          let item = <IDriverCheck>itemCollection.data[0];
          this.form.patchValue({
            end_date: item.end_date,
            note: item.note,
            result_id: item.result_id,
            start_date: item.start_date,
            type_id: item.type_id,
          })
        }
      }
    });
  }


  save() {
    this.saveProcess();
  }


  override afterSave(){
    this.form.reset();
    this.closeForm.emit(true);
  }

  public setData(item:IDialogPersonFormData){
    this.id = item.id;
    this.driverId = item.ownerId;
  }

  prepareRequest(): any {
    let request = new DriverCheckSave();
    request.id = this.id;
    request.note = this.form.get('note')?.value;
    request.end_date = this.form.get('end_date')?.value;
    request.result_id = this.form.get('result_id')?.value;
    request.start_date = this.form.get('start_date')?.value;
    request.type_id = this.form.get('type_id')?.value;
    request.driver_id = this.driverId;
    return request;
  }

}
