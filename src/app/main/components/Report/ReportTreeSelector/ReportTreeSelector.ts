import {
  FlatTreeControl
} from '@angular/cdk/tree';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import { TranslateService } from '@ngx-translate/core';
import { IReport, IReportCollection } from 'src/app/main/models/report.entity';
import { COFService } from 'src/app/_service/COFService';
import {
  ReportSearch
} from 'src/app/_shared/request/crm/Report';

@Component({
  selector: 'crm-report-tree-selector',
  templateUrl: './ReportTreeSelector.html',
  styleUrls: ['./ReportTreeSelector.css']
})
export class ReportTreeSelector implements OnInit {

  constructor(private cof: COFService, private translate:TranslateService) {

  }

  ngOnInit() {
    this.getTreeData();

  }
  private treeData!: any;
  public selectedReport!: ReportNode | null;
  reportRequest = new ReportSearch();
  @Output() reportSelected:EventEmitter<ReportNode> =  new EventEmitter()

  getTreeData(): void {
    this.reportRequest.setCount(10000);
    this.cof.doRequest(this.reportRequest).subscribe(resp => {
      if (resp) {
        let data = < IReportCollection > resp;
        this.populateTree(data.data)
      }
    })
  }

  public refresh(){
    this.selectedReport = null;
    this.treeData =[]
    this.dataSource.data = [this.treeData];
    setTimeout(()=>{
      this.getTreeData();
    },300)
  }

  private _transformer = (node: ReportNode, level: number) => {
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


  populateTree(list: ReportNode[]) {

    let rootNode: ReportNode = {
      name: this.translate.instant('All'),
      id: '0',
      branch_id: 0,
      content_type: '',
      edit_by: 0,
      edit_date: '',
      executor: '',
      flag: 0,
      order: 0,
      parent_id: '',
      security_role: '',
      sql_body: '',
      template_name: ''
    };

    list.push(rootNode);
    list.forEach(el => {
      // Handle the root element
      if (el.parent_id === null) {
        el.parent_id = '0';
      }
      // Use our mapping to locate the parent element in our data array
      const parentEl = list.find(v => {
        return v.id == el.parent_id
      });
      // Add our current el to its parent's `children` array
      if (parentEl != undefined) {
        parentEl.children = [...(parentEl.children || []), el];
      }
    });
    this.treeData = rootNode;
    this.dataSource.data = [this.treeData];
  }


  nodeSelected(node: ExampleFlatNode) {
    this.selectedReport = node.obj;
    this.reportSelected.emit(this.selectedReport);
  }

  
 

}

export interface ReportNode extends IReport {
  children ? : ReportNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  obj: ReportNode;
}

