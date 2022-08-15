import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";
import {
  FormControl,
  FormGroup
} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import {
  BaseForm
} from "src/app/common/base.form/base-form";
import {
  FormDialogComponent
} from "src/app/common/widgets/CrmFormDialog/CrmFormDialog";
import {
  ISelectOption
} from "src/app/common/widgets/CrmSelect/CrmSelect";
import {
  COFService
} from "src/app/_service/COFService";
import {
  RoleAccessSave
} from "src/app/_shared/request/crm/RoleAccessSave";

@Component({
  selector: 'crm-role-link-access-form',
  templateUrl: './RoleAccessLinkForm.html',
  styleUrls: ['./RoleAccessLinkForm.css'],
})

export class RoleAccessLinkForm extends BaseForm implements OnInit, FormDialogComponent {

  constructor(override cof: COFService, private translate: TranslateService) {
    super(cof)
  }

  ngOnInit(): void {}

  @Input() role_id!: string;
  @Output() closeForm = new EventEmitter();

  override form: FormGroup = new FormGroup({
    access_id: new FormControl(),
    type: new FormControl(),
  });

  readonly ROLE_READER = '1';
  readonly ROLE_WRITER = '2';
  readonly ROLE_REDACTOR = '4';
  typeOptions:any[]  =   [
    {
      key: this.ROLE_READER,
      title: this.translate.instant(`ROLE_ACCESS.${this.ROLE_READER}`)
    },
    {
      key: this.ROLE_WRITER,
      title: this.translate.instant(`ROLE_ACCESS.${this.ROLE_WRITER}`)
    },
    {
      key: this.ROLE_REDACTOR,
      title: this.translate.instant(`ROLE_ACCESS.${this.ROLE_REDACTOR}`)
    },
  ];


  prepareRequest(): any {
    let request = new RoleAccessSave();

    if (this.role_id) {
      request.setRoleId(parseInt(this.role_id));
    }

    request.setAccessId(this.form.get('access_id')?.value)
    request.setType(this.form.get('type')?.value)
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

