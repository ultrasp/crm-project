import {Component, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {COFService} from "../../../../../_service/COFService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BaseForm} from "../../../../../common/base.form/base-form";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {InjectorInstance} from "../../../../../app.module";
import {Audit} from "../../../../../_shared/request/crm/Audit";
import {ColDef} from "ag-grid-community";
import {AgGridBean} from "../../../../../common/widgets/DataGrid/AgGridBean";
import {CrmFormDialog, FormDialogData} from "src/app/common/widgets/CrmFormDialog/CrmFormDialog";

@Component({
  selector: 'app-driver-audit-list',
  templateUrl: 'AuditListForm.html',
})
export class AuditListForm  implements OnInit{
  constructor(public dialogRef: MatDialogRef <AuditListForm>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  @Input() id!: string;

  request = new Audit();

  form: FormGroup = new FormGroup({
    start_date: new FormControl(null, [Validators.required]),
    end_date: new FormControl(null, [Validators.required]),
  })

  @ViewChild(AgGridBean, { static: true }) dataGrid!: AgGridBean;

  refTableColumnDefs: ColDef[] = [
    {
      field: 'date',
      headerName: 'GENERAL.DATE',
      resizable: true,
    },
    {
      field: 'old_data',
      headerName: 'GENERAL.OLD_DATA',
      resizable: true,
    },
    {
      field: 'new_data',
      headerName: 'GENERAL.NEW_DATA',
      resizable: true,
    },
  ];

  static show(id: string) {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(AuditListForm, {
      data: {
        id: id,
      }
    });
  }
  ngOnInit(): void {
    this.id = this.data.id;
  }

  getList() {
    this.form.markAllAsTouched();
    if(this.form?.valid) {
      this.request.object_id = this.id;
      this.request.from_date = this.form.get('start_date')?.value
      this.request.to_date = this.form.get('end_date')?.value
      this.dataGrid.reloadGrid();
    }
  }
  close(isNeedRefresh : boolean = false) {
    this.dialogRef.close(isNeedRefresh);
  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl!.status == 'INVALID' && formControl!.touched;
  }

}
