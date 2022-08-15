import {BaseForm} from "../../../../../common/base.form/base-form";
import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Reference} from "../../../../../_shared/request/crm/Reference";
import {CrmRefType} from "../../../../../common/enums/crm-ref-type.enum";
import {firstValueFrom} from "rxjs";
import {IDialogPersonFormData} from "../../../employee/forms/IPersonFormInput";
import {BranchPositionList} from "../../../../../_shared/request/crm/BranchPositionList";
import {COFService} from "../../../../../_service/COFService";
import {BranchPositionSave} from "../../../../../_shared/request/crm/BranchPositionSave";
import {BranchPositionCollection} from "../../../../models/branch-position-entity";


@Component({
  selector: 'app-branch-position-form',
  templateUrl: 'BranchPositionForm.html',
})
export class BranchPositionForm extends BaseForm implements OnInit {
  constructor(override cof: COFService) {
    super(cof);
  }
  id!: string;
  branchId!: string;
  ngOnInit(): void {
    if(this.id) {
      this.getData();
    }
  }

  @Output() closeForm: EventEmitter<any> = new EventEmitter<any>();


  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  override afterSave() {
    this.form.reset();
    this.closeForm.emit();
  }

  getRequest = new BranchPositionList();

  getData() {
    this.getRequest.setId(this.id);
    this.getRequest.setCount(1);
    firstValueFrom(this.cof.doRequest(this.getRequest)).then(result => {
      if (result && !!result) {
        let data = <BranchPositionCollection>result;
        if (data.total_elements > 0) {
          let item = data.data[0];
          this.form.patchValue({
            position_id: item.position_id,
            quantity: item.quantity,
            start_date: item.start_date,
            end_date: item.end_date,
          })
        }
      }
    });
  }

  public setData(item: IDialogPersonFormData) {
    this.branchId = item.id;
    this.id = item.ownerId;
  }

  positionParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.POSITION);
    return;
  }

  override form: FormGroup = new FormGroup({
    position_id: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required]),
    start_date: new FormControl(null, [Validators.required]),
    end_date: new FormControl(null, []),
  });

  prepareRequest(): any {
    let request = new BranchPositionSave();
    request.id = this.id;
    request.position_id =  this.form.get('position_id')?.value;
    request.quantity = this.form.get('quantity')?.value,
    request.start_date = this.form.get('start_date')?.value;
    request.end_date =this.form.get('end_date')?.value;
    request.setBranchId(this.branchId);
    return request;
  }

}
