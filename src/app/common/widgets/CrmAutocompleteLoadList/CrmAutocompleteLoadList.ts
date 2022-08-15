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
import {CrmAutocomplete} from "../CrmAutocomplete/CrmAutocomplete";

@Component({
  selector: 'crm-autocomplete-load-list',
  templateUrl: `CrmAutocompleteLoadList.html`,

  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CrmAutocompleteLoadList),
    multi: true
  }]
})
export class CrmAutocompleteLoadList extends CrmFormInput implements OnInit, ControlValueAccessor, AfterViewInit {

  @Input() set requestName(value: string) {
    let oldVal = this._requestName;
    this._requestName = value;
    this.$paramChanged.next( oldVal ===  undefined ? false : true);
  };
  @Input() autoLoad: boolean = false;
  @Input() selectUIType?: string;
  @Input() set refreshList(value: any) {
    this.$paramChanged.next(true);
  };
  @Input() setRequestParams!: (request: any) => void;
  @Input() showError: boolean = false;
  @Input() invalidText!: string;
  @Input() set value(value: string | number | null) {
    this._value = (CommonUtil.isNull(value) ? null : value );
    if(this.value != null && String(this.value) != '')
      this.$paramChanged.next(true)
  }
  get value(): string|number|null {
    return this._value
  }
  @Input() isDisabled: boolean = false;
  @Input() addsNull: boolean = true;
  @Input() customButtons: any[] = [];
  @Output() valueChange = new EventEmitter < string|number|null > ();
  @Output() textChanged =  new EventEmitter <string|number|null>();
  @Output() customButtonClicked =  new EventEmitter <string>();
  @ViewChild(CrmAutocomplete) selectElement!: CrmAutocomplete;

  private _requestName!: string;
  options: ISelectOption[] = [];
  private _value: string|null|number = null;

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
        if(this.value) {
          this.textChanged.emit(this.getText(this.value));
          this.valueChangeRunForChild();
        }
      }
    } else {
      this._options = [];
    }
  }

  valueChangeRunForChild() {
    let value = this.value;
    this._value = null;
    setTimeout(() => {
      this._value = value;
    }, 100);
  }


  clear() {
    this._options = [];
  }

  selectChanged(key: string|null|number) {
    this._value = key || null;
    this.onChange(this._value);
    this.valueChange.emit(this._value)
    this.textChanged.emit(this.getText(this._value));
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

  setDisabledState ? (isDisabled: boolean) : void {
    this.selectElement.setDisabledState(isDisabled)
  }

  getText(key:string|number|null){
    return key ?  this._options.find( v=> v.key == key)?.title : null
  }

  ngAfterViewInit(): void {
    if(this.setDisabledState)
      this.setDisabledState(this.isDisabled);
  }
}
