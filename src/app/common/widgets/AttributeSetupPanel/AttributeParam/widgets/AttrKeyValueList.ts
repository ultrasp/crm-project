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
  selector: 'crm-attr-keyvaluelist',
  template:`<crm-load-list [label]="param.desc | translate"
  [requestName]="'Attribute'" [autoLoad]="false"  [setRequestParams]="setRequestParams" [value]="this.param.dataValue" (valueChange)="onValueChange($event)"></crm-load-list>`,
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => AttrKeyValueList),
          multi: true
        }
      ]
  
})
export class AttrKeyValueList implements OnInit, AfterViewInit, AttributeParamWidgetIfc,ControlValueAccessor {

  param!: AttributeParamConfig;

  constructor(private session: SessionInfoService) {}
  ngOnInit(): void {}
  onChange: any = () => { };
  onTouched: any = () => { };


  ngAfterViewInit() {
  }


  setRequestParams(request:any){
    request
      .setId(this.param.id)
      .setName(this.param.name)
      .setUser(this.session.getSesionInfo().data?.user_info.id);
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
