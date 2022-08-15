import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { CrmFormInput } from '../Abstracts/CrmFormInput.';
import { ISelectOption } from '../CrmSelect/CrmSelect';

@Component({
  selector: 'crm-radio-group',
  templateUrl: './CrmRadioGroup.html',
  styleUrls: ['./CrmRadioGroup.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CrmRadioGroup),
    multi: true
  }]
})
export class CrmRadioGroup extends CrmFormInput implements OnInit, ControlValueAccessor {

  @Input() name: string | undefined;

  @Input() get value(): string{
    return this._value;
  };
  set value(value:string){
    this._value = value;
  }

  @Input() listOptions!: ISelectOption[];
  @Input() visible: boolean = true;
  @Input() isEnabled: boolean = true;

  @Input() showError: boolean = false;
  @Output() valueChange = new EventEmitter();

  onChange: any = () => { };
  onTouched: any = () => { };
  private _value!:string;
  ngOnInit() {
  }

  itemChanged(change: MatRadioChange) {
    this.value = change.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  public setEnabled(isEnable: boolean): void {
    this.isEnabled = isEnable;
  }

  public isEnabledf() {
    return this.isEnabled;
  }

  public getText() {
    return this.label;
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

}
