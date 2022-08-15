import { Component, Inject, Input, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { InjectorInstance } from "src/app/app.module";
import { Observable } from "rxjs";
import { CrmImage } from "../CrmImage/CrmImage";

@Component({
  selector: 'crm-image-dialog',
  templateUrl: './CrmImageDialog.html',
  styleUrls: ['./CrmImageDialog.css'],
})

export class CrmImageDialog implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ImageDialogData, public dialogRef: MatDialogRef<CrmImageDialog>) { }

  ngOnInit() {
    this.crmImg.getImage(this.data.src);
  }

  @ViewChild(CrmImage, { static: true }) crmImg!: CrmImage;

  public static show(src: string = ''): Observable<boolean> {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(CrmImageDialog, {
      data: { src },
      panelClass: 'crm-image-dialog' 
    });

    return dialogRef.afterClosed();
  }

  close(isNeedRefresh: boolean = false) {
    this.dialogRef.close(isNeedRefresh);
  }
}

export interface ImageDialogData {
  src: string;
}
