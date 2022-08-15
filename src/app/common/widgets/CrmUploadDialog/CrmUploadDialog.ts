import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Component, Inject, Injector, OnInit, ViewChild } from "@angular/core";
import { InjectorInstance } from "../../../app.module";
import { IFileUploadRequest } from "../../../main/models/file-upload.request.entity";
import { IFileUploadData } from "../../../main/models/file-upload-response.entity";
import { CrmAttachmentTypes } from "../../enums/crm-attachement-types.enum";
import {CrmApiUrl} from "../../enums/crm-api-urls.enum";
import { CrmFileUploaderComponent } from "../crm-file-uploader/crm-file-uploader.component";

@Component({
  selector: 'crm-upload-dialog',
  templateUrl: './CrmUploadDialog.html',
  styleUrls: ['./CrmUploadDialog.css'],
})
export class CrmUploadDialog implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CrmUploadDialog>) {

  }

  public attachmentUrl = this.data.attachmentUrl;
  showFileSave: boolean = false;

  static fileUploadRequest: IFileUploadRequest = {
    typeId: CrmAttachmentTypes.EMPLOYEE_PHOTO,
    ownerId: 1,
    name: 'Haydovchi rasmi',
  };
  fileUploadData!: IFileUploadData;
  @ViewChild(CrmFileUploaderComponent) childFileUpload!: CrmFileUploaderComponent;
  ngOnInit() { }

  static show(title: string, employeeId: number, attachmentUrl = CrmApiUrl.EMPLOYEE_ATTACHMENT_SAVE, typeId: CrmAttachmentTypes = CrmAttachmentTypes.EMPLOYEE_PHOTO) {
    CrmUploadDialog.fileUploadRequest.ownerId = employeeId;
    CrmUploadDialog.fileUploadRequest.typeId = typeId;
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(CrmUploadDialog, {
      width: '20%',
      height: '30%',
      data: {
        title: title,
        attachmentUrl: attachmentUrl,
      }
    });
    dialogRef.disableClose = true;
    return dialogRef.afterClosed();
  }

  save(event: IFileUploadData) {
    this.showFileSave = true;
    this.fileUploadData = event;
  }

  onConfirm() {
    this.dialogRef.close(this.fileUploadData);
  };
  
  onCancel() {
    this.showFileSave = false;
    this.childFileUpload.removeElement();
  };

  public getEmployeeId() {
    return CrmUploadDialog.fileUploadRequest;
  }
  closeModal(){
    this.dialogRef.close(false);

  }
}



