import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CrmFormInput } from '../Abstracts/CrmFormInput.';
import { CommonUtil } from 'src/app/_service/util/CommonUtil';
import { SkeletonTabComponent } from '../CrmDynamicTab/SkeletonTabComponent';
@Component({
  selector: 'crm-textarea',
  templateUrl: './CrmTextarea.html',
  styleUrls: ['./CrmTextarea.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CrmTextarea),
      multi: true
    }
  ]
})
export class CrmTextarea extends CrmFormInput implements OnInit, ControlValueAccessor {

  @Input() placeHolder?: string;
  @Input() get value(): string {
    return this._value;
  }
  set value(value: string|undefined) {
    this._value = <string>(CommonUtil.isNull(value) ? '' : value);
  }
  @Input() showError: boolean =  false;
  @Output() valueChange = new EventEmitter<string>();
  @Input() isEnabled:boolean = true;
  private _value: string = '';
  onChange: any = () => { };
  onTouched: any = () => { };
  data:any;
  public isDynamicLoaded:boolean = false;
  constructor() {super()}

  ngOnInit() {
    if(this.isDynamicLoaded){
      this.label = this.data.label;
    }
  }

  valueChanged(value:any){
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isEnabled = !isDisabled;
  }
}
