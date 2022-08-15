import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { BaseForm } from 'src/app/common/base.form/base-form';
import { CrmApiUrl } from 'src/app/common/enums/crm-api-urls.enum';
import { CrmRefType } from 'src/app/common/enums/crm-ref-type.enum';
import { SystemConfig } from 'src/app/common/enums/system-config.enum';
import { IEmployeeMilitary, IEmployeeMilitaryCollection } from 'src/app/main/models/employee-military.entity';
import { COFService } from 'src/app/_service/COFService';
import { EmployeeMilitary } from 'src/app/_shared/request/crm/EmployeeMilitary';
import { EmployeeMilitarySave } from 'src/app/_shared/request/crm/EmployeeMilitarySave';
import { Reference } from 'src/app/_shared/request/crm/Reference';
import { SessionInfoService } from '../../../services/session-info.service';
import { IDialogPersonFormData } from '../IPersonFormInput';

@Component({
  selector: 'emp-military-form',
  templateUrl: './EmpMilitaryForm.html',
  styleUrls: ['./EmpMilitaryForm.css']
})
export class EmpMilitaryForm extends BaseForm implements OnInit {

  constructor(override cof: COFService, private session:SessionInfoService) {
    super(cof);

  }

  ngOnInit() {
    if (this.id) {
      this.getData();
    }

  }

  @Input() id:string = '';
  @Input() employee_id:string = '';
  @Output() closeForm = new EventEmitter();

  override form: FormGroup = new FormGroup({
    military_title_id: new FormControl(null, [
      Validators.required
    ]),
    military_date: new FormControl(null, [
      Validators.required
    ]),
    given_by: new FormControl(null, [
      Validators.required
    ]),
  });

  saveRequest :any;
  getRequest = new EmployeeMilitary();

  setRefType = (request: Reference): void => {
    request.setTypeId(CrmRefType.MILITARY_DEGREE);
    return;
  }

  prepareRequest(): any {
    this.saveRequest = new EmployeeMilitarySave(this.id);
    this.saveRequest.military_title_id = this.form.get('military_title_id')?.value;
    this.saveRequest.military_date = this.form.get('military_date')?.value;
    this.saveRequest.employee_id = this.employee_id;
    this.saveRequest.given_by = this.form.get('given_by')?.value;
    this.saveRequest.edit_by = this.session.getSesionInfo().data?.user_info.employee_id;
    return this.saveRequest;
  }

  save() {
    this.saveProcess();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getData() {
    this.getRequest.setId(this.id);
    this.getRequest.setCount(1);
    firstValueFrom(this.cof.doRequest(this.getRequest)).then(result => {
      if (result && !!result) {
        let itemCollection = < IEmployeeMilitaryCollection > result;
        if (itemCollection.data.length > 0) {
          let item = <IEmployeeMilitary>itemCollection.data[0];
          this.form.patchValue({
            military_title_id: item.military_title_id,
            military_date: item.military_date,
            given_by: item.given_by,
        })
      }
    }
    });
  }

  public setData(item:IDialogPersonFormData){
    this.id = item.id;
    this.employee_id = item.ownerId;
  }

  override saveCallback(result: Object): void {
    this.closeForm.emit(true);
  }
}
