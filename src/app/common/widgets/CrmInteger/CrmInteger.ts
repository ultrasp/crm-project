import {CrmFormInput} from "../Abstracts/CrmFormInput.";
import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'crm-integer',
  templateUrl: './CrmInteger.html',
  styleUrls: ['./CrmInteger.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CrmInteger),
      multi: true
    }
  ]
})
export class CrmInteger extends CrmFormInput implements OnInit, ControlValueAccessor {

  @Input() placeHolder?: string;
  @Input() inputUIType?: string;
  @Input() get value(): string {
    return this._value;
  }
  set value(value: string) {
    this._value = value;
  }
  @Input() showError: boolean =  false;
  @Output() valueChange = new EventEmitter<string>();

  private _value: string = '';
  onChange: any = () => { };
  onTouched: any = () => { };
  @Input() isEnabled: boolean = true;
  @Input() maxLength:number = 300;

  constructor() {super()}

  ngOnInit() {}

  isInputUiTypeInLne() {
    return this.inputUIType == 'one-line-2' || this.inputUIType == 'one-line'
  }

  valueChanged(){
    this.onChange(this.value);
    this.valueChange.emit(this.value);
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
