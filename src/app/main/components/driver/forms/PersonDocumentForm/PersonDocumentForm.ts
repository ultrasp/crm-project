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
import { SystemConfig } from 'src/app/common/enums/system-config.enum';
import { CrmApiUrl } from 'src/app/common/enums/crm-api-urls.enum';
import { SessionInfoService } from '../../../services/session-info.service';
import { EmployeeAddress } from 'src/app/_shared/request/crm/EmployeeAddress';
import { CrmAddressPanel } from 'src/app/common/widgets/CrmAddressPanel/CrmAddressPanel';
import { ObjectOwnerType } from 'src/app/common/enums/object-owner-type.enum';
import { CrmRefType } from 'src/app/common/enums/crm-ref-type.enum';
import { CrmRefTypeKey } from 'src/app/common/enums/crm-ref-type.key.enum';
import { CrmPasportPanel } from 'src/app/common/widgets/CrmPasportPanel/CrmPasportPanel';
import { IDialogAddressFormData } from '../../../employee/forms/IPersonFormInput';
@Component({
  selector: 'app-PersonDocumentForm',
  templateUrl: './PersonDocumentForm.html',
  styleUrls: ['./PersonDocumentForm.css']
})
export class PersonDocumentForm extends BaseForm implements OnInit,FormDialogComponent {

  constructor(
    override cof: COFService,
  ) {
    super(cof);
  }

  @Input() id:string = '';
  @Input() ownerId:string = '';
  @Input() ownerType:ObjectOwnerType = ObjectOwnerType.EMPLOYEE;
  @Input() isAdd:boolean = true;
  @Output() closeForm = new EventEmitter();

  ngOnInit() {
  }
  @ViewChild(CrmPasportPanel) docPanel!: CrmPasportPanel;

  override form: FormGroup = new FormGroup({
    docId:new FormControl(),
    seriya: new FormControl('', [Validators.required]),
    nomer: new FormControl('', [Validators.required]),
    givenDate: new FormControl('', [Validators.required]),
    issueDate: new FormControl('', [Validators.required]),
    givenBy: new FormControl('', [Validators.required]),
    docType: new FormControl('', [Validators.required]),
  });


  getRequest = new EmployeeAddress();

  prepareRequest(): any {
    return this.docPanel.prepareSaveRequest();
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


  public setData(item:IDialogAddressFormData){
    this.ownerId = item.ownerId;
    this.ownerType = item.ownerType;
    this.form.patchValue({
      docType : item.typeId,
      docId : item.id
    });
    this.isAdd = (item as any).isAdd;
  }
}

