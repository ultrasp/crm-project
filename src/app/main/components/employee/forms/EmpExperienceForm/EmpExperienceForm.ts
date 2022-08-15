import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { BaseForm } from 'src/app/common/base.form/base-form';
import { CrmApiUrl } from 'src/app/common/enums/crm-api-urls.enum';
import { CrmRefType } from 'src/app/common/enums/crm-ref-type.enum';
import { SystemConfig } from 'src/app/common/enums/system-config.enum';
import { IEmployeeExperience, IEmployeeExperienceCollection } from 'src/app/main/models/employee-experience.entity';
import { COFService } from 'src/app/_service/COFService';
import { AbstractCrmRequest } from 'src/app/_shared/abstract/AbstractCrmRequest';
import { EmployeeExperience } from 'src/app/_shared/request/crm/EmployeeExperience';
import { EmployeeExperienceSave } from 'src/app/_shared/request/crm/EmployeeExperienceSave';
import { Reference } from 'src/app/_shared/request/crm/Reference';
import { SessionInfoService } from '../../../services/session-info.service';
import { IDialogPersonFormData } from '../IPersonFormInput';

@Component({
  selector: 'emp-experince-form',
  templateUrl: './EmpExperienceForm.html',
  styleUrls: ['./EmpExperienceForm.css']
})
export class EmpExperienceForm extends BaseForm implements OnInit {

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
    work_place: new FormControl(null, [
      Validators.required
    ]),
    work_address: new FormControl(null, [
      Validators.required
    ]),
    start_date: new FormControl(null, [
      Validators.required
    ]),
    position_id: new FormControl(null, [
      Validators.required
    ]),
    end_date: new FormControl(null, [
      Validators.required
    ]),
  });

  saveRequest:any;
  getRequest = new EmployeeExperience();

  setRefType = (request: Reference): void => {
    request.setTypeId(CrmRefType.POSITION);
    return;
  }

  prepareRequest(): any {
    this.saveRequest = new EmployeeExperienceSave(this.id);
    this.saveRequest.work_place = this.form.get('work_place')?.value;
    this.saveRequest.work_address = this.form.get('work_address')?.value;
    this.saveRequest.start_date = this.form.get('start_date')?.value;
    this.saveRequest.position_id = this.form.get('position_id')?.value;
    this.saveRequest.end_date = this.form.get('end_date')?.value;
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

  override afterSave(){
    this.form.reset();
    this.closeForm.emit(true);
  }


  getData() {
    this.getRequest.setId(this.id);
    this.getRequest.setCount(1);
    firstValueFrom(this.cof.doRequest(this.getRequest)).then(result => {
      if (result && !!result) {
        let itemCollection = < IEmployeeExperienceCollection > result;
        if (itemCollection.data.length > 0) {
          let item = <IEmployeeExperience>itemCollection.data[0];
          this.form.patchValue({
            work_place: item.work_place,
            work_address: item.work_address,
            start_date: item.start_date,
            position_id: item.position_id,
            end_date: item.end_date,
        })
      }
    }
    });
  }

  getLastData() {
    this.getRequest.setCount(10000);
    this.getRequest.setEmployeeId(this.employee_id);
    firstValueFrom(this.cof.doRequest(this.getRequest)).then(result => {
      if (result && !!result) {
        let itemCollection = < IEmployeeExperienceCollection > result;
        if (itemCollection.data.length > 0) {
          let item = <IEmployeeExperience>itemCollection.data[itemCollection.total_elements - 1];
          this.form.patchValue({
            work_place: item.work_place,
            work_address: item.work_address,
            start_date: item.start_date,
            position_id: item.position_id,
          })
        }
      }
    });
  }

  public setData(item:IDialogPersonFormData){
    this.id = item.id;
    this.employee_id = item.ownerId;
  }


}
