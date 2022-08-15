import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  firstValueFrom
} from 'rxjs';
import {
  COFService
} from 'src/app/_service/COFService';
import { EmployeeAward } from 'src/app/_shared/request/crm/EmployeeAward';
import { EmpAwardCollection,EmpAward } from 'src/app/main/models/emp-award.entity'
import { Reference } from 'src/app/_shared/request/crm/Reference';
import { BaseForm } from 'src/app/common/base.form/base-form';
import { FormDialogComponent } from 'src/app/common/widgets/CrmFormDialog/CrmFormDialog';
import { EmployeeAwardSave } from 'src/app/_shared/request/crm/EmployeeAwardSave';
import { SessionInfoService } from '../../../services/session-info.service';
import { IDialogPersonFormData } from '../IPersonFormInput';
import { CrmRefType } from 'src/app/common/enums/crm-ref-type.enum';
@Component({
  selector: 'app-EmpAwardForm',
  templateUrl: './EmpAwardForm.html',
  styleUrls: ['./EmpAwardForm.css']
})
export class EmpAwardForm extends BaseForm implements OnInit,FormDialogComponent {

  constructor(
    override cof: COFService,
    private session:SessionInfoService
  ) {
    super(cof);
  }

  @Input() id:string = '';
  @Input() employee_id:string = '';
  @Output() closeForm = new EventEmitter();

  ngOnInit() {
    if (this.id) {
      this.getAwardData();
    }
  }
  override form: FormGroup = new FormGroup({
    award_id: new FormControl(null,[
      Validators.required]),
    award_date: new FormControl(null,[
      Validators.required]),
    comment: new FormControl(null,[]),
  });

  saveRequest?:any;
  getRequest = new EmployeeAward();

  prepareRequest(): any {
    this.saveRequest = new EmployeeAwardSave(this.id);
    this.saveRequest.award_id = this.form.get('award_id')?.value;
    this.saveRequest.award_date = this.form.get('award_date')?.value;
    this.saveRequest.comment = this.form.get('comment')?.value;
    this.saveRequest.edit_by = this.session.getSesionInfo().data?.user_info.employee_id;
    this.saveRequest.employee_id = this.employee_id;
    return this.saveRequest;
  }

  save() {
    this.saveProcess();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  override saveCallback(result: Object): void {
    this.closeForm.emit(true);
  }


  getAwardData() {
    this.getRequest.setId(this.id);
    this.getRequest.setCount(1);
    firstValueFrom(this.cof.doRequest(this.getRequest)).then(result => {
      if (result && !!result) {
        let awardResponce = < EmpAwardCollection > result;
        if (awardResponce.data.length > 0) {
          let award = <EmpAward>awardResponce.data[0];
          this.form.patchValue({
            award_id: award.award_id,
            award_date: award.award_date,
            comment: award.comment,
          });
        }
      }
    });
  }

  setRefType = (request: Reference): void => {
    request.setTypeId(CrmRefType.AWARD);
    return;
  }

  public setData(item:IDialogPersonFormData){
    this.id = item.id;
    this.employee_id = item.ownerId;
  }
}

