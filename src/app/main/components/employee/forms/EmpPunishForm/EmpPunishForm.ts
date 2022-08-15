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
import { Reference } from 'src/app/_shared/request/crm/Reference';
import { BaseForm } from 'src/app/common/base.form/base-form';
import { FormDialogComponent } from 'src/app/common/widgets/CrmFormDialog/CrmFormDialog';
import { IDialogPersonFormData } from '../IPersonFormInput';
import { IEmpPunish, IEmpPunishCOllection } from 'src/app/main/models/employee-punish.entity';
import { CrmRefType } from 'src/app/common/enums/crm-ref-type.enum';
import { EmployeePunish } from 'src/app/_shared/request/crm/EmployeePunish';
import { EmployeePunishSave } from 'src/app/_shared/request/crm/EmployeePunishSave';
@Component({
  selector: 'app-EmpPunishForm',
  templateUrl: './EmpPunishForm.html',
  styleUrls: ['./EmpPunishForm.css']
})
export class EmpPunishForm extends BaseForm implements OnInit,FormDialogComponent {

  constructor(
    override cof: COFService,
  ) {
    super(cof);
  }

  @Input() id:string = '';
  @Input() employee_id:string = '';
  @Output() closeForm = new EventEmitter();
  d: Date = new Date();

  ngOnInit() {
    if (this.id) {
      this.getAwardData();
    }
  }
  override form: FormGroup = new FormGroup({
    punish_id: new FormControl(null,[
      Validators.required]),
    punish_date: new FormControl(this.d.setFullYear(this.d.getFullYear() + 10),[
      Validators.required]),
    comment: new FormControl(null,[]),
    article: new FormControl(null,[Validators.required]),
    order_by: new FormControl(null,[Validators.required]),
    order_no: new FormControl(null,[Validators.required]),
  });

  saveRequest?:any;
  getRequest = new EmployeePunish();

  prepareRequest(): any {
    this.saveRequest = new EmployeePunishSave(this.id);
    this.saveRequest.punish_id = this.form.get('punish_id')?.value;
    this.saveRequest.punish_date = this.form.get('punish_date')?.value;
    this.saveRequest.comment = this.form.get('comment')?.value;
    this.saveRequest.article = this.form.get('article')?.value;
    this.saveRequest.order_by = this.form.get('order_by')?.value;
    this.saveRequest.order_no = this.form.get('order_no')?.value;
    this.saveRequest.employee_id = this.employee_id;
    this.saveRequest.id = this.id;
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

  getAwardData() {
    this.getRequest.setId(this.id);
    this.getRequest.setCount(1);
    firstValueFrom(this.cof.doRequest(this.getRequest)).then(result => {
      if (result && !!result) {
        let collection = < IEmpPunishCOllection > result;
        if (collection.data.length > 0) {
          let obj = <IEmpPunish>collection.data[0];
          this.form.patchValue({
            punish_id: obj.punish_id,
            punish_date: obj.punish_date,
            comment: obj.comment,
            order_by: obj.order_by,
            order_no: obj.order_no,
            article: obj.article,
          });
        }
      }
    });
  }

  setRefType = (request: Reference): void => {
    request.setTypeId(CrmRefType.PUNISH);
    return;
  }

  close(){

  }

  public setData(item:IDialogPersonFormData){
    this.id = item.id;
    this.employee_id = item.ownerId;
  }

}

