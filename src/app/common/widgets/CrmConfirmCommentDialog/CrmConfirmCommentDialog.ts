import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import {Component, Inject} from "@angular/core";
import {InjectorInstance} from "../../../app.module";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'crm-confirm-comment-dialog',
  templateUrl: './CrmConfirmCommentDialog.html',
})
export class CrmConfirmCommentDialog{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CrmConfirmCommentDialog>) {

  }

  public form: FormGroup = new FormGroup({
    comment: new FormControl(null, []),
  })

  static show(message: string) {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(CrmConfirmCommentDialog, {
      data: {
        title: message,
      }
    });
    dialogRef.disableClose = true;
    return dialogRef.afterClosed();
  }


  onConfirm() {
    this.dialogRef.close({comment:this.form.get('comment')?.value});
  };
  onCancel() {
    this.dialogRef.close(false);
  };

}



