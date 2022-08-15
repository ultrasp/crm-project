import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { RoleSave } from "src/app/_shared/request/crm/RoleSave";
import { BaseForm } from "src/app/common/base.form/base-form";
import { FormDialogComponent } from "src/app/common/widgets/CrmFormDialog/CrmFormDialog";
import { COFService } from "src/app/_service/COFService";

@Component({
  selector: 'crm-role-add-form',
  templateUrl: './RoleAddForm.html',
  styleUrls: ['./RoleAddForm.css'],
})

export class RoleAddForm extends BaseForm implements OnInit, FormDialogComponent {

  constructor(override cof: COFService) {
    super(cof)
  }

  ngOnInit(): void { }

  @Input() role_id!: string;
  @Output() closeForm = new EventEmitter();

  override form: FormGroup = new FormGroup({
    name: new FormControl(),
    key: new FormControl(),
    description: new FormControl(),
  });

  prepareRequest(): any {
    let request = new RoleSave();

    if (this.role_id) {
      request.setId(this.role_id);
    }

    request.setKey(this.form.get('key')?.value)
    request.setName(this.form.get('name')?.value)
    request.setDescription(this.form.get('description')?.value)
    request.role_accesses = []

    return request;
  }

  save() {
    this.saveProcess();
  }

  public setData(data: any) {
    this.role_id = data.role_id;
  }

  override saveCallback(result: Object): void {
    this.closeForm.emit(true);
  }
}
