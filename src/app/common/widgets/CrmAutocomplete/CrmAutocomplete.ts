import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectChange } from '@angular/material/select';
import { BehaviorSubject, filter, map, merge, Observable, startWith, tap } from 'rxjs';
import { CrmFormInput } from '../Abstracts/CrmFormInput.';

@Component({
    selector: 'crm-autocomplete',
    templateUrl: './CrmAutocomplete.html',
    styleUrls: ['./CrmAutocomplete.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CrmAutocomplete),
            multi: true
        }
    ]
})

export class CrmAutocomplete extends CrmFormInput implements OnInit, ControlValueAccessor {

    @Input() set options(val: ISelectOption[]) {
        this._options = val.map(v => (typeof v == 'string') ? <ISelectOption>{
            key: v,
            val: v
        } : v)
        this.optionsLoaded.next(this._options);
    }
    get options(): ISelectOption[] {
        return this._options;
    };

    @Input() set value(val: string|null|number) {
        this.selectedkey = val;
        this.setTitle();
    }
    get value(): string|null|number {
        return this.selectedkey;
    };

    @Input() invalidText!: string;
    @Input() selectUIType?: string;
    @Input() addsNull: boolean = true;
    @Input() showError: boolean = false;
    @Input()  set isDisabled(val:boolean){
        if(val){
            this.inputControl.disable();
        }else{
            this.inputControl.enable();
        }
    }
    @Output() selectionChanged = new EventEmitter<string|null>();
    @Output() selectToggled = new EventEmitter<boolean>();

    inputControl = new FormControl();
    filteredOptions!: Observable<ISelectOption[]>;
    public _options: ISelectOption[] = []
    public selectedkey: string|null|number = null;
    optionsLoaded:BehaviorSubject<ISelectOption[]> = new BehaviorSubject(<ISelectOption[]>[]);
    @ViewChild(MatAutocomplete) matAutoComplete!: MatAutocomplete;

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() {
        super()
    }

    ngOnInit() {
        this.filteredOptions = this.inputControl.valueChanges.pipe(
            startWith(null),
            tap((value)=>{
                if((value === null || typeof value === "string") &&  this.selectedkey != null){
                    this.selectedkey = null;
                }
            }),
            map(value => {
                return typeof value === 'string' || value == null ? value : value.title
            }),
            map(title => (title ? this._filter(title) : this.options.slice())),

        );
        this.optionsLoaded.pipe(tap((value)=>{
            if(this.selectedkey != null)
                this.setTitle();
            else
            this.inputControl.patchValue(null);
        }),
        ).subscribe();
    }

    displayFn(option: ISelectOption): string {
        return option && option.title ? option.title : '';
    }

    private _filter(title: string): ISelectOption[] {
        const filterValue = title.toLowerCase();
        let option =this.options.find( option => option.key == '17');
        // console.log(this.options,option,option?.title, option?.title?.startsWith(filterValue),filterValue,'filterValue')
        return this.options.filter(option => option.title?.toLowerCase().startsWith(filterValue));
    }

    optionSelected(item:MatAutocompleteSelectedEvent){
        this.selectedkey = item.option.value.key;
        this.itemChanged((<ISelectOption>item.option.value).key || null)
    }

    writeValue(value: string): void {
        this.selectedkey = this._options.find(v => v.key == value)?.key || null;
        this.setTitle();
    }

    setTitle(){
        this.inputControl.patchValue(this._options.find(v => v.key == this.selectedkey))
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
      if(isDisabled)
        this.inputControl.disable();
    }

    itemChanged(key: string | null) {
        this.onChange(key);
        this.selectionChanged.emit(key);
    }

    onSelectToggle(isOpen: boolean) {
        if(!isOpen)
        this.clearText();

        this.selectToggled.emit(isOpen);
    }

    clearText(){
        if(!this.selectedkey){
            this.inputControl.setValue(null);
            this.itemChanged(null)
        }
    }
}

export class ISelectOption {
    key?: string;
    title?: string;
    constructor(key: string, title: string) {
        this.key = key;
        this.title = title;
    }
}
