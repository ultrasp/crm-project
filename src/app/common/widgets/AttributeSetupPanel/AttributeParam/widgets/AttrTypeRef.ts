import {
  OnInit,
  Component,
  ViewChild,
  AfterViewInit,
  Input,
  forwardRef
} from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import {
  Reference
} from "src/app/_shared/request/crm/Reference";
import {
  AttributeParamConfig
} from "../AttributeParamConfig";
import {
  AttributeParamWidgetIfc
} from "../AttributeParamWidgetIfc";


@Component({
  selector: 'crm-attr-typeref',
  template: `<crm-load-list [requestName]="'reference'" 
  [setRequestParams]="setTypeId"
   [value]="this.param.dataValue"
   (valueChange)="onValueChange($event)" 
    [addsNull]="true" [label]="param.desc | translate" [isRequired]="param.isRequiredField" [showError]="param.showError"></crm-load-list>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AttrTypeRef),
    multi: true
  }]
})
export class AttrTypeRef implements OnInit, AttributeParamWidgetIfc, AfterViewInit, ControlValueAccessor {

  param!: AttributeParamConfig;
  @Input() typeId!: number;


  public isEnable: boolean = true;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}
  ngOnInit(): void {}

  ngAfterViewInit() {}

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

  setEnabled(isEnable: boolean) {
    this.isEnable = isEnable;
  }

  fieldToString(): string {
    return this.param.dataValue;
  }

  setValue(val: string) {
    this.param.dataValue = val;
  }

  setTypeId = (request: Reference): void => {
    request.setTypeId(this.param.defValue);
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
