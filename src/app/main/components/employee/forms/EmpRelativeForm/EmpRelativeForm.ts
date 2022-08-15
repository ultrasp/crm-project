import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { BaseForm } from 'src/app/common/base.form/base-form';
import { CrmApiUrl } from 'src/app/common/enums/crm-api-urls.enum';
import { CrmRefType } from 'src/app/common/enums/crm-ref-type.enum';
import { SystemConfig } from 'src/app/common/enums/system-config.enum';
import { IEmployeeMilitary, IEmployeeMilitaryCollection } from 'src/app/main/models/employee-military.entity';
import { IEmployeeRelative, IEmployeeRelativeCollection } from 'src/app/main/models/employee-relative.entity';
import { COFService } from 'src/app/_service/COFService';
import { AbstractCrmRequest } from 'src/app/_shared/abstract/AbstractCrmRequest';
import { EmployeeMilitary } from 'src/app/_shared/request/crm/EmployeeMilitary';
import { EmployeeMilitarySave } from 'src/app/_shared/request/crm/EmployeeMilitarySave';
import { EmployeeRelative } from 'src/app/_shared/request/crm/EmployeeRelative';
import { EmployeeRelativeSave } from 'src/app/_shared/request/crm/EmployeeRelativeSave';
import { Reference } from 'src/app/_shared/request/crm/Reference';
import { SessionInfoService } from '../../../services/session-info.service';
import { IDialogPersonFormData } from '../IPersonFormInput';

@Component({
  selector: 'emp-relative-form',
  templateUrl: './EmpRelativeForm.html',
  styleUrls: ['./EmpRelativeForm.css']
})
export class EmpRelativeForm extends BaseForm implements OnInit {

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
    born_date: new FormControl(null, [
      Validators.required
    ]),
    born_place: new FormControl(null, [
      Validators.required
    ]),
    life_place:new FormControl(null, [
      Validators.required
    ]),
    name:new FormControl(null, [
      Validators.required
    ]),
    type_id:new FormControl(null, [
      Validators.required
    ]),
    order:new FormControl(null, [
      Validators.required
    ]),
    work_info: new FormControl(null, [
      Validators.required
    ]),
    life_place_view: new FormControl(null, [
      Validators.required
    ]),
  });

  saveRequest:any;
  getRequest = new EmployeeRelative();

  setRefType = (request: Reference): void => {
    request.setTypeId(CrmRefType.RELATIVITY_TYPE);
    return;
  }

  prepareRequest(): any {
    this.saveRequest = new EmployeeRelativeSave(this.id);
    this.saveRequest.born_date = this.form.get('born_date')?.value;
    this.saveRequest.born_place = this.form.get('born_place')?.value;
    this.saveRequest.life_place = this.form.get('life_place')?.value;
    this.saveRequest.name = this.form.get('name')?.value;
    this.saveRequest.type_id = this.form.get('type_id')?.value;
    this.saveRequest.order = this.form.get('order')?.value;
    this.saveRequest.life_place_view = this.form.get('life_place_view')?.value;
    this.saveRequest.work_info = this.form.get('work_info')?.value;
    this.saveRequest.employee_id = this.employee_id;
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
        let itemCollection = < IEmployeeRelativeCollection > result;
        if (itemCollection.data.length > 0) {
          let item = <IEmployeeRelative>itemCollection.data[0];
          this.form.patchValue({
            born_date: item.born_date,
            born_place: item.born_place,
            life_place: item.life_place,
            name: item.name,
            type_id: item.type_id,
            order:item.order,
            work_info:item.work_info,
            life_place_view:item.life_place_view
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
