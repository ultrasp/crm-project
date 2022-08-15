import {
  OnInit,
  Component,
  ViewChild,
  forwardRef
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CommonUtil } from "src/app/_service/util/CommonUtil";
import { CompareUtil } from "src/app/_service/util/CompareUtil";
import {
  AttributeParamConfig
} from "../AttributeParamConfig";
import {
  AttributeParamWidgetIfc
} from "../AttributeParamWidgetIfc";

@Component({
  selector: 'crm-attr-typelabel',
  template: `<div class="row">
    <div class="col-sm-8">
      <div class="crm-label">
      {{param.desc | translate }}:
      </div>
    </div>
    <div class="col-sm-4">
      <p class="crm-label-value ">  
        {{_value}}
      </p>
    </div>
    </div>`,
  styles: ['.crm-label { color: #6F7173; font-weight: 400; padding: 10px;} .crm-label-value {display: inline-block;padding: 10px; color: #0093DD; font-weight: 700;vertical-align: inherit;word-break:break-all;}'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AttrTypeLabel),
    multi: true
  }]

})
export class AttrTypeLabel implements OnInit, AttributeParamWidgetIfc,ControlValueAccessor {

  get param(): AttributeParamConfig{
    return this._param; 
  }

  set param(p:AttributeParamConfig){
    this._param = p;
    this.formatValue();
  }

  constructor() {}
  ngOnInit(): void {}
  onChange: any = () => {};
  onTouched: any = () => {};

  public isEnable: boolean = true;
  public _value!:string
  private _param!:AttributeParamConfig;

  setParamConfig(param: AttributeParamConfig): void {
    this.param = param;
    this.formatValue();
  }

  formatValue(){
    this._value = this.param.dataValue;
    if(CompareUtil.equalsIgnoreCase("REF", this.param.component)  ){
      this._value = CommonUtil.getReferenceByTypeId(parseInt(this.param.dataValue),parseInt(this.param.defValue));
    }
    if(CompareUtil.equalsIgnoreCase("MULTIREF", this.param.component)){
      let  ids :string[]= this.param.dataValue.split(',');
      this._value = '';
      // this.param.dataValue = '';
      ids.forEach( v=>{
        if(v != '')
        this._value += CommonUtil.getReferenceByTypeId(parseInt(v),parseInt(this.param.defValue)) + ', ';
      })
    }
  }

  getParamName(): string {
    return this.param.name;
  }

  getParamValue() {
    return this.param.dataValue;
  }

  getLabelText() {
    return this.param.desc;
  }

  setEnabled(isEnable: boolean) {
    this.isEnable = isEnable;
  }

  fieldToString(): string {
    return this.param.dataValue;
  }

  setValue(val: string) {
    this._value = val;
    if(CompareUtil.equalsIgnoreCase("REF", this.param.component)){
      this._value = CommonUtil.getReferenceByTypeId(parseInt(val),parseInt(this.param.defValue));
    }
    if(CompareUtil.equalsIgnoreCase("MULTIREF", this.param.component)){
      let  ids :string[]= this.param.dataValue.split(',');
      this._value = '';
      // this.param.dataValue = '';
      ids.forEach( v=>{
        if(v != '')
        this._value += CommonUtil.getReferenceByTypeId(parseInt(v),parseInt(this.param.defValue)) + ', ';
      })
    }
  }

  setShowError(val: boolean) {
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
