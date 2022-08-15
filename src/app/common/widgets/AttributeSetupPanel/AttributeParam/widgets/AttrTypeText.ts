import {
  OnInit,
  Component,
  ViewChild,
  forwardRef
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AttributeParamConfig } from "../AttributeParamConfig";
import { AttributeParamWidgetIfc } from "../AttributeParamWidgetIfc";

@Component({
  selector: 'crm-attr-typetext',
  template:`<crm-input [value]="param.dataValue" (valueChange)="onValueChange($event)" [inputUIType]="'one-line'" [label]="param.desc | translate" [isEnabled]="!param.readOnly" [isRequired]="param.isRequiredField" [showError]="param.showError"></crm-input>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttrTypeText),
      multi: true
    }
  ]
})
export class AttrTypeText implements OnInit, AttributeParamWidgetIfc,ControlValueAccessor {

  param!: AttributeParamConfig;
  onChange: any = () => { };
  onTouched: any = () => { };

  constructor() {}
  ngOnInit(): void {}

  public isEnable:boolean = true;

  setParamConfig(param: AttributeParamConfig): void {
    this.param = param;
  }

  getParamName(): string {
    return this.param.name;
  }

  getParamValue() {
    return this.param.dataValue;
  }

  getLabelText(){
    return this.param.desc;
  }

  setEnabled(isEnable:boolean){
    this.isEnable =isEnable; 
  }

  fieldToString():string{
    return this.param.dataValue;
  }

  setValue(val:string){
    this.param.dataValue = val;
  }

  setShowError(val:boolean){
    this.param.showError = val;
  }

  public writeValue(value: string): void {
    console.log(value,'value form')
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
