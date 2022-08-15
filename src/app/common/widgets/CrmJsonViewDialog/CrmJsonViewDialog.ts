import {Component, Inject, Input, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {InjectorInstance} from "../../../app.module";
import {TranslateService} from "@ngx-translate/core";
import {CommonUtil} from "../../../_service/util/CommonUtil";
import {CrmRefType} from "../../enums/crm-ref-type.enum";


@Component({
  selector: 'crm-json-view-dialog',
  templateUrl: 'CrmJsonViewDialog.html',
  styleUrls: ['CrmJsonViewDialog.css'],
})
export class CrmJsonViewDialog implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: any, private translate: TranslateService, private dialogRef: MatDialogRef<any>) {
  }

  ngOnInit(): void {
  }

  static show(data: any, title: string = '') {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(CrmJsonViewDialog, {
      data: {
        title: title,
        data: data,
      },
      width: '70%',
      maxHeight: '70%',
    });
    return dialogRef.afterClosed();
  }

  close() {
    this.dialogRef.close()
  }
}
