import {
  FlatTreeControl
} from '@angular/cdk/tree';
import {
  Component,
  EventEmitter,
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

@Component({
  selector: 'crm-tree-selector',
  templateUrl: './TreeSelector.html',
  styleUrls: ['./TreeSelector.css']
})
export class TreeSelector implements OnInit {

  constructor(private cof: COFService, private translate: TranslateService,private loadList:LoadListSrvice) {

  }

  @Input() key!: RequestClassKey;
  @Input() setRequestParams!: (request: any) => void;
  @Input() withAll: boolean = true;
  @Input()  set selItemId(val:string|null){
    if(this._setlItemId != val){
      this._setlItemId = val;
      this.$valChanged.next(null)
    }
  };
  get selItemId() :string|null{
    return this._setlItemId;
  };
  request!: ReportSearch | Branch;
  private _setlItemId:string | null = null;
  private $valChanged:Subject<null> = new Subject();

  ngOnInit() {
    this.request = RequestList.get(this.key);

    if (this.request)
      this.getTreeData();
      this.$valChanged.subscribe(res =>{
        if(this.data && this.data.length > 0)
        this.setVal(this.selItemId);
        })
  }


  private treeData!: any;
  private data!: itemData[];
  public selectedItem!: itemData | null;

  @Output() reportSelected: EventEmitter < any > = new EventEmitter()

  async getTreeData(): Promise<void> {
    if (this.setRequestParams) {
      this.setRequestParams(this.request);
    }

    this.request.setCount(10000);
    let resp:ISelectOptionItem[] = await firstValueFrom(this.loadList.load(this.key,this.setRequestParams));
    this.data = []
    resp.forEach((v: ISelectOptionItem) => {
      let item:itemData ={
        id: (this.key == RequestClassKey.REF_TREE ? v.obj.key : v.key),
        name: v.title ? v.title : '',
        parent_id: (this.key == RequestClassKey.REF_TREE ? v.obj.parent_key : v.obj.parent_id),
        obj: v.hasOwnProperty('obj') ? v.obj : null
      }
      // console.log(item,v,'v')
      this.data.push(item)
    });
    // console.log(this.data,'data')
    this.populateTree(this.data);
    this.setVal(this.selItemId);
  }

  public refresh() {
    this.selectedItem = null;
    this.treeData = []
    this.dataSource.data = [this.treeData];
    setTimeout(() => {
      this.getTreeData();
    }, 300)
  }

  setVal(val: string | null) {
      this.selectedItem = this.data.find( v=> v.id == val) || null;
      this.reportSelected.emit(this.selectedItem);
  }

  private _transformer = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      obj: node
    };
  }

  treeControl = new FlatTreeControl < ExampleFlatNode > (
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  populateTree(list: Node[]) {

    if ([RequestClassKey.REPORT].includes(this.key)) {
      let rootNode: Node = {
        name: this.translate.instant('All'),
        id: '0',
        parent_id: null,
        children: [],
      };
      list.push(rootNode);
    }
    list.forEach(el => {
      // Handle the root element
      if(el.parent_id === null && el.id != '0'){
        el.parent_id = '0'
      }
      if (el.parent_id === null || (el.parent_id == '0'  && el.id == '0')) {
        el.parent_id = '-1';
      }
      // Use our mapping to locate the parent element in our data array
      const parentEl = list.find(v => {
        return v.id == el.parent_id && v.id != v.parent_id;
      });
      // console.log(parentEl,el,'el')
      // Add our current el to its parent's `children` array
      if (parentEl != undefined) {
        parentEl.children = [...(parentEl.children || []), el];
      }
    });
    // console.log(list,'rootNode')

    if (this.withAll) {
      this.treeData = list.filter(v => {
        return v.id == '0';
      });
    } else {
      this.treeData = list.filter(v => {
        return v.parent_id == '0';
      });
    }

    this.dataSource.data = this.treeData;
  }


  nodeSelected(node: ExampleFlatNode) {
    let item = this.data.find((v: itemData) => {
      return v.id == node.obj.id;
    });
    this.selectedItem = item || null;
    this.reportSelected.emit(item);
  }




}

export interface itemData {
  id: string,
    name: string,
    parent_id ? : string | null,
    obj?:any

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
