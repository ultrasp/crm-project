import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { BaseForm } from 'src/app/common/base.form/base-form';
import { CrmRefType } from 'src/app/common/enums/crm-ref-type.enum';
import { IEmployeeLanguage, IEmployeeLanguageCollection } from 'src/app/main/models/employee-language.entity';
import { COFService } from 'src/app/_service/COFService';
import { EmployeeExperience } from 'src/app/_shared/request/crm/EmployeeExperience';
import { EmployeeLanguageSave } from 'src/app/_shared/request/crm/EmployeeLanguageSave';
import { Reference } from 'src/app/_shared/request/crm/Reference';
import { SessionInfoService } from '../../../services/session-info.service';
import { IDialogPersonFormData } from '../IPersonFormInput';

@Component({
  selector: 'emp-experince-form',
  templateUrl: './EmpLanguageForm.html',
  styleUrls: ['./EmpLanguageForm.css']
})
export class EmpLanguageForm extends BaseForm implements OnInit {

  constructor(override cof: COFService, private session: SessionInfoService) {
    super(cof);
  }

  ngOnInit() {
    if (this.id) {
      this.getData();
    }

    
  }

  @Input() id: string = '';
  @Input() employee_id: string = '';
  @Output() closeForm = new EventEmitter();

  override form: FormGroup = new FormGroup({
    lang_id: new FormControl(null, [Validators.required]),
    degree: new FormControl(null, [Validators.required])
  });

  saveRequest: any;
  getRequest = new EmployeeExperience();

  setLangRefType = (request: Reference): void => {
    request.setTypeId(CrmRefType.EMPLOYEE_LANGUAGE);
    return;
  }

  setDegreeRefType = (request: Reference): void => {
    request.setTypeId(CrmRefType.EMPLOYEE_DEGREE);
    return;
  }

  prepareRequest(): any {
    this.saveRequest = new EmployeeLanguageSave();
    this.saveRequest.lang_id = this.form.get('lang_id')?.value;
    this.saveRequest.degree = this.form.get('degree')?.value;
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

  override afterSave() {
    this.form.reset();
    this.closeForm.emit(true);
  }


  getData() {
    this.getRequest.setId(this.id);
    this.getRequest.setCount(1);
    firstValueFrom(this.cof.doRequest(this.getRequest)).then(result => {
      if (result && !!result) {
        let itemCollection = <IEmployeeLanguageCollection>result;
        if (itemCollection.data.length > 0) {
          let item = <IEmployeeLanguage>itemCollection.data[0];
          this.form.patchValue({
            lang_id: item.lang_id,
            degree: item.degree,
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
        let itemCollection = <IEmployeeLanguageCollection>result;
        if (itemCollection.data.length > 0) {
          let item = <IEmployeeLanguage>itemCollection.data[itemCollection.total_elements - 1];
          this.form.patchValue({
            lang_id: item.lang_id,
            degree: item.degree,
          })
        }
      }
    });
  }

  public setData(item: IDialogPersonFormData) {
    this.id = item.id;
    this.employee_id = item.ownerId;
  }
}
