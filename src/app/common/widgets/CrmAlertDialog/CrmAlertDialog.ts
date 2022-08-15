import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import {Component, Inject} from "@angular/core";
import {InjectorInstance} from "../../../app.module";
import {CrmAlertDialogTypeError} from "../../enums/crm-alert-dialog.enum";

@Component({
  selector: 'crm-alert-dialog',
  templateUrl: './CrmAlertDialog.html',
})
export class CrmAlertDialog{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  static show(message: string, type: CrmAlertDialogTypeError) {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(CrmAlertDialog, {
      data: {
        message: message,
        type: type,
      }
    });

    return dialogRef.afterClosed();
  }
}



