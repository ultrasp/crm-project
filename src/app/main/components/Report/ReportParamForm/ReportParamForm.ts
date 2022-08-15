import {
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { BaseForm } from 'src/app/common/base.form/base-form';
import { FormDialogComponent } from 'src/app/common/widgets/CrmFormDialog/CrmFormDialog';
import { ISelectOption } from 'src/app/common/widgets/CrmSelect/CrmSelect';
import { IReportParam, IReportParamCollection } from 'src/app/main/models/report-param.entity';
import { IReportCollection } from 'src/app/main/models/report.entity';
import { COFService } from 'src/app/_service/COFService';
import { ReportParamSave } from 'src/app/_shared/request/crm/ReportParamSave';
import { ReportParamSearch } from 'src/app/_shared/request/crm/ReportParamSearch';
import { DataTypes } from '../Report';
import { ReportFormData } from '../ReportControlParamsPanel/ReportControlParamsPanel';


@Component({
  selector: 'crm-report-param-form',
  templateUrl: './ReportParamForm.html',
  styleUrls: ['./ReportParamForm.css']
})
export class ReportParamForm  extends BaseForm implements OnInit,FormDialogComponent {

  @Input() reportId!:string;
  @Input() id!:string;
  private reportParam!:IReportParam;
  public dataTypeList: ISelectOption[] = [];
  @Output() closeForm = new EventEmitter();

  constructor(override cof:COFService) {
    super(cof);
  }

  ngOnInit() {
    this.getData()
  }

  getData(){
    if(!this.id)
    return;
    let repParamRequest = new ReportParamSearch();
    repParamRequest.id = this.id;
    repParamRequest.setCount(1);
    this.cof.doRequest(repParamRequest).subscribe((res:any)=>{
      if(res){
        let data:IReportParamCollection = res;
        if(data.data.length > 0){
          this.reportParam = data.data[0]
          this.fillForm();
        }
      }
    })

  }

  override form = new FormGroup({
    order:new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    component:new FormControl('',[Validators.required]),
    dataType:new FormControl('',[Validators.required]),
  })


  fillForm() {
    this.form.patchValue({
      order:this.reportParam.order,
      name:this.reportParam.name,
      component:this.reportParam.component,
      dataType:this.reportParam.data_type,
    })
  }

  prepareRequest(): any {
    let saveRequest = new ReportParamSave(this.id);

    saveRequest.component = this.form.get('component')?.value;
    saveRequest.data_type = this.form.get('dataType')?.value;
    saveRequest.name = this.form.get('name')?.value;
    saveRequest.order = this.form.get('order')?.value;
    saveRequest.report_id = this.reportId;
    return saveRequest;
  }

  override afterSave(): void {
    this.closeForm.emit(true);
  }


  setData(data: ReportFormData): void {
      this.reportId = data.report_id;
      if(data.id){
        this.id = data.id;
      }
     }


}

