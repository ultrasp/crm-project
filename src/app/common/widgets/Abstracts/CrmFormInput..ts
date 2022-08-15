import {
  Component,
  Input
} from "@angular/core";
@Component({
  template: ''
})
export abstract class CrmFormInput {
  @Input() label ? : string
  @Input() isRequired: boolean = false;
  @Input() haslabel  : boolean = true;
  @Input() labelSize: number = 30;

}
