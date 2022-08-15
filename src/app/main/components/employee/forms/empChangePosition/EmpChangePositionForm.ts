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
import {Reference} from 'src/app/_shared/request/crm/Reference';
import {SessionInfoService} from '../../../services/session-info.service';
import {IDialogPersonFormData} from '../IPersonFormInput';
import {Employee} from "../../../../../_shared/request/crm/Employee";
import {EmployeeCollection, Employee as EmployeeData} from "../../../../models/employee-entity";
import {EmployeeChangePosition} from "../../../../../_shared/request/crm/EmployeeChangePosition";

@Component({
  selector: 'emp-change-position',
  templateUrl: './EmpChangePositionForm.html',
  styleUrls: ['./EmpChangePositionForm.css']
})
export class EmpChangePositionForm extends BaseForm implements OnInit, FormDialogComponent {

  constructor(override cof: COFService, private session: SessionInfoService) {
    super(cof);
  }

  ngOnInit() {
    if (this.employee_id) {
      this.getData();
    }
  }

  private currentData!: EmployeeData;

  isDataChanged() {
    return this.currentData.position_id == this.form.get('position_id')?.value &&
      this.currentData.branch_id == this.form.get('branch_id')?.value;
  }

  @Input() employee_id: string = '';
  @Output() closeForm = new EventEmitter();

  override form: FormGroup = new FormGroup({
    branch_id: new FormControl(null, [
      Validators.required
    ]),
    position_id: new FormControl(null, [
      Validators.required
    ]),
    order_date: new FormControl(null, [
      Validators.required
    ]),
    order_number: new FormControl(null, [
      Validators.required
    ]),
  });

  getRequest = new Employee();

  setRefType = (request: Reference): void => {
    request.setTypeId(CrmRefType.EDUCATION);
    return;
  }

  prepareRequest(): any {
    let request = new EmployeeChangePosition();
    request.setEmployeeId(this.employee_id);
    request.setPositionId(this.form.get('position_id')?.value);
    request.setBranchId(this.form.get('branch_id')?.value);
    return request;
  }

  save() {
    if(this.isDataChanged()) {
      this.saveProcess();
    }
    else {
      this.closeForm.emit()
    }
  }

  positionParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.POSITION);
    return;
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

  getData() {
    this.getRequest.setId(this.employee_id);
    this.getRequest.setCount(1);
    firstValueFrom(this.cof.doRequest(this.getRequest)).then(result => {
      if (result && !!result) {
        let data = <EmployeeCollection>result;
        if (data.total_elements > 0) {
          let item = data.data[0];
          this.currentData = item;
          this.form.patchValue({
            employee_id: item.id,
            branch_id: item.branch_id,
            position_id: item.position_id,
          })
        }
      }
    });
  }

  public setData(item: IDialogPersonFormData) {
    this.employee_id = item.ownerId;
  }

}
