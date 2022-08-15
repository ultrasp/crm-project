import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  InjectorInstance
} from 'src/app/app.module';
import { FormDialogData } from 'src/app/common/widgets/CrmFormDialog/CrmFormDialog';
import { EmployeeAddComponent } from './employee-add.component';

@Component({
  selector: 'app-CrmEmpAddDialog',
  template: `<h2 mat-dialog-title>{{ data.title | translate }} </h2>
  <div class="mat-typography">
    <app-employee-add [employee_id]="data.employeeId" (dataSaved)="closeDialog(true)"></app-employee-add>
  </div>
  `,
})
export class CrmEmpAddDialog implements OnInit, OnDestroy {

  @ViewChild(EmployeeAddComponent, {static: true}) addPanel!: EmployeeAddComponent;

  constructor(@Inject(MAT_DIALOG_DATA) public data: EmpDialogData, public dialogRef: MatDialogRef < CrmEmpAddDialog > , ) {

  }

  ngOnInit() {
  }

  closeDialog(isSaved:boolean= false ){
    this.dialogRef.close(isSaved)
  }

  public static show(employeeId:string):Observable<boolean> {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(CrmEmpAddDialog, {
      data: {
        employeeId: employeeId,
      },
      width: '90%',
      height: '90%',
    });

    return dialogRef.afterClosed();

  }

  save() {
  }

  close(isNeedRefresh : boolean = false) {
    this.dialogRef.close(isNeedRefresh);
  }

  ngOnDestroy() {
  }

}

interface EmpDialogData {
  title: string,
  employeeId: string,
}
