import {
  FlatTreeControl
} from '@angular/cdk/tree';
import {
  Component,
  OnInit,
  QueryList,
  Type,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  MatCheckbox
} from '@angular/material/checkbox';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import { TranslateService } from '@ngx-translate/core';
import {
  AttributeParam
} from 'src/app/common/widgets/AttributeSetupPanel/AttributeParam/AttributeParam';
import {
  AttributeParamConfig
} from 'src/app/common/widgets/AttributeSetupPanel/AttributeParam/AttributeParamConfig';
import {
  ISelectOption
} from 'src/app/common/widgets/CrmSelect/CrmSelect';
import { itemData } from 'src/app/common/widgets/TreeSelector/TreeSelector';
import {
  ReportSearch
} from 'src/app/_shared/request/crm/Report';
import {
  ReportExecute
} from 'src/app/_shared/request/crm/ReportExecute';
import {
  ReportParamSearch
} from 'src/app/_shared/request/crm/ReportParamSearch';
import { RequestClassKey } from 'src/app/_shared/request/crm/RequestList';
import {
  COFService
} from '../../../_service/COFService';
import {
  IReportParam,
  IReportParamCollection
} from '../../models/report-param.entity';
import {
  IReport,
  IReportCollection
} from '../../models/report.entity';
import { BreadcrumbModel, BreadCrumbService } from '../breadcrumb/BreadCrumbService';
import {
  SessionInfoService
} from '../services/session-info.service';
import {
  ReportNode
} from './ReportTreeSelector/ReportTreeSelector';

@Component({
  selector: 'crm-report',
  templateUrl: './Report.html',
  styleUrls: ['./Report.css']
})
export class Report implements OnInit {

  constructor(private cof: COFService, private session: SessionInfoService,private breadcrumbs: BreadCrumbService,private translate: TranslateService) {
    this.breadcrumbs.setItems([
      new BreadcrumbModel(this.translate.instant('MENU.REPORT')),
    ]);

  }

  ngOnInit() {}

  public selectedReport!: ReportNode;
  public isASync: boolean = false;
  reportRequest = new ReportSearch();
  params: AttributeParamConfig[] = [];
  keyClass = RequestClassKey.REPORT;

  @ViewChild(MatCheckbox, {
    static: true
  }) cbAsync!: MatCheckbox;
  @ViewChildren(AttributeParam) reportComponents!: QueryList < AttributeParam > ;

  public formats: ISelectOption[] = [];
  public selFormatType!: string;
  public reportParams: IReportParam[] = [];

  reportNodeSelected(item: itemData) {
    this.clearParams();
    if(item && item.obj){
      this.selectedReport = item.obj;
      this.formats = this.selectedReport.content_type.split(";").map(v => < ISelectOption > {
        key: v,
        title: v
      });
      this.selFormatType = this.selectedReport.content_type.split(";")[0];
  
      this.getReportParam();
    }
  }

  clearParams() {
    this.isASync = false;
    this.reportParams = [];
    this.params = [];
  }


  getReportParam(): void {

    let reportParamRequest = new ReportParamSearch();
    reportParamRequest.setCount(1000);
    reportParamRequest.report_id = this.selectedReport.id;
    this.cof.doRequest(reportParamRequest).subscribe(res => {
      if (res) {
        let data = < IReportParamCollection > res;
        this.reportParams = data.data;
        this.reportParams.forEach((item: IReportParam) => {
          let p = new AttributeParamConfig(item.id, item.component, item.name, item.component, '', '', '', false, false, item.order);
          this.params.push(p);
        });
      }
    })


  }


  getResponseType(content_type: string): string {
    let resp: string = '';
    switch (content_type) {
      case 'xlsx':
        resp = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;';
        break;

      default:
        resp = 'text/plain';
        break;
    }
    return resp;
  }

  onFormatChange(type:string){
    this.selFormatType = type;
  }

  formatValue(val: string, type: number): string | number | Date | null {
    let res: string | number | Date | null = null;
    switch (type) {
      case DataTypes.TYPE_STR:
        res = val;
        break;
      case DataTypes.TYPE_INT:
        res = parseInt(val);
        break;
      case DataTypes.TYPE_STR:
        res = new Date(val);
        break;
    }
    return res;
  }

  onView(): void {
    let isValid: Boolean = true;
    let data: ReportExecute = new ReportExecute(this.selectedReport.id);
    this.reportComponents.toArray().forEach((v: AttributeParam, index: number) => {
      if (v.getParamValue() == '') {
        isValid = false;
        v.setShowError(true);
      } else {
        v.setShowError(false);
      }
      ( < any > data)[v.getParamName()] = this.formatValue(v.getParamValue(), this.reportParams[index].data_type);
    })
    if (!isValid) {
      return;
    }
    this.cof.doReportRequest(data).subscribe(response => {

      let blob: any = new Blob([response], {
        type: this.getResponseType(this.selectedReport.content_type)
      });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a')
      a.href = url
      a.download = 'REPORT.' + this.selFormatType;
      a.click();
      a.remove();

    })
  }



}


export enum DataTypes {
  TYPE_STR = 0,
    TYPE_INT = 1,
    TYPE_DATE = 2
}
