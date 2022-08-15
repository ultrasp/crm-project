import {CrmFormInput} from "../Abstracts/CrmFormInput.";
import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from "@angular/core";
import {COFService} from "../../../_service/COFService";
import {firstValueFrom} from "rxjs";
import {ICrmItem} from "../CrmList/ICrmItem";
import {Branch} from "../../../_shared/request/crm/Branch";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ICrmBranchItem} from "./ICrmBranchItem";
import { MatSelect } from "@angular/material/select";

import {CommonUtil} from "../../../_service/util/CommonUtil";

@Component({
  selector: 'crm-branch',
  templateUrl: './CrmBranch.html',
  styleUrls: ['./CrmBranch.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CrmBranch),
      multi: true
    }
  ]
})
export class CrmBranch extends CrmFormInput implements OnInit, ControlValueAccessor {

  @Output() valueChange = new EventEmitter<number>();
  public selectedValue = -1;
  @Input() get value(): number {
    return this.selectedValue;
  }
  set value(val:number){
    this.selectedValue = val;

    if(Boolean(this.selectedValue))
      this.setItemName();
  }
  @Input() showError:boolean = false;
  @Input() inputUIType?:string;
  public selectedItem = '';
  public isDropDownOpen = false;
  public onTheTop: string = '';
  public items: Array<ICrmBranchItem> = [];
  private isItemsLoaded:boolean = false;
  @ViewChild(MatSelect, {
    static: true
  }) selectPanel!: MatSelect;

  constructor(private cof: COFService, private ref: ElementRef) {
    super();
  }

  ngOnInit(): void {
    this.getBranchList()
  }

  focusIn() {
    this.openDropDown();
  }

  focusOut() {
    this.closeDropDown()
  }

  clickDropDownIcon() {
    if (this.isDropDownOpen) {
      this.closeDropDown();
    } else {
      this.openDropDown();
    }
  }

  openDropDown() {
    let bounds = this.ref.nativeElement.getBoundingClientRect();
    let bottom = window.innerHeight - bounds.bottom;
    if(bottom < 200) {
      this.onTheTop = 'up';
    }
    else {
      this.onTheTop = '';
    }
    this.isDropDownOpen = true;
    if (!this.isItemsLoaded) {
      this.getBranchList();
    }
  }

  closeDropDown() {
    this.isDropDownOpen = false;
  }

  selectItem(id: number) {
    this.selectedValue = id;
    this.setItemName();
    this.onChange(this.selectedValue);
    this.valueChange.emit(this.selectedValue);
    this.closeDropDown();
  }

  async setItemName(){
    this.items.forEach((item) => {
      if(item.id == this.selectedValue) {
        item.isSelected = true;
        this.selectedItem = item.name;
      }
      else {
        item.isSelected = false;
      }
    });
  }

  getSelectedItem() {
    return this.selectedItem;
  }

  private isLoading:boolean = false;
  async getBranchList() {
    if (this.isItemsLoaded || this.isLoading){
      return
    }
    this.isLoading = true;
    let request = new Branch();
    request.setCount(1000);
    let result: any = await firstValueFrom(this.cof.doRequest(request));

    if (result && !!result) {
      let items = result.data.map( (v:any) => { 
        if(v.id == 0 && v.parent_id == 0) v.parent_id = null; 
        return v; 
      });
      this.recursionSetData(items);
      if(this.selectedValue == 0 || Boolean(this.selectedValue)) this.setItemName(); else this.selectedValue = -1;
    } else {
    }
    this.isItemsLoaded = true;
  }

  openCloseIconClicked(event: MouseEvent, id: number) {
    event.stopPropagation();
    event.preventDefault();
    let depth: number = -1;
    let hide = false;
    this.items.forEach((item) => {
      if (depth != -1) {
        if (hide) {
          if (depth < item.depth) {
            item.hide = hide;
            item.isOpen = false;
          } else {
            return;
          }
        } else {
          if (depth + 1 == item.depth) {
            item.hide = hide;
          } else {
            if (depth >= item.depth) {
              return;
            }
          }
        }
      }
      if (item.id == id) {
        hide = item.isOpen;
        item.isOpen = !item.isOpen;
        depth = item.depth;
      }
    });
    return false;
  }

  recursionSetData(data: [], parent = null, depth: number = 0) {
    let haveChild = false;
    data.forEach((item: any) => {
      if (item.parent_id == parent) {
        haveChild = true;
        this.items.push({
          id: item.id,
          name: item.name,
          parent_id: item.parent_id,
          depth: depth,
          hide: parent != null,
          haveChild: true,
          isOpen: false,
          isSelected: false
        });
        this.items[this.items.length - 1].haveChild = this.recursionSetData(data, item.id, depth + 1);
      }
    });
    return haveChild;
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
    this.selectItem(obj)
  }
  clear(){
    this.selectItem(0);
  }
  openSelectTree(){
      this.selectPanel.open();
  }

}
