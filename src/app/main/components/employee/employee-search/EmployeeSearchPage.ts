import {Component, HostListener, OnInit, ViewChild} from "@angular/core";
import {EmployeeSearch} from "../../../../_shared/request/crm/EmployeeSearch";
import {ColDef} from "ag-grid-community";
import {FormControl, FormGroup} from "@angular/forms";
import {AgGridBean} from "../../../../common/widgets/DataGrid/AgGridBean";
import {CrmBranch} from "../../../../common/widgets/CrmBranch/CrmBranch";
import {Router} from "@angular/router";
import {Reference} from "../../../../_shared/request/crm/Reference";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeAddComponent} from "../employee-add/employee-add.component";
import {CommonUtil} from "../../../../_service/util/CommonUtil";
import {StringUtil} from "../../../../_service/util/StringUtil";
import { CrmRefType } from "src/app/common/enums/crm-ref-type.enum";
import {DateUtil} from "../../../../_service/util/DateUtil";
import { IConvertedMipData, MipData } from "src/app/main/models/mip.entity";
import { TranslateService } from "@ngx-translate/core";
import { BreadcrumbModel, BreadCrumbService } from "../../breadcrumb/BreadCrumbService";
import { SystemDefault } from "src/app/common/enums/system-defaults.enum";
import { IMipAddressConverted } from "src/app/main/models/mip-address.entity";
import { SessionInfoService } from "../../services/session-info.service";
import { CrmPersonDataPasport } from "src/app/common/widgets/CrmPersonDataPasport/CrmPersonDataPasport";

@Component({
  selector: 'crm-employee-search',
  templateUrl: './EmployeeSearchPage.html',
  styleUrls: ['./EmployeeSearchPage.css'],
})
export class EmployeeSearchPage implements OnInit {
  constructor(private router: Router, private dialog: MatDialog, private translate:TranslateService,private breadcrumbs: BreadCrumbService, public sessionInfoSvc: SessionInfoService) {
    this.breadcrumbs.setItems([
      new BreadcrumbModel(this.translate.instant('MENU.SEARCH_EMPLOYEE')),
    ]);

  }

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    from_born_date: new FormControl(),
    to_born_date: new FormControl(),
    branch_id: new FormControl(),
    first_name: new FormControl(),
    last_name: new FormControl(),
    middle_name: new FormControl(),
    military_id: new FormControl(),
    token_id: new FormControl(),
    position_id: new FormControl(),
  });

  refTableColumnDefs: ColDef[] = [
    {
      field: 'last_name&first_name&middle_name',
      headerName: 'DRIVER.FULLNAME',
      resizable: true,
      valueGetter: params => { return (params.data) ?  params.data.last_name + ' ' + params.data.first_name+' '+ params.data.middle_name: ''},
      width:600
    },
    {
      field: 'branch_id',
      headerName: 'GENERAL.ORGANIZATION',
      resizable: true,
      cellRenderer: params => CommonUtil.getBranchNameById(params.value),
      width:500
    },
    {
      field: 'token_id',
      headerName: 'GENERAL.JETON_NUMBER',
      resizable: true,
    },
    {
      field: 'military_id',
      headerName: 'GENERAL.MILITARY_NUMBER',
      resizable: true,
    },
    {
      field: 'position_id',
      headerName: 'GENERAL.POSITION',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.POSITION))
    },
    {
      field: 'born_date',
      headerName: 'GENERAL.BIRTHDATE',
      resizable: true,
      cellRenderer: params => <string>DateUtil.formatDate(params.value)
    },
    {
      field: 'edit_by',
      headerName: 'GENERAL.EMPLOYEE',
      resizable: true,
      cellRenderer: params => CommonUtil.getEmployeeNameById(params.value),

    },
    {
      field: 'edit_date',
      headerName: 'GENERAL.EDIT_DATE',
      cellRenderer: params => ( (params.value) ? DateUtil.formatDate(params.value,'dd.MM.yyyy HH:mm:ss') + '' : ''),
      resizable: true,
    },
   ];

  pageSize = 12;
  requestEmployees = new EmployeeSearch();

  @ViewChild(AgGridBean, {static: true}) dataGrid!: AgGridBean;
  @ViewChild(CrmBranch, {static: true}) branch!: CrmBranch;

  gridSelectEvent(event: any) {
    if(this.sessionInfoSvc.hasAccess('kadr_detail_view')){
      this.router.navigate(['/employee/detail/', event.id]);
    }
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key == 'F7'){
      this.getEmployeeList();
    }
  }

  getEmployeeList() {
    this.requestEmployees.setFirstName(StringUtil.emptyString(this.form.get('first_name')!.value) ? null : this.form.get('first_name')!.value);
    this.requestEmployees.setLastName(StringUtil.emptyString(this.form.get('last_name')!.value) ? null : this.form.get('last_name')!.value);
    this.requestEmployees.setMiddleName(StringUtil.emptyString(this.form.get('middle_name')!.value) ? null : this.form.get('middle_name')!.value);
    this.requestEmployees.setBranchIdStartsWith((this.form.get('branch_id')?.value === 0 && !this.form.get('branch_id')?.value) ? null : this.form.get('branch_id')?.value);
    this.requestEmployees.setMilitaryId(StringUtil.emptyString(this.form.get('military_id')!.value) ? null : this.form.get('military_id')!.value);
    this.requestEmployees.setTokenId(StringUtil.emptyString(this.form.get('token_id')!.value) ? null : this.form.get('token_id')!.value);
    this.requestEmployees.setPositionId(this.form.get('position_id')!.value);
    this.requestEmployees.setFromBornDate(this.form.get('from_born_date')!.value);
    this.requestEmployees.setToBornDate(this.form.get('to_born_date')!.value);
    if (this.dataGrid) {
      this.dataGrid.reloadGrid();
    }
  }

  positionParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId('104');
    return;
  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl!.status == 'INVALID' && formControl!.touched;
  }

  openForm() {
    CrmPersonDataPasport.openDialog().subscribe(result => {
      if (result && !!result) {
        let dialogRef = this.dialog.open(EmployeeAddComponent, {
          width: '90%',
          height: '90%',
        });
        dialogRef.componentInstance.form.patchValue(this.convertData(result.data, result.address));
        dialogRef.componentInstance.afterSaveFunc = function () {
          dialogRef.close(true);
        }
        dialogRef.afterClosed().subscribe(result => {
          this.dataGrid.reloadGrid();
        });
      }
    });
  }

  convertData(result: IConvertedMipData, address: IMipAddressConverted) {
    return {
      sex_id: result.sex,
      pnfl: result.pinfl,
      born_date: result.birth_date,
      first_name: result.name_latin,
      last_name: result.surname_latin,
      nationality_id: result.nationality_id,
      citizenship_id: result.citizenship_id,
      docType:SystemDefault.PASSPORT_DOC,
      seriya: result.document.substr(0, 2),
      nomer: result.document.substr(2),
      givenDate: result.date_begin_document,
      issueDate: result.date_end_document,
      middle_name: result.patronym_latin,
      // givenBy: result.doc_give_place,
      givenBy: result.doc_giveplace_id,
      region: address ? address.region : null,
      city: address ? address.district :  null,
      note: address ? address.address :  null,
      cadas_id: address ? address.cadastre :  null,
    };

  }

  resetForm(){
    this.form.reset();
  }

}
