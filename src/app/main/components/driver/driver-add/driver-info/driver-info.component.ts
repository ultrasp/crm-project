import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
})
export class DriverInfoComponent implements OnInit{
  @Input() form!: FormGroup;
  @Input() isForeign: boolean = false;
  @Input() genderParams!: (request: any) => void;
  @Input() nationalityParams!: (request: any) => void;

  ngOnInit(): void {
  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl!.status == 'INVALID' && formControl!.touched;
  }

}
