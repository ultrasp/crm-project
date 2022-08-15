import {
  OnInit,
  Component,
  ViewChild,
  AfterViewInit,
  forwardRef
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SessionInfoService } from "src/app/main/components/services/session-info.service";
import { Reference } from "src/app/_shared/request/crm/Reference";
import {
  AttributeParamConfig
} from "../AttributeParamConfig";
import {
  AttributeParamWidgetIfc
} from "../AttributeParamWidgetIfc";



@Component({
  selector: 'crm-attr-multiselect',
  template:`<crm-multi-load-list [label]="param.desc | translate" [requestName]="'reference'"  [inputUIType]="'one-line'"
  [autoLoad]="true" [setRequestParams]="stateParams"  [value]="values" (valueChange)="onValueChange($event)"></crm-multi-load-list>`,
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AttrMultiSelect),
        multi: true
      }
    ]
  
})
export class AttrMultiSelect implements OnInit, AfterViewInit, AttributeParamWidgetIfc,ControlValueAccessor {

  param!: AttributeParamConfig;

  values:string[] = [];
  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(private session: SessionInfoService) {}
  ngOnInit(): void {}

  ngAfterViewInit() {
  }

  setValues(){
    return this.values =  this.param.dataValue.split(',');
  }

  onValChange(val:number){
    this.param.dataValue = val+ ''; 
  }

  setParamConfig(param: AttributeParamConfig): void {
    this.param = param;
    this.setValues();
  }

  getParamName(): string {
    return this.param.name;
  }

  getParamValue() {
    return this.values.join(',');
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
    this.setValues();
  }

  setShowError(val:boolean){
    this.param.showError = val;
  }

  stateParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(this.param.defValue);
    return;
  }

  public writeValue(value: string[]): void {
    this.setValue(value.join(','))
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public onValueChange(value: string[]): void {
    this.writeValue(value);
    this.onChange(value);
  }
}
