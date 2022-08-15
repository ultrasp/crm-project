import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import {
  BaseForm
} from 'src/app/common/base.form/base-form';
import { CrmApiUrl } from 'src/app/common/enums/crm-api-urls.enum';
import { CrmRefType } from 'src/app/common/enums/crm-ref-type.enum';
import { SystemConfig } from 'src/app/common/enums/system-config.enum';
import { FormDialogComponent } from 'src/app/common/widgets/CrmFormDialog/CrmFormDialog';
import { IEmployeeAddress, IEmployeeAddressCollection } from 'src/app/main/models/employee-education.entity';
import {
  COFService
} from 'src/app/_service/COFService';
import { AbstractCrmRequest } from 'src/app/_shared/abstract/AbstractCrmRequest';
import { EmployeeAddressSave } from 'src/app/_shared/request/crm/EmployeeAddressSave';
import { EmployeeEducation } from 'src/app/_shared/request/crm/EmployeeEducation';
import { EmployeeEducationSave } from 'src/app/_shared/request/crm/EmployeeEducationSave';
import { Reference } from 'src/app/_shared/request/crm/Reference';
import { SessionInfoService } from '../../../services/session-info.service';
import { IDialogPersonFormData } from '../IPersonFormInput';

@Component({
  selector: 'emp-education',
  templateUrl: './EmpEducationForm.html',
  styleUrls: ['./EmpEducationForm.css']
})
export class EmpEducationForm extends BaseForm implements OnInit,FormDialogComponent {

  constructor(override cof: COFService,     private session:SessionInfoService
    ) {
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
    educ_address: new FormControl(null, [
      Validators.required
    ]),
    educ_organization: new FormControl(null, [
      Validators.required
    ]),
    start_date: new FormControl(null, [
      Validators.required
    ]),
    end_date: new FormControl(null, [
      Validators.required
    ]),
    type_id: new FormControl(null, [
      Validators.required
    ]),
    document_number: new FormControl(null, [
      Validators.required
    ]),
  });

  saveRequest:any;
  getRequest = new EmployeeEducation();

  setRefType = (request: Reference): void => {
    request.setTypeId(CrmRefType.EDUCATION);
    return;
  }

  prepareRequest(): any {
    this.saveRequest = new EmployeeEducationSave(this.id);
    this.saveRequest.educ_address = this.form.get('educ_address')?.value;
    this.saveRequest.educ_organization = this.form.get('educ_organization')?.value;
    this.saveRequest.end_date = this.form.get('end_date')?.value;
    this.saveRequest.start_date = this.form.get('start_date')?.value;
    this.saveRequest.type_id = this.form.get('type_id')?.value;
    this.saveRequest.document_number = this.form.get('document_number')?.value;
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
        let itemCollection = < IEmployeeAddressCollection > result;
        if (itemCollection.data.length > 0) {
          let item = <IEmployeeAddress>itemCollection.data[0];
          this.form.patchValue({
            educ_address: item.educ_address,
            educ_organization: item.educ_organization,
            start_date: item.start_date,
            end_date: item.end_date,
            type_id: item.type_id,
            employee_id:item.employee_id,
            document_number:item.document_number
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
