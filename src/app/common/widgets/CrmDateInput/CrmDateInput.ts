import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateUtil } from 'src/app/_service/util/DateUtil';
import { CrmFormInput } from '../Abstracts/CrmFormInput.';

@Component({
  selector: 'crm-date-input',
  templateUrl: './CrmDateInput.html',
  styleUrls: ['./CrmDateInput.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CrmDateInput,
      multi: true
    }
  ]
})
export class CrmDateInput extends CrmFormInput implements ControlValueAccessor, OnInit {

  @Input() public visible: boolean = true;
  @Input() public enabled: boolean = true;
  @Input() public hasLabel = true;
  @Input() public disableClear: boolean = false;
  @Input() minDate!: Date;
  @Input() maxDate!: Date;
  @Input() dateUIType?: string;
  @Input()
  public get value(): Date | null {
    return this._value;
  }
  public set value(value: Date | null) {
    this._value = value;
    this.textDate = DateUtil.formatDate(this.value,'dd/MM/yyyy');

  }
  private _value: Date | null = new Date();
  @Input() showError: boolean = false;
  @Input() invalidText!: string;

  @Output() valueChange = new EventEmitter();

  private onChange: Function = (value: any) => { };
  private onTouched: Function = () => { };
  public textDate:string |null = null;
  constructor() { super() }

  ngOnInit() { }

  onDateChange(e: any) {
    this.changeValue(e.value);
    this.textDate = DateUtil.formatDate(this.value,'dd/MM/yyyy');
  }

  changeValue(value:Date|null){
    this.value = value;
    this.onChange(this.value);
    this.valueChange.emit(value);

  }

  onTextDateChange(){
    if(this.textDate?.length != 10){
      this.textDate = null;
    }
    let d = this.textDate ? new Date(parseInt(this.textDate?.substring(6,10)+''),parseInt(this.textDate?.substring(3,5)+'')-1,parseInt(this.textDate?.substring(0,2)+'')) : null;
    this.changeValue(d);
  }
  clearDate(event: any) {
    if (!this.disableClear) {
      event.stopPropagation();
      this.value = null;
      this.textDate = null;
      this.onChange(null);
      this.valueChange.emit(null);
    }
  }

  writeValue(obj: Date): void {
    this.value = obj;
    this.textDate = DateUtil.formatDate(this.value,'dd/MM/yyyy');
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
}
