import { OnInit, Component, ViewChild, AfterViewInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonUtil } from 'src/app/_service/util/CommonUtil';
import { DateUtil } from 'src/app/_service/util/DateUtil';
import { AttributeParamConfig } from '../AttributeParamConfig';
import { AttributeParamWidgetIfc } from '../AttributeParamWidgetIfc';

@Component({
  selector: 'crm-attr-typedate',
  template:`<crm-date-input [value]="date" (valueChange)="onValueChange($event)" [label]="param.desc | translate" [enabled]="!param.readOnly" [isRequired]="param.isRequiredField" [showError]="param.showError"  [showError]="param.showError"></crm-date-input>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttrTypeDate),
      multi: true
    }
  ]

})
export class AttrTypeDate implements OnInit, AttributeParamWidgetIfc,ControlValueAccessor {
  param!: AttributeParamConfig;
  date!: Date | null;
  onChange: any = () => { };
  onTouched: any = () => { };

  constructor() {}
  ngOnInit(): void {}

  public isEnable: boolean = true;

  setParamConfig(param: AttributeParamConfig): void {
    this.param = param;
    this.date = DateUtil.parseDateFromString(param.dataValue,'YYYY-MM-DD');
  }

  getParamName(): string {
    return this.param.name;
  }

  getParamValue():string {
    return <string>DateUtil.formatDate(this.date,'YYYY-MM-dd');
  }

  getLabelText() {
    return this.param.desc;
  }

  setEnabled(isEnable:boolean) {
    this.isEnable = isEnable;
  }

  fieldToString(): string {
    return <string>DateUtil.formatDate(this.date);
  }

  setValue(val: string) {
    this.param.dataValue = val;
    this.date = DateUtil.parseDateFromString(val);
  }

  setShowError(val:boolean){
    this.param.showError = val;
  }

  public writeValue(value: string): void {
    this.setValue(value)
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public onValueChange(value: string): void {
    this.writeValue(value);
    this.onChange(value);
  }

}
