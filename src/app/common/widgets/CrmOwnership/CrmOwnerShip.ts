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
  COFService
} from 'src/app/_service/COFService';
import { Reference } from 'src/app/_shared/request/crm/Reference';
import { CrmRefType } from '../../enums/crm-ref-type.enum';

@Component({
  selector: 'crm-ownership',
  templateUrl: './CrmOwnerShip.html',
  styleUrls: ['./CrmOwnerShip.css']
})
export class CrmOwnerShip implements OnInit {

  constructor(private cof: COFService) {}

  ngOnInit() {
  }
  @Input() form!: FormGroup;
  @Input() inputsUIType?: string;

  setRefType = (request: Reference): void => {
    request.setTypeId(CrmRefType.OWNERSHIP_DOC_TYPE);
    return;
  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);    
    return formControl != null && formControl!.status == 'INVALID' && formControl!.touched;
  }
}

