import {
  OnInit,
  Component,
  ViewChild,
  forwardRef
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CompareUtil } from "src/app/_service/util/CompareUtil";
import { AttributeParamConfig } from "../AttributeParamConfig";
import { AttributeParamWidgetIfc } from "../AttributeParamWidgetIfc";

@Component({
  selector: 'crm-attr-checkbox',
  template:`<crm-checkbox [label]="param.desc | translate" [value]="checked" [isEnabled]="param.enabled" (valueChange)="onValChange($event)" [isLabelAfter]="false"
  (valueChange)="onValueChange($event)"></crm-checkbox>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttrCheckbox),
      multi: true
    }
  ]

})
export class AttrCheckbox implements OnInit, AttributeParamWidgetIfc,ControlValueAccessor {

  param!: AttributeParamConfig;

  constructor() {}
  ngOnInit(): void {}
  onChange: any = () => { };
  onTouched: any = () => { };


  public isEnable:boolean = true;
  public checked: boolean =false;
  setParamConfig(param: AttributeParamConfig): void {
    this.param = param;
    this.checked = CompareUtil.equals(this.param.dataValue , "1"); 
  }

  getParamName(): string {
    return this.param.name;
  }
  onValChange(val:string){
    this.param.dataValue = val ? "1" : "";
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
    this.checked = CompareUtil.equalsIgnoreCase( "1",val);
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
