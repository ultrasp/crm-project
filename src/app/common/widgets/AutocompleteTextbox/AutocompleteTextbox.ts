import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  combineLatest,
  Observable,
  of ,
  BehaviorSubject
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  flatMap,
  map,
  startWith,
  tap,
} from 'rxjs/operators';
import {
  COFService
} from 'src/app/_service/COFService';
import {
  RequestList
} from 'src/app/_shared/request/crm/RequestList';
import {
  CrmFormInput
} from '../Abstracts/CrmFormInput.';
import {
  ISelectOption
} from '../CrmSelect/CrmSelect';

@Component({
  selector: 'autocomplete-textbox',
  templateUrl: './AutocompleteTextbox.html',
  styleUrls: ['./AutocompleteTextbox.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutocompleteTextbox),
    multi: true,
  }, ],
})
export class AutocompleteTextbox extends CrmFormInput
implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() textDoesNotMatchErrorHidden: boolean = true;
  @Input() textDoesNotMatchErrorText: string = '';
  @Input() inputUIType?: string;
  textMatches: boolean = true;

  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() requestClass!: string;
  @Input() showError: boolean = false;
  @Input() setRequestParams!: (request: any, text: string) => void | undefined;
  private requestParams$ = new BehaviorSubject < any[] > ([]);
  options: ISelectOption[] = [];
  filteredOptions!: Observable < ISelectOption[] > ;
  textControl = new FormControl();
  @Input() set text(v: string | ISelectOption | null) {
    this.textControl.setValue(v instanceof ISelectOption ? v.title : v);
  }
  get text(): string | ISelectOption {
    return this.textControl.value;
  }
  private _value: string | null = null;

  @Output() textChange = new EventEmitter < string > ();

  set value(v: string | null) {
    this._value = v;
    this.setTextFromValue();
  }

  constructor(
    private cofService: COFService,
    private translate: TranslateService
  ) {
    super();
  }

  @Input() set requestParams(params: any[]) {
    this.requestParams$.next(params);
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit(): void {

    this.initOptions();
  }

  ngAfterViewInit(): void {
    this.textControl.valueChanges.subscribe((text) => {
        this.textChange.emit(text instanceof ISelectOption ? text.title : text);
        let selOption = this.options.find( v=> v.key ==  this._value);
        if(typeof text == 'string' && this._value && selOption ){
          if(selOption.title != text)
            this._value = null;
        }
    });
  }


  writeValue(value: any): void {
    this.value = value;

    this.setTextFromValue();
  }

  private initOptions() {
    var requestParams$ = this.requestParams$.pipe(
      distinctUntilChanged(),
      tap((_) => (this.text = null))
    );

    var text$ = this.textControl.valueChanges.pipe(
      startWith(''),
      filter((v) => v == null || typeof v == 'string' || v instanceof String),
      map((text) => (text || '').trim()),
      debounceTime(100),
      distinctUntilChanged()
    );

    this.filteredOptions = combineLatest([requestParams$, text$]).pipe(
      flatMap((params) => {
        return this.fetch(params[0], params[1])
      })
    );

    this.filteredOptions = this.filteredOptions.pipe(
      tap((options) => {
        if (!(this.text instanceof ISelectOption))
          if (
            options.length == 1 &&
            this.text != null &&
            options[0].title != null &&
            options[0].title.trim() == this.text.trim()
          ) {
            this._value = (options[0].key ? options[0].key : '');
          } else {
            this._value = null;
          }
      }),
      tap(
        () => {
          this.textMatches =
            this.text == null ||
            this.text.toString().trim() == '' ||
            this._value != null;

          if (this._value == null)
            this.onChange(this._value)

        }
      )
    );
  }


  private fetch(requestParams: any[], text: string): Observable < ISelectOption[] > {
    let request = RequestList.get(this.requestClass);
    if (!request) {
      return of([]);
    }
    if (requestParams != null)
      if (requestParams.some((el) => el == null || el == '' || Number.isNaN(el))) {
        this.value = null;
        return of([]);
      } else {
        this.setRequestParams(request, text);
      }

    return this.cofService.doRequest(request).pipe(
      map((result: any) => {
        var options = new Array < ISelectOption > ();
        var items = result.data;
        for (var i = 0; i < items.length; i++) {
          let item = new ISelectOption(items[i].id, items[i].name, );
          if (item.key == this._value) {
            options = [item];
            break;
          }
          options.push(item);
        }

        this.options = options;
        if (!this.textControl.dirty) {
          this.setTextFromValue();
        }
        return options;
      })
    );
  }

  private setTextFromValue() {
    if (this._value != null) {
      let option = this.options.find((v) => v.key == this._value);
      if (option != null) this.text = ( option.title ? option.title : '');
      else {
        this.textControl.setValue(null);
      }
    } else this.text = null;

  }

  optionSelected(e: any) {
    this._value = <string> ( (< ISelectOption >e.option.value).key ? (< ISelectOption >e.option.value).key : '');
    this.onChange(this._value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
