import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { LoadListSrvice } from '../../services/LoadListSrvice';
import { ISelectOption } from '../CrmSelect/CrmSelect';

@Component({
  selector: 'crm-checkbox-list',
  templateUrl: './CrmCheckboxList.html',
  styleUrls: ['./CrmCheckboxList.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CrmCheckboxList),
    multi: true
  }]
})
export class CrmCheckboxList  implements OnInit,ControlValueAccessor {

  @Input() visible: boolean = true;
  @Input() isEnabled: boolean = true;
  @Input() isLabelAfter: boolean = true;
  @Input() label: string = '';
  @Input() values:string[] = [];
  @Input() showError:boolean = false;
  @Output() valueChange =  new EventEmitter();
  @Input() itemList:ISelectCheck[] = [];
  @Input() set requestName(value: string) {
    this._requestName = value;
    this.$paramChanged.next(true)
  };

  private _requestName!: string;
  private isListLoaded:boolean = false;
  $paramChanged = new BehaviorSubject<boolean>(false);

  onChange: any = () => { };
  onTouched: any = () => { };
  @Input() setRequestParams!: (request: any) => void;

  ngOnInit() {
    this.$paramChanged.subscribe( v => {
      this.loadList(v);
    })

  }
  constructor(private loader: LoadListSrvice) {
    // super();
  }

  public isVisible() {
    return this.visible;
  }

  public setVisible(visible: boolean) {
    this.visible = visible;
  }

  public clear(): void {
    this.values = [];
  }

  public setLabel(label: string): void {
    this.label = label;
  }

  async loadList(isFullLoad:boolean) {
    if (this._requestName && this._requestName.length > 0) {
      // if ( isFullLoad) {
        let list = await firstValueFrom(this.loader.load(this._requestName, this.setRequestParams));
        this.itemList = list.map(( v:ISelectOption) => {let obj =  (<ISelectCheck>v)
          obj.isChecked = false;
          return obj;
        });
        console.log(this.itemList,'this.itemList')
        this.isListLoaded = true;
        // if(this.value)
        //   this.textChanged.emit(this.getText(this.value));
      // }
    } else {
      this.itemList = [];
    }
  }


  itemChanged(matChange: MatCheckboxChange,item:ISelectOption) {
    let is_checked = matChange.checked;
    console.log(is_checked,'is_checked')
    console.log(this.values)
    if(is_checked){
      this.values.push(item.key || '')
    }else{
      let index = this.values.findIndex(v => v == item.key || '');
      if (index !== -1) {
        this.values.splice(index, 1);
      }
    }
    this.onChange(this.values);
    this.valueChange.emit(this.values);
  }

  // setSelected(checked: boolean) {
  //   this.is_checked = checked;
  // }

  public setEnabled(isEnable: boolean): void {
    this.isEnabled = isEnable;
  }

  public isEnabledf() {
    return this.isEnabled;
  }

  public getText() {
    return this.label;
  }

  writeValue(value: string[]): void {
    this.values = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}

class ISelectCheck extends ISelectOption{
  isChecked = false;
} 