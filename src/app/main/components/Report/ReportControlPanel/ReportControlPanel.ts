import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { BaseForm } from 'src/app/common/base.form/base-form';
import { CrmAlertDialogTypeError } from 'src/app/common/enums/crm-alert-dialog.enum';
import { CrmAlertDialog } from 'src/app/common/widgets/CrmAlertDialog/CrmAlertDialog';
import { IReport, IReportCollection } from 'src/app/main/models/report.entity';
import { COFService } from 'src/app/_service/COFService';
import { ReportSearch } from 'src/app/_shared/request/crm/Report';
import { ReportSave } from 'src/app/_shared/request/crm/ReportSave';
import { RequestClassKey } from 'src/app/_shared/request/crm/RequestList';
import { SessionInfoService } from '../../services/session-info.service';
import { ReportNode, ReportTreeSelector } from '../ReportTreeSelector/ReportTreeSelector';

@Component({
  selector: 'crm-report-control-panel',
  templateUrl: './ReportControlPanel.html',
  styleUrls: ['./ReportControlPanel.css']
})
export class ReportControlPanel extends BaseForm implements OnInit {
  ngOnInit() {
  }

  public selectedReport!: ReportNode;
  public reportId!:string;
  private  flag: number =0;
  reportRequest = new ReportSearch();
  keyClass = RequestClassKey.REPORT;

  @ViewChild(ReportTreeSelector, { static: true }) reportTree!: ReportTreeSelector;

  constructor(override cof: COFService, private session: SessionInfoService) {
    super(cof)
  }

  override form = new FormGroup({
    branchId:new FormControl(),
    contentType:new FormControl(null,[Validators.required]),
    executor:new FormControl(null,[Validators.required]),
    flag:new FormControl(),
    id:new FormControl(),
    name: new FormControl('',[Validators.required]),
    parentId: new FormControl(null),
    securityRole: new FormControl(),
    order: new FormControl(),
    sqlBody: new FormControl(),
    templateName:new FormControl(),
  })



  reportNodeSelected(node:ReportNode) {
    this.clearDetails();
    this.selectedReport =node;
    this.reportId = this.selectedReport.id;
    this.getDetails();
  }


  clearDetails() {
    this.form.reset();
  }


  getDetails(): void {
    this.reportRequest.setId(this.reportId);
    this.reportRequest.setCount(1);
    this.cof.doRequest(this.reportRequest).subscribe(resp => {
      if (resp) {
        let data = < IReportCollection > resp;
        if(data.data.length > 0)
        this.fillDetail(data.data[0]);
      }
    })
  }

  fillDetail(row: IReport ) {
    this.clearDetails();
    this.form.setValue({
      branchId: row.branch_id,
      contentType:row.content_type,
      executor:row.executor,
      flag: row.flag,
      id:row.id,
      name: row.name,
      parentId: row.parent_id,
      securityRole: row.security_role,
      order: row.order,
      sqlBody: row.sql_body,
      templateName:row.template_name,
    })
  }

  setParentReportParam = (request: ReportSearch): void => {
  }

  onClear(){
    this.clearDetails();
  }

  onRefresh(){
    this.reportNodeSelected(this.selectedReport);
  }

  onSave(){
    this.saveProcess()
  }

  prepareRequest() {
    let saveRequest = new ReportSave(this.form.get('id')?.value);
    saveRequest.branch_id = this.form.get('branchId')?.value;
    saveRequest.content_type = this.form.get('contentType')?.value;
    saveRequest.executor= this.form.get('executor')?.value;
    saveRequest.flag = this.form.get('flag')?.value;
    saveRequest.name = this.form.get('name')?.value;
    saveRequest.parent_id = this.form.get('parentId')?.value;
    saveRequest.security_role = this.form.get('securityRole')?.value;
    saveRequest.order = this.form.get('order')?.value;
    saveRequest.sql_body = this.form.get('sqlBody')?.value;
    saveRequest.template_name = this.form.get('templateName')?.value;
    return saveRequest;
  }



  onSaveAsNew(){
    this.form.patchValue({
      id:null
    })
    this.saveProcess()
  }

  override afterSave(): void {
      this.clearDetails();
      CrmAlertDialog.show('GENERAL.DATA_SAVED',CrmAlertDialogTypeError.INFO);
      this.reportTree.refresh();
  }

}

