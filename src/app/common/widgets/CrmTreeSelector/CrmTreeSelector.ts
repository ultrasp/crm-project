import {CrmFormInput} from "../Abstracts/CrmFormInput.";
import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from "@angular/core";
import {COFService} from "../../../_service/COFService";
import { Subject} from "rxjs";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import { MatSelect } from "@angular/material/select";
import { RequestClassKey } from "src/app/_shared/request/crm/RequestList";
import { IRefTree } from "src/app/main/models/ref-tree.entity";
import { TreeSelector } from "../TreeSelector/TreeSelector";

@Component({
  selector: 'crm-tree-mat-select',
  templateUrl: './CrmTreeSelector.html',
  styleUrls: ['./CrmTreeSelector.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CrmTreeSelector),
      multi: true
    }
  ]
})
export class CrmTreeSelector extends CrmFormInput implements OnInit, ControlValueAccessor {

  @Output() valueChange = new EventEmitter<string>();
  public selectedValue!:string;
  @Input() get value(): string {
    return this.selectedValue;
  }
  set value(val:string){
    this.selectedValue = val;

    if(Boolean(this.selectedValue))
      this.setItemName();
  }

  @Input() showError:boolean = false;
  @Input() inputUIType?:string;
  @Input() refTreekey = RequestClassKey.REF_TREE;
  @Input() setRequestParams!: (request: any) => void;

  public selectedItem!:IRefTree |null;
  public itemTitle:Subject<string>= new Subject();

  @ViewChild(MatSelect, {
    static: true
  }) selectPanel!: MatSelect;
  @ViewChild(TreeSelector, {
    static: true
  }) treeSelector!: TreeSelector;
  displayText:string = ''

  constructor(private cof: COFService, private ref: ElementRef) {
    super();
  }

  ngOnInit(): void {
  }

 
  selectItem(item: IRefTree | null) {
    this.selectedItem = item;
    this.selectedValue = (this.selectedItem ? this.selectedItem.id : '');
    setTimeout(() => {
      this.setItemName();
    }, 1);
    this.onChange(this.selectedValue);
    this.valueChange.emit(this.selectedValue);
  }

  clear(){
    this.selectItem(null);
  }

  setItemName(){
    if(this.selectedItem){
      this.itemTitle.next(this.selectedItem.name);
    }else{
      this.itemTitle.next('');
    }
  }

  getSelectedItem() {
    return this.selectedItem;
  }
 

  private onChange: Function = (value: any) => { };
  private onTouched: Function = () => { };
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.selectedValue = obj;
  }

  openSelectTree(){
      this.selectPanel.open();
  }
  reportNodeSelected(item:any){
    this.selectItem(item);
    this.selectPanel.close();
  }

}
