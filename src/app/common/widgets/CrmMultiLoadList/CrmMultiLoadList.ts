import {
  isNull
} from "@angular/compiler/src/output/output_ast";
import {
  AfterViewInit,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import {
  BehaviorSubject,
  filter,
  firstValueFrom,
  map,
  mergeMap,
  Observable,
  Subject,
  tap
} from "rxjs";
import {
  CommonUtil
} from "src/app/_service/util/CommonUtil";
import {
  IRequestSetter,
  LoadListSrvice
} from "../../services/LoadListSrvice";
import {
  CrmFormInput
} from "../Abstracts/CrmFormInput.";
import {
  CrmSelect,
  ISelectOption
} from "../CrmSelect/CrmSelect";

@Component({
  selector: 'crm-multi-load-list',
  template: `<crm-multi-select [labelSize]="labelSize" [label]="label" [isRequired]="isRequired" [options]="_options" [haslabel]="haslabel" [invalidText]="invalidText" (selectionChanged)="selectChanged($event)" [value]="value" [showError]="showError"
  [inputUIType]="inputUIType" (selectToggled)="selectToggled($event)"></crm-multi-select>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CrmMultiLoadList),
    multi: true
  }]
})
export class CrmMultiLoadList extends CrmFormInput implements OnInit, ControlValueAccessor {


  @Input() set requestName(value: string) {
    let oldVal = this._requestName;
    this._requestName = value;
    this.$paramChanged.next( oldVal ===  undefined ? false : true);
  };
  @Input() autoLoad: boolean = true;
  @Input() inputUIType: string = '';
  @Input() set refreshList(value: any) {
    this.$paramChanged.next(true);
  };
  @Input() setRequestParams!: (request: any) => void;
  @Input() showError: boolean = false;
  @Input() invalidText!: string;
  @Input() set value(value: string[] | number[] | null) {
    this._value = (value || [] ).map( v => v +'') ;
    if(this.value.length > 0 )
      this.$paramChanged.next(true)
  }
  get value(): string[] {
    return this._value
  }
  @Input() addsNull: boolean = true;
  @Output() valueChange = new EventEmitter < string[] > ();
  @Output() textChanged =  new EventEmitter <string>();
  @ViewChild(CrmSelect) selectElement!: CrmSelect;

  private _requestName!: string;
  options: ISelectOption[] = [];
  private _value: string[] = [];

  $paramChanged = new BehaviorSubject<boolean>(false);

  public _options: ISelectOption[] = []

  private isSelectOpened: boolean = false;
  private isListLoaded:boolean = false;

  constructor(private loader: LoadListSrvice) {
    super();
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit() {
    this.$paramChanged.subscribe( v => {
      this.loadList(v);
    })
  }

  selectToggled(isOpen: Boolean) {
    if (isOpen)
      this.isSelectOpened = true;
    this.$paramChanged.next(false);
  }

  async loadList(isFullLoad:boolean) {
    if (this._requestName && this._requestName.length > 0) {
      if ( isFullLoad ||  ( ( this.isSelectOpened  || this.autoLoad ) && !this.isListLoaded)  ) {
        this._options = await firstValueFrom(this.loader.load(this._requestName, this.setRequestParams));
        this.isListLoaded = true;
        if(this.value)
          this.textChanged.emit(this.getText(this.value));
      }
    } else {
      this._options = [];
    }
  }


  clear() {
    this._options = [];
  }

  selectChanged(keys: string[]) {
    this._value = keys;
    this.onChange(keys);
    this.valueChange.emit(keys)
    this.textChanged.emit(this.getText(keys));
  }

  writeValue(value: string[]): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState ? (isDisabled: boolean) : void {
    this.selectElement.setDisabledState(isDisabled)
  }

  getText(selKeys:string[]){
    return this._options.find( v=> v && v.key && selKeys.includes(v.key))?.title
  }
}
