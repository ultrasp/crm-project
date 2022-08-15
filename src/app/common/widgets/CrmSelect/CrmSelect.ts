import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR
} from '@angular/forms';
import {
  MatSelect,
  MatSelectChange
} from '@angular/material/select';
import { CommonUtil } from 'src/app/_service/util/CommonUtil';
import { StringUtil } from 'src/app/_service/util/StringUtil';
import {
  CrmFormInput
} from '../Abstracts/CrmFormInput.';

@Component({
  selector: 'crm-select',
  templateUrl: './CrmSelect.html',
  styleUrls: ['./CrmSelect.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CrmSelect),
      multi: true
    }
  ]
})
export class CrmSelect extends CrmFormInput implements OnInit, ControlValueAccessor {

  @Input() set options(val: ISelectOption[]) {
    this._options = val.map(v => (typeof v == 'string') ? < ISelectOption > {
      key: v,
      val: v
    } : v)
  }
  get options() :ISelectOption[]{
    return this._options;
  };

  @Input() set value(val:string){
    this.selectedkey = val;
  }
  get value():string{
    return <string>this.selectedkey;
  }
  @Input() invalidText!:string;
  @Input() selectUIType?:string;
  @Input() addsNull:boolean = true;

  @Output() selectionChanged = new EventEmitter < string > ();
  @Output() selectToggled =  new EventEmitter <boolean>();

  public _options: ISelectOption[] = []
  public selectedkey ? : string;
  @Input() disabled = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  @Input() showError: boolean =  false;

  constructor() {
    super()
  }

  ngOnInit() {}

  public getValue() {
    return this.selectedkey || null;
  }

  itemChanged(item: MatSelectChange) {
    this.onChange(item.value);
    this.selectionChanged.emit(item.value);
  }

  writeValue(value: string): void {
    this.selectedkey = this._options.find(v => v.key == value)?.key;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) : void {
    this.disabled = isDisabled;
  }

  selectOpened(isOpen:boolean){
    this.selectToggled.emit(isOpen);
  }
}

export class ISelectOption {
  key ? : string;
  title ? : string;
  constructor(key:string,title:string){
    this.key = key;
    this.title = title;
  }
}
