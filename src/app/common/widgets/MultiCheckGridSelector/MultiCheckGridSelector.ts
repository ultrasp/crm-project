import {
  FlatTreeControl
} from '@angular/cdk/tree';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  COFService
} from 'src/app/_service/COFService';
import {
  ReportSearch
} from 'src/app/_shared/request/crm/Report';
import {
  Branch
} from "../../../_shared/request/crm/Branch";
import {
  RequestClassKey,
  RequestList
} from 'src/app/_shared/request/crm/RequestList';
import { firstValueFrom, Subject } from 'rxjs';
import { ISelectOptionItem, LoadListSrvice } from '../../services/LoadListSrvice';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'crm-multi-check-grid-selector',
  templateUrl: './MultiCheckGridSelector.html',
  styleUrls: ['./MultiCheckGridSelector.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiCheckGridSelector),
    multi: true
  }]
})
export class MultiCheckGridSelector implements OnInit,ControlValueAccessor {

  constructor(private cof: COFService, private translate: TranslateService,private loadList:LoadListSrvice) {

  }

  @Input() requestName: RequestClassKey = RequestClassKey.REFERENCE;
  @Input() setRequestParams!: (request: any) => void;
  @Input() colLabels:string[] = ['GENERAL.ID','GENERAL.TITLE'];
  request!: ReportSearch | Branch;
  @Input() selectedKeys:string[] = [];
  @Output() valueChange =  new EventEmitter();
  @Input() kod :string = 'id'
  onChange: any = () => { };
  onTouched: any = () => { };
  isSetAll:boolean = false;

  ngOnInit() {
    this.request = RequestList.get(this.requestName);

    if (this.request)
      this.getData();
  }


  public data: itemData[] = [];
  public selectedItem!: itemData | null;

  @Output() reportSelected: EventEmitter < any > = new EventEmitter()

  async getData(): Promise<void> {
    if (this.setRequestParams) {
      this.setRequestParams(this.request);
    }

    this.request.setCount(10000);
    let resp:ISelectOptionItem[] = await firstValueFrom(this.loadList.load(this.requestName,this.setRequestParams));
    resp.forEach((v: ISelectOptionItem) => {
      let item:itemData ={
        id: (this.requestName == RequestClassKey.REF_TREE ? v.obj.key : v.key),
        name: v.title ? v.title : '',
        parent_id: (this.requestName == RequestClassKey.REF_TREE ? v.obj.parent_key : v.obj.parent_id),
        obj: v.hasOwnProperty('obj') ? v.obj : null,
      }
      this.data.push(item)
    });
  }

  public refresh() {
    this.selectedItem = null;
    setTimeout(() => {
      this.getData();
    }, 300)
  }

  setVal(val: string | null) {
      this.selectedItem = this.data.find( v=> v.id == val) || null;
      this.reportSelected.emit(this.selectedItem);
  }

  nodeSelected(node: ExampleFlatNode) {
    let item = this.data.find((v: itemData) => {
      return v.id == node.obj.id;
    });
    this.selectedItem = item || null;
    this.reportSelected.emit(item);
  }

  checkAll(matChange: MatCheckboxChange){
    this.isSetAll = matChange.checked
    if(matChange.checked)
    this.data.forEach( v=>{
      if(!this.selectedKeys.includes(v.id))
      this.selectedKeys.push(v.id);
    })
  }

  itemChanged(matChange: MatCheckboxChange,item:itemData){
    let is_checked = matChange.checked;
    if(is_checked){
      this.selectedKeys.push(item.id)
    }else{
      let index = this.selectedKeys.findIndex(v => v == item.id);
      if (index !== -1) {
        this.selectedKeys.splice(index, 1);
      }
    }
    this.onChange(this.selectedKeys);
    this.valueChange.emit(this.selectedKeys);
  }


  writeValue(value: string[]): void {
    if(typeof value == 'object')
    this.selectedKeys = value;
    else
    this.selectedKeys = []
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}

export interface itemData {
  id: string,
  name: string,
  parent_id ? : string | null,
  obj?:any,
}

export interface Node {
  id: string,
    name: string,
    parent_id ? : string | null,
    children ? : Node[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  obj: Node;
}
