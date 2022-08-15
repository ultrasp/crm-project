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
import {BaseForm} from 'src/app/common/base.form/base-form';
import {FormDialogComponent} from 'src/app/common/widgets/CrmFormDialog/CrmFormDialog';
import {IDialogPersonFormData} from '../IPersonFormInput';
import {IEmpPunish, IEmpPunishCOllection} from 'src/app/main/models/employee-punish.entity';
import {EmployeePunish} from 'src/app/_shared/request/crm/EmployeePunish';
import {EmployeePunishSave} from 'src/app/_shared/request/crm/EmployeePunishSave';

@Component({
  selector: 'app-file-change',
  templateUrl: './EmpFileChangeForm.html',
  styleUrls: ['./EmpFileChangeForm.css']
})
export class EmpFileChangeForm extends BaseForm implements OnInit, FormDialogComponent {

  constructor(
    override cof: COFService,
  ) {
    super(cof);
  }

  @Input() id: string = '';
  @Input() employee_id: string = '';
  @Output() closeForm = new EventEmitter();

  ngOnInit() {
    if (this.id) {
      this.getAwardData();
    }
  }

  override form: FormGroup = new FormGroup({
    punish_id: new FormControl(null, [
      Validators.required]),
    punish_date: new FormControl(null, [
      Validators.required]),
    comment: new FormControl(null, []),
  });

  saveRequest?: any;
  getRequest = new EmployeePunish();

  prepareRequest(): any {
    this.saveRequest = new EmployeePunishSave(this.id);
    this.saveRequest.punish_id = this.form.get('punish_id')?.value;
    this.saveRequest.punish_date = this.form.get('punish_date')?.value;
    this.saveRequest.comment = this.form.get('comment')?.value;
    this.saveRequest.employee_id = this.employee_id;
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
    this.closeForm.emit();
  }

  getAwardData() {
    this.getRequest.setId(this.id);
    this.getRequest.setCount(1);
    firstValueFrom(this.cof.doRequest(this.getRequest)).then(result => {
      if (result && !!result) {
        let collection = <IEmpPunishCOllection>result;
        if (collection.data.length > 0) {
          let obj = <IEmpPunish>collection.data[0];
          this.form.patchValue({
            punish_id: obj.punish_id,
            punish_date: obj.punish_date,
            comment: obj.comment,
          });
        }
      }
    });
  }


  close() {

  }

  public setData(item: IDialogPersonFormData) {
    this.id = item.id;
    this.employee_id = item.ownerId;
  }

}

