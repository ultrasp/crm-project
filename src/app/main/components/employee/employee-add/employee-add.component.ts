import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { flatMap, merge, Observable } from 'rxjs';
import { BaseForm } from 'src/app/common/base.form/base-form';
import { CrmAlertDialogTypeError } from 'src/app/common/enums/crm-alert-dialog.enum';
import { CrmApiUrl } from 'src/app/common/enums/crm-api-urls.enum';
import { CrmRefType } from 'src/app/common/enums/crm-ref-type.enum';
import { SystemConfig } from 'src/app/common/enums/system-config.enum';
import { AttributeSetupPanel } from 'src/app/common/widgets/AttributeSetupPanel/AttributeSetupPanel';
import { CrmAddressPanel } from 'src/app/common/widgets/CrmAddressPanel/CrmAddressPanel';
import { CrmAlertDialog } from 'src/app/common/widgets/CrmAlertDialog/CrmAlertDialog';
import { CrmFormDialog } from 'src/app/common/widgets/CrmFormDialog/CrmFormDialog';
import { CrmPasportPanel } from 'src/app/common/widgets/CrmPasportPanel/CrmPasportPanel';
import { EmployeeCollection } from 'src/app/main/models/employee-entity';
import { IEmployee } from 'src/app/main/models/employee.entity';
import { COFService } from 'src/app/_service/COFService';
import { NumberUtil } from 'src/app/_service/util/NumberUtil';
import { Employee } from 'src/app/_shared/request/crm/Employee';
import { EmployeeAddressSave } from 'src/app/_shared/request/crm/EmployeeAddressSave';
import { EmployeeSave } from 'src/app/_shared/request/crm/EmployeeSave';
import { Reference } from 'src/app/_shared/request/crm/Reference';
import { SessionInfoService } from '../../services/session-info.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent extends BaseForm implements OnInit, OnDestroy {

  @Input() employee_id!:string;
  public afterSaveFunc: any;
  override form: FormGroup = new FormGroup({
    branch_id: new FormControl('', [Validators.required]),

    token_id: new FormControl('', []),
    // workPlace: new FormControl('', Validators.required),
    middle_name: new FormControl('', []),
    military_title_id: new FormControl('', [Validators.required]),
    sex_id: new FormControl('', [Validators.required]),
    born_date: new FormControl(null, [Validators.required]),
    profession_id: new FormControl(null, [Validators.required]),

    military_id: new FormControl('', []),
    first_name: new FormControl('', []),
    nationality_id: new FormControl('', [Validators.required]),
    academic_degree_id: new FormControl('', [Validators.required]),
    citizenship_id: new FormControl('', [Validators.required]),

    pnfl: new FormControl('', []),
    last_name: new FormControl('', []),
    academic_type_id: new FormControl('', [Validators.required]),
    party_member: new FormControl(false),
    position_id: new FormControl('', [Validators.required]),

    region: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    livePlace: new FormControl(),
    street:new FormControl('', []),
    note:new  FormControl('', []),
    house:new FormControl('', []),
    korpus:new FormControl('', []),
    flat:new FormControl('', []),
    addrTypeId: new FormControl(0, []),
    cadas_id: new FormControl(),

    seriya: new FormControl('',[Validators.required]),
    nomer: new FormControl('',[Validators.required]),
    givenDate: new FormControl('',[Validators.required]),
    issueDate: new FormControl('',[Validators.required]),
    givenBy: new FormControl('',[Validators.required]),
    docType:new FormControl('',Validators.required),

    isAttrValid: new FormControl('',[Validators.required])
  });

  pasportData: string = '';

  @Output() dataSaved = new EventEmitter();

  userId: number | undefined = 0;

  @ViewChild(CrmAddressPanel) addressPanel!: CrmAddressPanel;
  @ViewChild(AttributeSetupPanel) attributePanel!: AttributeSetupPanel;
  @ViewChild(CrmPasportPanel) pasportPanel!: CrmPasportPanel;

  constructor(override cof: COFService, private sessionInfo: SessionInfoService,  private router: Router, public dialogRef: MatDialogRef < CrmFormDialog >) {
    super(cof);
    this.userId = this.sessionInfo.getSesionInfo().data?.user_info.id;
  }

  ngOnInit(): void {
    if(this.employee_id)
    this.fillEmployeeData()
  }

  prepareRequest(): any {
    let request = new EmployeeSave();
    request.academic_degree_id = this.form.get('academic_degree_id')?.value;
    request.academic_type_id = this.form.get('academic_type_id')?.value;
    request.born_date = this.form.get('born_date')?.value;
    request.branch_id = this.form.get('branch_id')?.value;
    request.citizenship_id = this.form.get('citizenship_id')?.value;
    request.first_name = this.form.get('first_name')?.value;
    request.last_name = this.form.get('last_name')?.value;
    request.middle_name = this.form.get('middle_name')?.value;
    request.military_id = this.form.get('military_id')?.value;
    request.military_title_id = this.form.get('military_title_id')?.value;
    request.nationality_id = this.form.get('nationality_id')?.value;
    request.party_member = this.form.get('party_member')?.value;
    request.pnfl = this.form.get('pnfl')?.value;
    request.position_id = this.form.get('position_id')?.value;
    request.profession_id = this.form.get('profession_id')?.value;
    request.sex_id = this.form.get('sex_id')?.value;
    request.state_id = 1;
    request.token_id = this.form.get('token_id')?.value;
    if(this.employee_id)
    request.setId(this.employee_id)
    return request;
  }

  save() {
    this.saveProcess();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  militaryDegreeParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.MILITARY_DEGREE);
    return;
  }

  genderParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.GENDER);
    return;
  }

  ethnicNatinalityParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.NATIONALITY);
    return;
  }

  academicAwardParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.ACADEMIC);
    return;
  }

  nationalityParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CITIZENSHIP);
    return;
  }

  academicDegreeParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.SCIENCE_LEVEL);
    return;
  }

  partyMembershipParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId('1');
    return;
  }

  positionParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.POSITION);
    return;
  }
  
  professionParams = (searchRequest: Reference):void=>{
    searchRequest.setTypeId(CrmRefType.PROFESSION);
    return;
  }

  override beforeSave(): void {
      this.form.patchValue({
        isAttrValid: this.attributePanel.isValid() ? '1' : ''
      })
  }

  override saveCallback(result:any): void {
    
        this.employee_id = result.data.id;
        setTimeout(()=>{
          merge(this.addressPanel.save(),this.attributePanel.save(), this.pasportPanel.save()).subscribe(res=>{
            CrmAlertDialog.show('GENERAL.DATA_SAVED',CrmAlertDialogTypeError.INFO);
            this.dataSaved.emit();
            if(this.afterSaveFunc) {
              this.afterSaveFunc.call();
            }
          })
  
        },300)
  }

  onEnd(){
    this.form.reset();
    this.router.navigate(['/employee/detail/', this.employee_id ]);
  }

  fillEmployeeData(){
    let empRequest = new Employee();
    empRequest.setId(this.employee_id);
    empRequest.setCount(1);
    this.cof.doRequest(empRequest).subscribe(res => {
      let data = < EmployeeCollection > res;
      
      if (data && data.total_elements > 0) {
        let emp = data.data[0];

        this.form.patchValue({
          branch_id: emp.branch_id,

          token_id: emp.token_id,
          middle_name: emp.middle_name,
          military_title_id: emp.military_title_id,
          sex_id: NumberUtil.toString(emp.sex_id),
          born_date: emp.born_date,
      
          military_id: emp.military_id,
          first_name: emp.first_name,
          nationality_id: NumberUtil.toString(emp.nationality_id),
          academic_degree_id: NumberUtil.toString(emp.academic_degree_id),
          citizenship_id: emp.citizenship_id,
      
          pnfl: emp.pnfl,
          last_name: emp.last_name,
          academic_type_id: emp.academic_type_id,
          party_member: new Boolean(emp.party_member),
          position_id: emp.position_id,

          profession_id:emp.profession_id
        })
      }
    })
  }

  override onValidError(): void {
    CrmAlertDialog.show('FORM.NOT_ALL_FIELDS_FILLED',CrmAlertDialogTypeError.INFO);
  }

  close(isNeedRefresh : boolean = false) {
    this.dialogRef.close(isNeedRefresh);
  }

}
