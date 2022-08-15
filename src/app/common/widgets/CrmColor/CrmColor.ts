import {CrmFormInput} from "../Abstracts/CrmFormInput.";
import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from "@angular/core";
import {COFService} from "../../../_service/COFService";
import {firstValueFrom, Subject} from "rxjs";
import {ICrmItem} from "../CrmList/ICrmItem";
import {Branch} from "../../../_shared/request/crm/Branch";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ICrmBranchItem} from "./ICrmBranchItem";
import {CommonUtil} from "../../../_service/util/CommonUtil";
import { MatSelect } from "@angular/material/select";
import { RequestClassKey } from "src/app/_shared/request/crm/RequestList";
import { RefTree } from "src/app/_shared/request/crm/RefTree";
import { CrmRefType } from "../../enums/crm-ref-type.enum";
import { IRefTree } from "src/app/main/models/ref-tree.entity";
import { TreeSelector } from "../TreeSelector/TreeSelector";

@Component({
  selector: 'crm-color-selector',
  templateUrl: './CrmColor.html',
  styleUrls: ['./CrmColor.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CrmColor),
      multi: true
    }
  ]
})
export class CrmColor extends CrmFormInput implements OnInit, ControlValueAccessor {

  @Output() valueChange = new EventEmitter<string|null>();
  public selectedValue!:string|null;
  @Input() get value(): string|null {
    return this.selectedValue;
  }
  set value(val:string|null){
    this.selectedValue = val;

    if(Boolean(this.selectedValue))
      this.setItemName();
  }

  @Input() showError:boolean = false;
  @Input() inputUIType?:string;

  public selectedItem!:IRefTree |null;
  public itemTitle:Subject<string>= new Subject();

  @ViewChild(MatSelect, {
    static: true
  }) selectPanel!: MatSelect;
  @ViewChild(TreeSelector, {
    static: true
  }) treeSelector!: TreeSelector;
  @ViewChild('dropdownSelect') dropdownSelect: ElementRef | undefined;
  refTreekey = RequestClassKey.REF_TREE;
  displayText:string = ''
  constructor(private cof: COFService, private ref: ElementRef) {
    super();
  }

  ngOnInit(): void {
  }

 
  colorParams = (searchRequest: RefTree): void => {
    searchRequest.setTypeId(CrmRefType.CAR_COLOR);
    return;
  }

  selectItem(item: IRefTree | null) {
    this.selectedItem = item;
    this.selectedValue = (this.selectedItem ? this.selectedItem.id : null);
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
      this.selectPanel.focus();
  }
  reportNodeSelected(item:any){
    this.selectItem(item);
    this.selectPanel.close();
  }

}
