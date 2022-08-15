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
import {AttributeParamConfig} from "../AttributeSetupPanel/AttributeParam/AttributeParamConfig";

@Component({
  selector: 'crm-ownership-2',
  templateUrl: './CrmOwnerShip2.html',
  styleUrls: ['./CrmOwnerShip2.css']
})
export class CrmOwnerShip2 implements OnInit {

  constructor(private cof: COFService) {}

  ngOnInit() {
  }
  @Input() form!: FormGroup;
  @Input() inputsUIType?: string;
  @Input() carSalonParam!:AttributeParamConfig;

  setRefType = (request: Reference): void => {
    request.setTypeId(CrmRefType.OWNERSHIP_DOC_TYPE);
    return;
  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl != null && formControl!.status == 'INVALID' && formControl!.touched;
  }
}

