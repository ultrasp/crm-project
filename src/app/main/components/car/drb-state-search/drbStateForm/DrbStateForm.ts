import {BaseForm} from "../../../../../common/base.form/base-form";
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {COFService} from "../../../../../_service/COFService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IDialogPersonFormData} from "../../../employee/forms/IPersonFormInput";
import {DrbStateSave} from "../../../../../_shared/request/crm/DrbStateSave";
import {DrbStateLogList} from "../../../../../_shared/request/crm/DrbStateLogList";
import {firstValueFrom} from "rxjs";
import {IDriverCheck, IDriverCheckCollection} from "../../../../models/driver-check.entity";
import {DrbStateListCollection} from "../../../../models/drb-state-list.entity";
import {Reference} from "../../../../../_shared/request/crm/Reference";
import {CrmRefType} from "../../../../../common/enums/crm-ref-type.enum";

@Component({
  selector: 'app-drb-state-form',
  templateUrl: 'DrbStateForm.html',
})
export class DrbStateForm extends BaseForm implements OnInit {

  constructor(override cof: COFService) {
    super(cof);
  }
  @Input() typeId!: string;
  @Input() id!: string;
  @Output() closeForm = new EventEmitter();

  override form: FormGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    note: new FormControl(null, [Validators.required]),
    drb: new FormControl(null, [Validators.required]),
    drb_count: new FormControl(null, [Validators.required, Validators.max(32767)]),
    start_date: new FormControl(),
    end_date: new FormControl(),
    state_id: new FormControl(1, [Validators.required]),
  })

  ngOnInit(): void {
    if(this.id)
      this.getData();

    if(this.typeId === '5')
    {
      this.form.get('start_date')?.addValidators(Validators.required);
      this.form.get('end_date')?.addValidators(Validators.required);
    }
  }

  stateRequest(request: Reference) {
    request.setTypeId(CrmRefType.CAR_DRB_STATE);
  }

  getData() {
    let request = new DrbStateLogList();
    request.setCount(1);
    request.setId(this.id);
    firstValueFrom(this.cof.doRequest(request)).then(result => {
      if (result && !!result) {
        let itemCollection = < DrbStateListCollection > result;
        if (itemCollection.data.length > 0) {
          let row = itemCollection.data[0];
          this.form.patchValue({
            note: row.note,
            date: row.date,
            drb: row.drb,
            drb_count: row.drb_count,
            start_date: row.start_date,
            end_date: row.end_date,
            state_id: row.state_id,
          })
        }
      }
    });
  }


  save() {
    this.saveProcess();
  }


  override afterSave(){
    this.form.reset();
    this.closeForm.emit(true);
  }

  public setData(item:IDialogPersonFormData){
    this.id = item.id;
    this.typeId = item.ownerId;
  }

  prepareRequest(): any {
    let request = new DrbStateSave();
    request.note = this.form.get('note')?.value;
    request.date = this.form.get('date')?.value;
    request.drb = this.form.get('drb')?.value;
    request.drb_count = this.form.get('drb_count')?.value;
    request.start_date = this.form.get('start_date')?.value;
    request.end_date = this.form.get('end_date')?.value;
    request.state_id = this.id ? this.form.get('state_id')?.value : 1;
    request.type_id = this.typeId;
    if(this.id)
      request.id = this.id;
    return request;
  }

}
