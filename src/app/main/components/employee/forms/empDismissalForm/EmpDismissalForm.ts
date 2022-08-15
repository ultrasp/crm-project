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
import {IEmployeeAddress, IEmployeeAddressCollection} from 'src/app/main/models/employee-education.entity';
import {
  COFService
} from 'src/app/_service/COFService';
import {AbstractCrmRequest} from 'src/app/_shared/abstract/AbstractCrmRequest';
import {EmployeeAddressSave} from 'src/app/_shared/request/crm/EmployeeAddressSave';
import {EmployeeEducation} from 'src/app/_shared/request/crm/EmployeeEducation';
import {Reference} from 'src/app/_shared/request/crm/Reference';
import {SessionInfoService} from '../../../services/session-info.service';
import {IDialogPersonFormData} from '../IPersonFormInput';
import {Employee} from "../../../../../_shared/request/crm/Employee";
import {EmployeeCollection, Employee as EmployeeData} from "../../../../models/employee-entity";
import { EmployeeDismissal } from 'src/app/_shared/request/crm/EmployeeDismissal';

@Component({
  selector: 'emp-dismissal',
  templateUrl: './EmpDismissalForm.html',
  styleUrls: ['./EmpDismissalForm.css']
})
export class EmpDismissalForm extends BaseForm implements OnInit, FormDialogComponent {

  constructor(override cof: COFService, private session: SessionInfoService) {
    super(cof);
  }

  ngOnInit() {

  }


  @Input() employee_id: string = '';
  @Output() closeForm = new EventEmitter();

  override form: FormGroup = new FormGroup({
    comment: new FormControl(null, [
      Validators.required
    ]),
    order_date: new FormControl(null, [
      Validators.required
    ]),
    order_number: new FormControl(null, [
      Validators.required
    ]),
    dismiss_type:new FormControl(null, [
      Validators.required
    ]),
  });

  getRequest = new Employee();

  setRefType = (request: Reference): void => {
    request.setTypeId(CrmRefType.EDUCATION);
    return;
  }
  setDismissReason =(request: Reference): void => {
    request.setTypeId(CrmRefType.DISMISS_REASON_TYPE);
    return;
  }

  prepareRequest(): any {
    let saveRequest = new EmployeeDismissal();
    saveRequest.note = this.form.get('comment')?.value;
    saveRequest.employee_id = this.employee_id;
    saveRequest.left_date = this.form.get('order_date')?.value;
    saveRequest.document_number = this.form.get('order_number')?.value;
    saveRequest.reason_id = this.form.get('dismiss_type')?.value;
    
    return saveRequest;
  }

  save() {
    this.saveProcess();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  override beforeSave() {
  }

  override saveCallback(result: Object): void {
    this.form.reset();
    this.closeForm.emit(true);
  }

  public setData(item: IDialogPersonFormData) {
    this.employee_id = item.ownerId;
  }

}
