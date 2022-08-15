import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  Input,
  forwardRef,
  Injector,
} from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import {
  SessionInfoService
} from 'src/app/main/components/services/session-info.service';
import {
  CommonUtil
} from 'src/app/_service/util/CommonUtil';
import {
  CompareUtil
} from 'src/app/_service/util/CompareUtil';
import {
  StringUtil
} from 'src/app/_service/util/StringUtil';
import {
  AttributeDirective
} from './AttributeDirective';
import {
  AttributeParamConfig
} from './AttributeParamConfig';
import {
  AttributeParamItem
} from './AttributeParamItem';
import {
  AttributeParamPanelIfc
} from './AttributeParamPanelIfc';
import {
  AttributeParamService
} from './AttributeParamService';
import {
  AttributeParamWidgetIfc
} from './AttributeParamWidgetIfc';

@Component({
  selector: 'crm-attribute-param',
  templateUrl: 'AttributeParam.html',
  styleUrls: ['./AttributeParam.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttributeParam),
      multi: true
    }
  ]

})
export class AttributeParam implements OnInit, AttributeParamPanelIfc,ControlValueAccessor {

  @Input() set param(param: AttributeParamConfig ) { 
    this._param.next(param); 
  }

  get param() {
   return this.lastParam;
  }

  @Input() isFilter: boolean = false;
  @ViewChild(AttributeDirective, {
    static: true
  }) paramHost!: AttributeDirective;

  item!: AttributeParamItem;
  ref!: AttributeParamWidgetIfc;
  private _param = new ReplaySubject<AttributeParamConfig>();

  lastParam!:AttributeParamConfig;
  onChange: any = () => { };
  onTouched: any = () => { };
  _value!:string;

  constructor(private paramService: AttributeParamService, private session: SessionInfoService,    public injector: Injector
    ) {}

  ngOnInit(): void {
    this._param.subscribe(paramItem => {
      this.lastParam = paramItem;
      if(this.lastParam){
        // console.log(this.param.name,this.param.dataValue,this._value,'this._value')
        if(this._value && this._value != this.param.dataValue){
          this.param.dataValue = this._value;
        }
        this.item = this.paramService.getParam(this.param);
        this.loadComponent();
    
      }
    })

  }

  loadComponent() {
    let viewContainerRef = this.paramHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(this.item.component);
    this.ref = < AttributeParamWidgetIfc > componentRef.instance;
    if (this.param.readOnly)
      this.param.setEnabled(false);
    else if (!StringUtil.emptyString(this.param.serityRole) && !CompareUtil.equalsIgnoreCase("0", this.param.serityRole))
      this.param.setEnabled(false);
    else
      this.param.setEnabled(true);

    this.ref.setParamConfig(this.item.param);
    this.ref.registerOnChange((val:string) => this.onValChange(val));
    // const ngControl = this.injector.get(NgControl);
    // ngControl.valueAccessor = componentRef.instance;

  }

  onValChange(val:string){
    // console.log(this.onChange,val,'val changes')
    // if(this.param.dataValue != val){
      
    // }
    this.onChange(val);
    console.log(this.param.name,this.param.dataValue,val,'val')
    // this.onValueChange(val);
  }

  setEnabled(enabled: boolean) {
    this.item.param.enabled = enabled;
  }

  setParamConfig(param: AttributeParamConfig): void {
    this.ref.setParamConfig(param);
  }

  getKeyValue(excludeEmpty: boolean): string {
    if (excludeEmpty && CompareUtil.equals(this.param.defValue, this.getParamValue()))
      return "";
    return this.ref.getParamName() + "==" + this.getParamValue();
  }

  public getLabelText(): string {
    return this.ref.getLabelText();
  }

  getParamName(): string {
    return this.ref.getParamName();
  }

  getParamValue() {
    return this.ref.getParamValue();
  }

  public getValue(): string {
    return this.getParamValue();
  }

  public setShowError(value:boolean){
    this.ref.setShowError(value);
  }

  fieldToString(): string {
    let result: string = '';
    let txt = this.ref.fieldToString();
    if (!CommonUtil.isNull(txt) && !StringUtil.emptyString(txt)) {
      result += this.getLabelText() + " = " + txt;
    }
    return result;
  }

  public setValue(value: string): void {
    this._value = value;
    if(this.param){
      this.param.dataValue = this._value;
      this.ref ? this.ref.setValue(value) : null;
    }
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
