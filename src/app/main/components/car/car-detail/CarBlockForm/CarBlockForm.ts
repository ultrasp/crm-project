import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BaseForm } from "src/app/common/base.form/base-form";
import { CrmRefType } from "src/app/common/enums/crm-ref-type.enum";
import { FormDialogComponent } from "src/app/common/widgets/CrmFormDialog/CrmFormDialog";
import { COFService } from "src/app/_service/COFService";
import { CarBlockSave } from "src/app/_shared/request/crm/CarBlockSave";
import { CarUnblockSave } from "src/app/_shared/request/crm/CarUnblockSave";
import { Reference } from "src/app/_shared/request/crm/Reference";
import { RequestClassKey } from "src/app/_shared/request/crm/RequestList";

@Component({
  selector: 'car-block-form',
  templateUrl: './CarBlockForm.html',
  styleUrls: ['./CarBlockForm.css']
})
export class CarBlockForm extends BaseForm implements OnInit, FormDialogComponent {

  constructor(override cof: COFService,) {
    super(cof)
  }

  ngOnInit(): void {
    if (!this.block_id) {
      this.form.addControl('doc_number', new FormControl(null, [Validators.required]))
    }
  }

  @Input() car_id!: string;
  @Input() block_id!: string;
  @Output() closeForm = new EventEmitter();
  referenceKey: string = RequestClassKey.REFERENCE;

  override form: FormGroup = new FormGroup({
    blocker_id:new FormControl(null, []),
    blocker_person: new FormControl(null, [Validators.required]),
    date: new FormControl('', [Validators.required]),
    company_name: new FormControl('', []),
  })

  prepareRequest(): any {
    let request;
    if (!this.block_id) {
      request = new CarBlockSave();
      request.setCarId(this.car_id);
      request.setDocNumber(this.form.get('doc_number')?.value)
    } else {
      request = new CarUnblockSave();
      request.setBlockId(this.block_id)
    }
    request.setPerson(this.form.get('blocker_person')?.value)
    if(this.form.get('blocker_id')?.value == null){
      request.setCompanyName(this.form.get('company_name')?.value)
      request.blocker_id = '-1';
    }else{
      request.blocker_id = this.form.get('blocker_id')?.value;
      request.company_name = null;
    }
    request.setDate(this.form.get('date')?.value)

    return request;
  }

  override beforeSave(): void {
    if(this.form.get('blocker_id')?.value == null){
      this.form.get('company_name')?.addValidators(Validators.required);
    } else {                
        this.form.get('company_name')?.clearValidators();               
    }
    this.form.get('company_name')?.updateValueAndValidity();       
  }

  save() {
    this.saveProcess();
  }

  public setData(data: any) {
    this.car_id = data.car_id || data.ownerId;
    this.block_id = data.block_id;
  }

  override saveCallback(result: Object): void {
    this.closeForm.emit(true);
  }

  givenPlaceParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.GIVEN_PLACE);
    return;
  }

}

