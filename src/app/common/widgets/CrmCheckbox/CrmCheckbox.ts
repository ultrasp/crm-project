import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'crm-checkbox',
  templateUrl: './CrmCheckbox.html',
  styleUrls: ['./CrmCheckbox.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CrmCheckbox),
    multi: true
  }]
})
export class CrmCheckbox  implements OnInit,ControlValueAccessor {

  @Input() visible: boolean = true;
  @Input() isEnabled: boolean = true;
  @Input() isLabelAfter: boolean = true;
  @Input() label: string = '';
  @Input() value:boolean = false;
  @Input() showError:boolean = false;
  @Output() valueChange =  new EventEmitter();

  @Input('checked') get is_checked(): boolean {
    return this.value;
  }

  onChange: any = () => { };
  onTouched: any = () => { };
  set is_checked(v: boolean) {
    this.value = v;
  }

  ngOnInit() {
  }

  public isVisible() {
    return this.visible;
  }

  public setVisible(visible: boolean) {
    this.visible = visible;
  }

  public isSelected(): boolean {
    return this.is_checked == null ? false : this.is_checked;
  }

  public clear(): void {
    this.is_checked = false;
  }

  public setLabel(label: string): void {
    this.label = label;
  }

  itemChanged(matChange: MatCheckboxChange) {
    this.is_checked = matChange.checked;
    this.onChange(this.is_checked);
    this.valueChange.emit(this.is_checked);
  }

  setSelected(checked: boolean) {
    this.is_checked = checked;
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

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
