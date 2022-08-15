import {
  OnInit,
  Component,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SessionInfoService } from "src/app/main/components/services/session-info.service";
import {
  AttributeParamConfig
} from "../AttributeParamConfig";
import {
  AttributeParamWidgetIfc
} from "../AttributeParamWidgetIfc";



@Component({
  selector: 'crm-attr-branchlist',
  template:`<crm-branch #filialList [label]="'GENERAL.ORGANIZATION' | translate" [value]="_value" (valueChange)="onValueChange($event)" [isRequired]="true"
   [showError]="param.showError"></crm-branch>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AttrBranchList,
      multi: true
    }
  ]
})
export class AttrBranchList implements OnInit, AfterViewInit, AttributeParamWidgetIfc,ControlValueAccessor {

  param!: AttributeParamConfig;

  constructor(private session: SessionInfoService) {}
  ngOnInit(): void {}
  onChange: any = () => { };
  onTouched: any = () => { };

  public _value!:number;
  ngAfterViewInit() {
  }

  toIntVal(){
    return parseInt(this.param.dataValue);
  }

  // onValChange(val:number){
  //   this.param.dataValue = (val || '').toString(); 
  // }

  setParamConfig(param: AttributeParamConfig): void {
    this.param = param;
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

  setEnabled(isEnable:boolean) {
    this.param.enabled = isEnable;
  }

  fieldToString(): string {
    return this.param.dataValue;
  }

  setValue(val:string){
    this.param.dataValue = val;
    this._value = parseInt(this.param.dataValue);
  }

  setShowError(val:boolean){
    this.param.showError = val;
  }

  public writeValue(value: number): void {
    this.setValue( (value || '') + '')
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public onValueChange(value: number): void {
    this.writeValue(value);
    this.onChange(value);
  }


}
