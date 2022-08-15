import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import {
  BaseForm
} from 'src/app/common/base.form/base-form';
import {CrmApiUrl} from 'src/app/common/enums/crm-api-urls.enum';
import {CrmRefType} from 'src/app/common/enums/crm-ref-type.enum';
import {SystemConfig} from 'src/app/common/enums/system-config.enum';
import {FormDialogComponent} from 'src/app/common/widgets/CrmFormDialog/CrmFormDialog';
import {
  COFService
} from 'src/app/_service/COFService';
import {Reference} from 'src/app/_shared/request/crm/Reference';
import {SessionInfoService} from '../../../services/session-info.service';
import {IDialogPersonFormData} from '../IPersonFormInput';
import {Employee} from "../../../../../_shared/request/crm/Employee";
import {EmployeeCollection} from "../../../../models/employee-entity";
import {EmployeeChangeMilitaryTitle} from "../../../../../_shared/request/crm/EmployeeChangeMilitaryTitle";

@Component({
  selector: 'emp-change-military-title',
  templateUrl: './EmpChangeMilitaryTitleForm.html',
  styleUrls: ['./EmpChangeMilitaryTitleForm.css']
})
export class EmpChangeMilitaryTitleForm extends BaseForm implements OnInit, FormDialogComponent {

  constructor(override cof: COFService, private session: SessionInfoService) {
    super(cof);
  }

  ngOnInit() {
    if (this.employee_id) {
      this.getData();
    }
  }

  @Input() employee_id: string = '';
  @Output() closeForm = new EventEmitter();
  militaryDegreeParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.MILITARY_DEGREE);
    return;
  }

  override form: FormGroup = new FormGroup({
    military_title_id: new FormControl(null, [
      Validators.required
    ]),
    comment: new FormControl(null, [
      Validators.required
    ]),
    given_by: new FormControl(null, [
      Validators.required
    ]),
    military_date: new FormControl(null, [
      Validators.required
    ]),
  });

  saveRequest: any;
  getRequest = new Employee();

  setRefType = (request: Reference): void => {
    request.setTypeId(CrmRefType.EDUCATION);
    return;
  }

  prepareRequest(): any {
    let request = new EmployeeChangeMilitaryTitle();
    request.military_title_id = this.form.get('military_title_id')?.value;
    request.given_by = this.form.get('given_by')?.value;
    request.military_date = this.form.get('military_date')?.value;
    request.comment = this.form.get('comment')?.value;
    request.employee_id = this.employee_id;
    return request;
  }

  save() {
    this.saveProcess();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  override beforeSave() {
  }

  getData() {
    this.getRequest.setId(this.employee_id);
    this.getRequest.setCount(1);
    firstValueFrom(this.cof.doRequest(this.getRequest)).then(result => {
      if (result && !!result) {
        let data = <EmployeeCollection>result;
        if (data.total_elements > 0) {
          let item = data.data[0];
          this.form.patchValue({
            military_title_id: item.military_title_id,
          })
        }
      }
    });
  }

  public setData(item: IDialogPersonFormData) {
    this.employee_id = item.ownerId;
  }

  override saveCallback(result: Object): void {
    this.form.reset();
    this.closeForm.emit(true);
  }

}
