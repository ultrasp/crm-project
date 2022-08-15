import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import {Component, Inject, Injector} from "@angular/core";
import {InjectorInstance} from "../../../app.module";

@Component({
  selector: 'crm-confirm-dialog',
  templateUrl: './CrmConfirmDialog.html',
})
export class CrmConfirmDialog{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CrmConfirmDialog>) {

  }

  static show(message: string) {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(CrmConfirmDialog, {
      data: {
        message: message,
      }
    });
    dialogRef.disableClose = true;
    return dialogRef.afterClosed();
  }


  onConfirm() {
    this.dialogRef.close(true);
  };
  onCancel() {
    this.dialogRef.close(false);
  };

}



