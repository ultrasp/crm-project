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
  MatSelectChange
} from '@angular/material/select';
import {
  CrmFormInput
} from '../Abstracts/CrmFormInput.';

@Component({
  selector: 'crm-multi-select',
  templateUrl: './CrmMultiSelect.html',
  styleUrls: ['./CrmMultiSelect.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CrmMultiSelect),
      multi: true
    }
  ]
})
export class CrmMultiSelect extends CrmFormInput implements OnInit, ControlValueAccessor {

  @Input() set options(val: ISelectOption[]) {
    this._options = val.map(v => (typeof v == 'string') ? < ISelectOption > {
      key: v,
      val: v
    } : v)
  }
  get options() :ISelectOption[]{
    return this._options;
  };

  @Input() set value(val:string[]){
    this.selectedkey = val;
  }
  get value():string[]{
    return this.selectedkey;
  }
  @Input() invalidText!:string;
  @Input() inputUIType:string = '';
  
  @Output() selectionChanged = new EventEmitter < string[] > ();
  @Output() selectToggled =  new EventEmitter <boolean>();

  public _options: ISelectOption[] = []
  public selectedkey: string[] = [];
  disabled = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  @Input() showError: boolean =  false;

  constructor() {
    super()
  }

  ngOnInit() {}

  public getValue() {
    return this.selectedkey || [];
  }

  get selOptions():ISelectOption[]{
    return this._options.filter(v => v.key && this.selectedkey.includes(v.key));
  }

  get selTitle():string{
    return this.selOptions.length > 0 
      ? (<string[]>this.selOptions.map( v=> v.title)).reduce((prev,curr) => {return prev +','+ curr}) 
      : ''
  }

  itemChanged(item: MatSelectChange) {
    
    this.onChange(this.selectedkey);
    this.selectionChanged.emit(this.selectedkey);
  }

  writeValue(values: string[]): void {
    this.selectedkey = <string[]> this._options.filter(v => v.key && values.includes(v.key)).map( v=> v.key);
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
