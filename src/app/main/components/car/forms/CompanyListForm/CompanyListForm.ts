import {AfterContentInit, AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {COFService} from "../../../../../_service/COFService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BaseForm} from "../../../../../common/base.form/base-form";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {InjectorInstance} from "../../../../../app.module";
import {Audit} from "../../../../../_shared/request/crm/Audit";
import {ColDef} from "ag-grid-community";
import {AgGridBean} from "../../../../../common/widgets/DataGrid/AgGridBean";
import {CrmFormDialog, FormDialogData} from "src/app/common/widgets/CrmFormDialog/CrmFormDialog";
import {ICrmItem} from "../../../../../common/widgets/CrmList/ICrmItem";
import {ICarCompanyGet} from "../../../../models/car-company-get.entity";
import {CarCompanyFind} from "../../../../../_shared/request/crm/CarCompanyFind";
import {CommonUtil} from "../../../../../_service/util/CommonUtil";
import {CrmRefType} from "../../../../../common/enums/crm-ref-type.enum";
import {DateUtil} from "../../../../../_service/util/DateUtil";

@Component({
  selector: 'app-company-list',
  templateUrl: 'CompanyListForm.html',
})
export class CompanyListForm {
  constructor(public dialogRef: MatDialogRef <CompanyListForm>, @Inject(MAT_DIALOG_DATA) public data: CarCompanyFind) {

  }
  @ViewChild('dataGrid', { static: true }) dataGrid!: AgGridBean;


  refTableColumnDefs: ColDef[] = [
    {
      field: 'company.name',
      headerName: 'GENERAL.ORGANIZATION_TITLE',
      resizable: true,
    },
    {
      field: 'company.type_id',
      headerName: 'GENERAL.TYPE',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.COMPANY_TYPE))
    },
    {
      field: 'company.garaj',
      headerName: 'GENERAL.GARAGE',
      resizable: true,
    },
  ];

  selectedChanged(event: any) {
    this.dialogRef.close(event);
  }

  gridReady() {
    this.request = this.data;
    this.request.setCount(20);
    if(this.dataGrid) {
      this.dataGrid.reloadGrid();
    }
  }

  request = new CarCompanyFind();

  items: Array<ICrmItem> = [];


  static show(data: CarCompanyFind) {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(CompanyListForm, {
        data: data,
        width: '80%'
      }
    );
    return dialogRef.afterClosed();
  }

  close(res: any) {
    if(res) {
      this.dialogRef.close(res.obj);
    }
    else {
      this.dialogRef.close(null);
    }
  }


}
