import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COFService } from 'src/app/_service/COFService';
import { BaseForm } from 'src/app/common/base.form/base-form';
import { FormDialogComponent } from 'src/app/common/widgets/CrmFormDialog/CrmFormDialog';
import { IDialogPersonFormData } from '../IPersonFormInput';
import { EmployeePunish } from 'src/app/_shared/request/crm/EmployeePunish';
import { EmployeePunishSave } from 'src/app/_shared/request/crm/EmployeePunishSave';
import { firstValueFrom } from 'rxjs';
import { IEmpPunish, IEmpPunishCOllection } from 'src/app/main/models/employee-punish.entity';

@Component({
  selector: 'app-EmpPunishRemoveForm',
  templateUrl: './EmpPunishRemoveForm.html',
})

export class EmpPunishRemoveForm extends BaseForm implements OnInit, FormDialogComponent {

  constructor(override cof: COFService,) {
    super(cof);
  }

  @Input() id: string = '';
  @Input() employee_id: string = '';
  @Output() closeForm = new EventEmitter();
  punish_id!:number;

  ngOnInit() { 
    if (this.id) {
      this.getAwardData();
    }
  }

  override form: FormGroup = new FormGroup({
    punish_date: new FormControl(null, [Validators.required])
  });

  saveRequest?: any;
  getRequest = new EmployeePunish();

  prepareRequest(): any {
    this.saveRequest = new EmployeePunishSave(this.id);
    this.saveRequest.id = this.id;
    this.saveRequest.employee_id = this.employee_id;
    this.saveRequest.punish_id = this.punish_id;
    this.saveRequest.punish_date = this.form.get('punish_date')?.value;
    return this.saveRequest;
  }

  save() {
    this.saveProcess();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  override saveCallback(result: Object): void {
    this.form.reset();
    this.closeForm.emit(true);
  }

  close() { }

  getAwardData() {
    this.getRequest.setId(this.id);
    this.getRequest.setCount(1);
    firstValueFrom(this.cof.doRequest(this.getRequest)).then(result => {
      if (result && !!result) {
        let collection = < IEmpPunishCOllection > result;
        if (collection.data.length > 0) {
          let obj = <IEmpPunish>collection.data[0];
          this.punish_id = obj.punish_id;
        }
      }
    });
  }
  public setData(item: IDialogPersonFormData) {
    this.id = item.id;
    this.employee_id = item.ownerId;
  }
}

