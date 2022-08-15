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
import { IDialogAddressFormData, IDialogPersonFormData } from '../IPersonFormInput';
import { CrmRefType } from 'src/app/common/enums/crm-ref-type.enum';
import { CrmRefTypeKey } from 'src/app/common/enums/crm-ref-type.key.enum';
@Component({
  selector: 'app-EmpAddressForm',
  templateUrl: './EmpAddressForm.html',
  styleUrls: ['./EmpAddressForm.css']
})
export class EmpAddressForm extends BaseForm implements OnInit,FormDialogComponent {

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
  @ViewChild(CrmAddressPanel) addressPanel!: CrmAddressPanel;

  override form: FormGroup = new FormGroup({
    region: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    livePlace: new FormControl(),
    street:new FormControl('', []),
    note:new  FormControl('', []),
    house:new FormControl('', []),
    korpus:new FormControl('', []),
    flat:new FormControl('', []),
    addrTypeId:new FormControl(null,[Validators.required]),
    cadas_id: new FormControl(),
  });


  getRequest = new EmployeeAddress();

  prepareRequest(): any {
    return this.addressPanel.prepareSaveRequest();
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

  setRefType = (request: Reference): void => {
    request.setTypeId(this.ownerType ==  ObjectOwnerType.EMPLOYEE ? CrmRefType.EMP_ADDRESS_TYPE : CrmRefType.Driver_ADDRESS_TYPE);
    return;
  }


  public setData(item:IDialogAddressFormData){
    this.id = item.id;
    this.ownerId = item.ownerId;
    this.ownerType = item.ownerType;
    this.form.patchValue({
      addrTypeId : item.typeId
    });
    this.isAdd = (item as any).isAdd;
  }
}

