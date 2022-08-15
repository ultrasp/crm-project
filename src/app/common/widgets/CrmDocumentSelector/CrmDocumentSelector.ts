import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Reference
} from 'src/app/_shared/request/crm/Reference';
import {
  BaseForm
} from '../../base.form/base-form';
import {
  CrmRefType
} from '../../enums/crm-ref-type.enum';
import { ObjectOwnerType } from '../../enums/object-owner-type.enum';
import {
  ISelectOption
} from '../CrmSelect/CrmSelect';

@Component({
  selector: 'crm-document-selector',
  templateUrl: './CrmDocumentSelector.html',
  styleUrls: ['./CrmDocumentSelector.css']
})
export class CrmDocumentSelector implements OnInit {

  types: ISelectOption[] = [{
    key: 'pasport',
    title: "Паспорт"
  }];

  @Input() ownerId!: string ;
  @Input() ownerType: ObjectOwnerType = ObjectOwnerType.EMPLOYEE;
  @Input() typeId!:string;

  constructor() {
  }

  private form: FormGroup = new FormGroup({
    seriya: new FormControl('', [Validators.required]),
    nomer: new FormControl('', [Validators.required]),
    givenDate: new FormControl('', [Validators.required]),
    issueDate: new FormControl('', [Validators.required]),
    givenBy: new FormControl('', [Validators.required]),
    docType:new FormControl('', [Validators.required]),
  })

  ngOnInit() {}

  documentTypeParams = (request: Reference): void => {
    request.setTypeId( this.ownerType == ObjectOwnerType.EMPLOYEE ? CrmRefType.EMP_DOC_TYPES : CrmRefType.PERSON_DOC_TYPE);
    return;
  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl!.status == 'INVALID' && formControl!.touched;
  }

}
