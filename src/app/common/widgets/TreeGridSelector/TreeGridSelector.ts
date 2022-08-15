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
  selector: 'crm-tree-grid-selector',
  templateUrl: './TreeGridSelector.html',
  styleUrls: ['./TreeGridSelector.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TreeGridSelector),
    multi: true
  }]
})
export class TreeGridSelector implements OnInit,ControlValueAccessor {

  constructor(private cof: COFService, private translate: TranslateService,private loadList:LoadListSrvice) {

  }

  @Input() requestName: RequestClassKey = RequestClassKey.BRANCH;
  @Input() setRequestParams!: (request: any) => void;
  @Input() colLabels:string[] = ['GENERAL.ID','GENERAL.TITLE'];
  request!: ReportSearch | Branch;
  private _setlItemId:string | null = null;
  private $valChanged:Subject<null> = new Subject();
  selectedKeys:string[] = []
  @Output() valueChange =  new EventEmitter();

  onChange: any = () => { };
  onTouched: any = () => { };

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
    console.log(resp,'resp')
    let data:itemData[] = []
    resp.forEach((v: ISelectOptionItem) => {
      let item:itemData ={
        id: (this.requestName == RequestClassKey.REF_TREE ? v.obj.key : v.key),
        name: v.title ? v.title : '',
        parent_id: (this.requestName == RequestClassKey.REF_TREE ? v.obj.parent_key : v.obj.parent_id),
        obj: v.hasOwnProperty('obj') ? v.obj : null,
        showRow: false,
        hasChild: false,
        isExpanded:false,
        isChecked:false
      }
      if(item.parent_id == '0'){
        item.showRow = true;
      }
      data.push(item)
    });
    data.sort(function(a, b){return parseInt(a.id)-parseInt(b.id)});
    this.data = this.orderByParent(data);
  }

  orderByParent(data:itemData[],parent_id:any = '0'):any[]{
    const childElements = data.filter( v=> v.parent_id == parent_id);
    let res:any[] = [];
    if(childElements.length > 0 ){
      childElements.forEach( v=>{
        if(v.id != v.parent_id){
          this.data.push(v);
          let index = this.data.length;
          let childs = this.orderByParent(data,v.id);
          if(childs.length){
            v.hasChild = true
          }
          if(this.selectedKeys.includes(v.id)){
            v.isChecked = true;
          }
          res = res.concat(v,childs);
        }
      })
    }
    return res;
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
    this.setSubChecks('0',matChange.checked)
    this.emitEventChange();
  }

  itemChanged(matChange: MatCheckboxChange,item:itemData){
    item.isChecked = matChange.checked;
    if(!item.isChecked &&  item.parent_id && item.parent_id != '0'){
      this.setParentUncheck(item.parent_id)
    }
    this.setSubChecks(item.id,item.isChecked)
    this.emitEventChange();
  }

  setParentUncheck(parentId:string){
    let parent = this.data.find(v => v.id == parentId );
    if(parent) 
    parent.isChecked= false;
  }

  setSubChecks(parentId:string, isChecked: boolean){
    this.data.filter( v => v.parent_id == parentId)?.map( n =>{
      n.isChecked = isChecked;
      if(n.hasChild)
      this.setSubChecks(n.id,isChecked)
      return n;
    })
  }

  writeValue(value: string[]): void {
    if(value && typeof value == 'object')
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

  expandChild(item:itemData){
    item.isExpanded = !item.isExpanded
    // this.data.find( v=> v.id == item.id)?.isExpanded = ! 
    this.data.filter( v=> v.parent_id == item.id)?.map( n => n.showRow = item.isExpanded)
    console.log(this.data,'this.data')
  }

  makeSelectedKeyValue(parentId = '0'){
    const items = this.data.filter( v=> v.parent_id == parentId);
    items.forEach(v=>{
      if(v.isChecked){
        this.selectedKeys.push(v.id)
      }else{
        this.makeSelectedKeyValue(v.id);
      }
    })
  }

  emitEventChange(){
    this.selectedKeys = [];
    this.makeSelectedKeyValue();
    console.log(this.selectedKeys,'selectedKeys')
    this.onChange(this.selectedKeys);
    this.valueChange.emit(this.selectedKeys);

  }

}

export interface itemData {
  id: string,
  name: string,
  parent_id ? : string,
  obj?:any,
  showRow:boolean
  hasChild:boolean
  isExpanded:boolean
  isChecked:boolean
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
