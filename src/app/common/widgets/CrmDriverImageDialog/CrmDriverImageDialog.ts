import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Component, Inject, Injector, OnInit, ViewChild } from "@angular/core";
import { InjectorInstance } from "../../../app.module";
import { IFileUploadRequest } from "../../../main/models/file-upload.request.entity";
import { IFileUploadData } from "../../../main/models/file-upload-response.entity";
import { CrmAttachmentTypes } from "../../enums/crm-attachement-types.enum";
import {CrmApiUrl} from "../../enums/crm-api-urls.enum";
import { CrmFileUploaderComponent } from "../crm-file-uploader/crm-file-uploader.component";
import {HttpClient} from "@angular/common/http";
import {SessionInfoService} from "../../../main/components/services/session-info.service";

@Component({
  selector: 'crm-driver-image-dialog',
  templateUrl: 'CrmDriverImageDialog.html',
  styleUrls: ['CrmDriverImageDialog.css'],
})
export class CrmDriverImageDialog extends CrmFileUploaderComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CrmDriverImageDialog>, override http: HttpClient, override sessionInfoSvc: SessionInfoService) {
    super(http, sessionInfoSvc);
  }

  public override attachmentUrl = this.data.attachmentUrl;
  override showFileSave: boolean = true;

  override maxSizeInMb = 5;
  static fileUploadRequest: IFileUploadRequest = {
    typeId: CrmAttachmentTypes.EMPLOYEE_PHOTO,
    ownerId: 1,
    name: 'Haydovchi rasmi',
  };
  fileUploadData: Blob | null = null;
  override fileUploadRequest!: IFileUploadRequest;
  override ngOnInit() {
    this.fileUploadRequest = CrmDriverImageDialog.fileUploadRequest;
    this.attachmentUrl = this.data.attachmentUrl;
    super.ngOnInit();
    this.callback.subscribe(() => {
      this.dialogRef.close(true);
    })
  }

  static show(title: string, employeeId: number, attachmentUrl = CrmApiUrl.EMPLOYEE_ATTACHMENT_SAVE, typeId: CrmAttachmentTypes = CrmAttachmentTypes.EMPLOYEE_PHOTO) {
    CrmDriverImageDialog.fileUploadRequest.ownerId = employeeId;
    CrmDriverImageDialog.fileUploadRequest.typeId = typeId;
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(CrmDriverImageDialog, {
      width: '50%',
      height: '80%',
      data: {
        title: title,
        attachmentUrl: attachmentUrl,
      }
    });
    return dialogRef.afterClosed();
  }

  captureImage(data: Blob | null) {
    this.fileUploadData = data;
  }


  b64toBlob(base64Image:string) {
    
    var byteString = atob(base64Image.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
}

  override prepareFormData(file: Blob) {
    const formData = new FormData();
    // console.log(this.b64toBlob(<any>this.fileUploadData),this.fileUploadData)
    formData.append('typeId', this.fileUploadRequest.typeId.toString());
    formData.append('ownerId', this.fileUploadRequest.ownerId.toString());
    formData.append('name', this.fileUploadRequest.name.toString());
    formData.append("file", this.b64toBlob(<any>this.fileUploadData), 'fileName.png');
    formData.append('fileName', 'fileName.png');
    return formData;
  }

  onSave() {
    if(this.fileUploadData) {
      let file: any = this.fileUploadData;
      if (file) { //this.validate(file)) {
        const formData = this.prepareFormData(file);
        this.uploadFile(formData);
      }
    }
  };

  onCancel() {
    this.showFileSave = false;
    this.dialogRef.close(false);
  };

  public getEmployeeId() {
    return CrmDriverImageDialog.fileUploadRequest;
  }
  closeModal(){
    this.dialogRef.close(false);

  }
}



