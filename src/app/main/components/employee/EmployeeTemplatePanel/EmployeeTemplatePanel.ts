import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  LangChangeEvent,
  TranslateService
} from '@ngx-translate/core';
import {
  ColDef
} from 'ag-grid-community';
import {
  BehaviorSubject,
  from,
  interval,
  merge,
  Observable,
  ReplaySubject,
  take
} from 'rxjs';
import {
  SkeletonTabComponent
} from 'src/app/common/widgets/CrmDynamicTab/SkeletonTabComponent';
import {
  AgGridBean
} from 'src/app/common/widgets/DataGrid/AgGridBean';
import { AbstractSearch } from 'src/app/_shared/abstract/AbstractSearch';

@Component({
  selector: 'employee-address-template',
  templateUrl: './EmployeeTemplatePanel.html',
  styleUrls: ['./EmployeeTemplatePanel.css']
})
export class EmployeeTemplatePanel implements OnInit, AfterViewInit, SkeletonTabComponent {

  @Input() ownerId!: string;
  @Input() refTablecolumnDefs: ColDef[] = []
  @Input() pageSize = 5;
  @Input() showAddbutton:boolean = true;
  data!: DynamicEmployeePanelData;
  public isDynamicLoaded: boolean = false;
  $reloadData: BehaviorSubject < null > = new BehaviorSubject(null);
  isCanLoadData: boolean = false;
  isDataLoaded:boolean = false;
  @Output() btnClicked =  new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.setDynamicData();
    this.$reloadData.subscribe(v => {
      if (!this.isDynamicLoaded || this.isCanLoadData){
        this.loadData();
      }
    })
  }
  employeePanelRequest!: ownerPanelSearchRequest;

  initPanel(){
    this.isCanLoadData = true;
    if(!this.isDataLoaded){
      this.$reloadData.next(null);
    }
  }

  @ViewChild(AgGridBean, {
    static: true
  }) dataGrid!: AgGridBean;

  ngAfterViewInit(): void {}

  setDynamicData() {
    if (this.isDynamicLoaded) {
      this.ownerId = this.data.ownerId;
      this.refTablecolumnDefs = this.data.refTablecolumnDefs;
      this.employeePanelRequest = this.data.request;
      this.showAddbutton = this.data.hasOwnProperty('showAddbutton') ? this.data.showAddbutton :true; 
      this.$reloadData.next(null);
    }
  }

  loadData() {
    if(this.ownerId && this.ownerId != '-1'){
      this.employeePanelRequest.setOwnerId(this.ownerId);
      if (this.dataGrid) {
        this.isDataLoaded = true;
        this.dataGrid.reloadGrid();
      }
    }
  }

  refreshData():void{
    this.loadData();
  }

  setData(data:any){
    this.isDynamicLoaded = true;
    this.data = data;
  }

  clickedButton(key : string,data: any = null){
    this.btnClicked.emit({
      key:key,
      data : data
    })
  }
}

export interface DynamicEmployeePanelData {
  ownerId: string;
  refTablecolumnDefs: ColDef[];
  request: ownerPanelSearchRequest;
  showAddbutton:boolean;
  onAdd:any;
}

export interface BtnClickData{
  key:string;
  data?:any;
}

export interface ownerPanelSearchRequest extends AbstractSearch{
  setOwnerId(ownerId:string):void;
}