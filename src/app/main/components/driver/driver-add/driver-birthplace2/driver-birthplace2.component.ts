import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Reference} from "../../../../../_shared/request/crm/Reference";
import {CrmRefType} from "../../../../../common/enums/crm-ref-type.enum";
import {Address} from "../../../../../_shared/request/crm/Address";
import {AddressType} from "../../../../../common/enums/address-type.enum";


@Component({
  selector: 'app-driver-birth-place-2',
  templateUrl: './driver-birthplace2.component.html',
  styleUrls: ['./driver-birthplace2.component.css'],
})
export class DriverBirthplace2Component implements OnInit {
  @Input() inputUIType?:string;

  countryParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CITIZENSHIP);
    return;
  }
  setRegionParam = (request:Address):void =>{
    request.setType(AddressType.REGION);
  }

  setCityParam = (request: Address): void => {
    request.setType(AddressType.CITY);
    if (this.form.get('born_region_id')?.value !== undefined)
      request.setParentId((this.form.get('born_region_id')?.value) ? this.form.get('born_region_id')?.value : '-1');
    else
      request.setParentId('-1');
    return;
  }
  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl!.status == 'INVALID' && formControl!.touched;
  }
  @Input() form!:  FormGroup;
  ngOnInit(): void {
  }

}
