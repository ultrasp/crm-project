import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray, FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  COFService
} from 'src/app/_service/COFService';
import { BaseForm } from 'src/app/common/base.form/base-form';
import { FormDialogComponent } from 'src/app/common/widgets/CrmFormDialog/CrmFormDialog';
import { IDialogAddressFormData } from '../../../employee/forms/IPersonFormInput';
import {DriverCertificateHistorySave} from "../../../../../_shared/request/crm/DriverCertificateHistorySave";
import {SelectionModel} from "@angular/cdk/collections";
import {DriverCategoryUtil} from "../../DriverDetail/DriverCategoryUtil";
@Component({
  selector: 'app-DriverCertHistoryForm',
  templateUrl: 'DriverCertHistoryForm.html',
  styleUrls: ['DriverCertHistoryForm.css']
})
export class DriverCertHistoryForm extends BaseForm implements OnInit,FormDialogComponent {

  constructor(
    override cof: COFService,
    private fb: FormBuilder,
  ) {
    super(cof);
  }

  @Input() id:string = '';
  @Input() ownerId:string = '';
  @Output() closeForm = new EventEmitter();
  selection = new SelectionModel<any>(true, []);
  get categories() {
    return this.form.controls["categories"] as FormArray;
  }
  ngOnInit() {
    let catKeys = DriverCategoryUtil.getKeys();
    catKeys.forEach(title => {
      const row = this.fb.group({
        checked: [false, []],
        key: DriverCategoryUtil.getKeyValue(title),
        title: title
      });
      this.categories.push(row);
    });
  }

  override form: FormGroup = new FormGroup({
    doc_num:new FormControl('', [Validators.required]),
    doc_ser: new FormControl('', [Validators.required]),
    note: new FormControl('', [Validators.required]),
    flag: new FormControl('', [Validators.required]),
    given_date: new FormControl('', [Validators.required]),
    issue_date: new FormControl('', [Validators.required]),
    categories: this.fb.array([]),
  });



  prepareRequest(): any {
    let request = new DriverCertificateHistorySave();
    request.doc_num = this.form.get('doc_num')?.value;
    request.driver_id = this.ownerId;
    request.note = this.form.get('note')?.value;
    request.flag = this.form.get('flag')?.value;
    request.doc_ser = this.form.get('doc_ser')?.value;
    request.given_date = this.form.get('given_date')?.value;
    request.issue_date = this.form.get('issue_date')?.value;
    return request;
  }

  save() {
    this.saveProcess();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }


  override afterSave(){
    this.closeForm.emit(true);
  }

  onChecked(categoryForm: any){
    this.form.patchValue({
      flag:this.getFlagValue()
    })
  }

  getFlagValue() {
    let flag= 0;
    this.categories.value.forEach((result: any) => {
      if (result && result.checked) {
        flag = flag | result.key ;
      }
    })
    return flag;
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return '';
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }


  public setData(item:IDialogAddressFormData){
    this.ownerId = item.ownerId;
  }
}

