import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import {
  ControlValueAccessor, FormControl,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import {
  BehaviorSubject,
  filter,
  firstValueFrom,
  map, never, Observable, tap,
} from "rxjs";
import {
  CommonUtil
} from "src/app/_service/util/CommonUtil";
import {
  IResponceList, ISelectOptionItem,
  LoadListSrvice
} from "../../services/LoadListSrvice";
import {
  CrmFormInput
} from "../Abstracts/CrmFormInput.";
import {
  ISelectOption
} from "../CrmSelect/CrmSelect";
import {COFService} from "../../../_service/COFService";
import {CarModel} from "../../../_shared/request/crm/CarModel";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'crm-car-model-load-list',
  templateUrl: `CrmCarModel.html`,
  styleUrls: ['CrmCarModel.css'],

  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CrmCarModel),
    multi: true
  }]
})
export class CrmCarModel extends CrmFormInput implements OnInit, ControlValueAccessor {

  @Input() autoLoad: boolean = false;
  @Input() selectUIType?: string;
  @Input() showError: boolean = false;
  @Input() invalidText!: string;
  @Input() setRequestParams!: (request: any) => void;
  @Input() set value(value: string | number | null) {
    this._value = (CommonUtil.isNull(value) ? null : value );
    if(this.value != null && String(this.value) != '')
      this.$paramChanged.next(true)
  }

  completeControl = new FormControl('');

  get value(): string|number|null {
    return this._value
  }

  displayFn(item: ISelectOption): string {
    return item && item.title ? item.title : '';
  }
  @Input() customButtons: any[] = [];
  @Output() valueChange = new EventEmitter < string|number|null > ();
  @Output() textChanged =  new EventEmitter <string|number|null>();
  @Output() customButtonClicked =  new EventEmitter <string>();
  @Input() set refreshList(value: any) {
    this.$paramChanged.next(true);
  };
  options: ISelectOption[] = [];
  private _value: string|null|number = null;

  $paramChanged = new BehaviorSubject<boolean>(false);

  _options: ISelectOption[] = [];

  constructor(private loader: LoadListSrvice, private cof: COFService) {
    super();
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  completeControlCount = 0;

  ngOnInit() {
    this.$paramChanged.subscribe( v => {
      this.loadList();
    });
    this.completeControl.valueChanges.pipe(
      tap(__ => {
        this.completeControlCount ++;
        setTimeout(() => {
          this.completeControlCount --;
          if(this.completeControlCount == 0) {
            this.$paramChanged.next(true);
          }
        }, 500);
      })
    ).subscribe();
  }


  async loadList() {
    let request = new CarModel();
    request.setCount(100);
    if(this.setRequestParams)
      this.setRequestParams(request);
    console.log('load list');
    if(this.completeControl.value && typeof this.completeControl.value === 'object')
      request.name = this.completeControl.value.title;
    else {
        if(this.completeControl.value)
        request.name = this.completeControl.value;
    }
    this._options = await firstValueFrom(this.cof.doRequest(request).pipe(
      filter(result => result && !!result),
      map((result: any) => {
        return result.data.map((item: IResponceList) => < ISelectOptionItem > {
          key: item.id,
          title: item.name,
          obj: item
        })
      }),
    ));
  }

  clear() {
    this._options = [];
  }

  selectChanged(item: MatAutocompleteSelectedEvent) {
    this._value = item.option.value.key || null;
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

  getText(key:string|number|null){
    return key ?  this.options.find( v=> v.key == key)?.title : null
  }
}
