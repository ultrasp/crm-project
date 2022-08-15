import {
  OnInit,
  Component,
  ViewChild,
  AfterViewInit,
  forwardRef
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
  selector: 'crm-attr-typeinspector',
  template:`<crm-load-list [label]="param.desc" (valueChange)="onValueChange($event)"  [requestName]="'Inspektor'" [autoLoad]="false" [value]="this.param.dataValue"></crm-load-list>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttrTypeInspector),
      multi: true
    }
  ]
})
export class AttrTypeInspector implements OnInit, AfterViewInit, AttributeParamWidgetIfc,ControlValueAccessor {

  param!: AttributeParamConfig;
  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(private session: SessionInfoService) {}
  ngOnInit(): void {}

  ngAfterViewInit() {
  }


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
