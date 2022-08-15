import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  ColDef
} from 'ag-grid-community';
import { Observable } from 'rxjs';
import { CrmAlertDialogTypeError } from 'src/app/common/enums/crm-alert-dialog.enum';
import { CrmAlertDialog } from 'src/app/common/widgets/CrmAlertDialog/CrmAlertDialog';
import { CrmFormDialog, FormDialogComponent } from 'src/app/common/widgets/CrmFormDialog/CrmFormDialog';
import { AgGridBean } from 'src/app/common/widgets/DataGrid/AgGridBean';
import { IReportParam } from 'src/app/main/models/report-param.entity';
import { COFService } from 'src/app/_service/COFService';
import { ReportParamDelete } from 'src/app/_shared/request/crm/ReportParamDelete';
import { ReportParamSearch } from 'src/app/_shared/request/crm/ReportParamSearch';
import { BreadcrumbModel, BreadCrumbService } from '../../breadcrumb/BreadCrumbService';
import { SessionInfoService } from '../../services/session-info.service';
import { ReportParamForm } from '../ReportParamForm/ReportParamForm';

@Component({
  selector: 'crm-report-control-params-panel',
  templateUrl: './ReportControlParamsPanel.html',
  styleUrls: ['./ReportControlParamsPanel.css'],
})
export class ReportControlParamsPanel  implements OnInit {

  private _reportId!: string;
  @Input()
  get reportId(): string {
    return this._reportId;
  }
  set reportId(v: string) {
    this._reportId = (v) || '0';
    this.loadTable();
  }
  ngOnInit() {}

  constructor(public cof: COFService, private session: SessionInfoService, private translate: TranslateService,private breadcrumbs: BreadCrumbService) {
    this.breadcrumbs.setItems([
      new BreadcrumbModel(this.translate.instant('MENU.REPORT_SETTINGS')),
    ]);

  }
  @ViewChild(AgGridBean, {
    static: true
  }) dataGrid!: AgGridBean;

  requestReportParams = new ReportParamSearch();
  pageSize =12;

  tablecolumnDefs: ColDef[] = [{
      field: 'id',
      headerName: 'GENERAL.ID',
      resizable: true,
    },
    {
      field: 'name',
      headerName: 'GENERAL.TITLE',
      resizable: true,
    },
    {
      field: 'order',
      headerName: 'FORM.ORDER',
      resizable: true,
    },
    {
      field: 'data_type',
      headerName: 'GENERAL.TYPE',
      resizable: true,
    },
    {
      field: 'edit',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onEditClick.bind(this),
        icon: 'edit',
        colorMode: 'primary'
      },
      headerName: 'FORM.CHANGE'
    },
    {
      field: 'delete',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onDeleteClick.bind(this),
        icon: 'delete',
        colorMode: 'warn'
      },
      headerName: 'FORM.DELETE'
    },

  ];

  loadTable(){
    if (this.dataGrid) {
      this.requestReportParams.report_id = this.reportId;
      this.dataGrid.reloadGrid();
    }
  }

  onEditClick(e: any) {
    let item:  IReportParam = e.rowData;
    this.openForm(item.id);
  }

  onDeleteClick(e:any){
    let item:  IReportParam = e.rowData;
    let deleteRequest = new ReportParamDelete(item.id);
    this.cof.doRequest(deleteRequest).subscribe((resp:any)=>{
      if(resp && resp.error_code == 0){
        CrmAlertDialog.show('GENERAL.DATA_DELETED',CrmAlertDialogTypeError.INFO);
        this.loadTable();
      }
    })
  }

  onAdd(){
    this.openForm();
  }

  openForm(id?:string){
    CrmFormDialog.show(null,ReportParamForm,<ReportFormData>{
      report_id:this.reportId,
      id:id
    }).subscribe((isNeedRefresh:Boolean)=>{
      if(isNeedRefresh){
        this.loadTable();
      }
    })
  }
 
}

export interface ReportFormData{
  report_id:string;
  id?:string;
}