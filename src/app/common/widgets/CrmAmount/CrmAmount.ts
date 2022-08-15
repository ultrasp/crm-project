import {CrmFormInput} from "../Abstracts/CrmFormInput.";
import {Component, Input, OnInit} from "@angular/core";
import {ControlValueAccessor} from "@angular/forms";

@Component({
  selector: 'crm-amount',
  templateUrl: './CrmAmount.html',
  styleUrls: ['./CrmAmount.css'],
})
export class CrmAmount extends CrmFormInput implements OnInit, ControlValueAccessor {

  @Input() placeHolder?: string;
  @Input() get value(): string {
    return this._value;
  }
  set value(value: string) {
    this._value = value;
  }
  @Input() isEnabled: boolean = true;
  @Input() showError: boolean =  false;

  private _value: string = '';
  onChange: any = () => { };
  onTouched: any = () => { };


  constructor() {super()}

  ngOnInit() {}

  valueChanged(){
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isEnabled = !isDisabled;
  }


  onBlur() {
    this.value = (parseFloat(this.value).toFixed(2));
  }

}
