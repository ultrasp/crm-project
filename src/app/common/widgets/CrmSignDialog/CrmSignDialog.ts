import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Component, Inject, Injector, OnInit, ViewChild } from "@angular/core";
import { InjectorInstance } from "../../../app.module";
import { IFileUploadRequest } from "../../../main/models/file-upload.request.entity";
import { IFileUploadData } from "../../../main/models/file-upload-response.entity";
import { CrmAttachmentTypes } from "../../enums/crm-attachement-types.enum";
import {CrmApiUrl} from "../../enums/crm-api-urls.enum";
import { CrmSigPlusForm } from "../CrmSigPlusForm/CrmSigPlusForm";
import { ObjectOwnerType } from "../../enums/object-owner-type.enum";
import { HttpClient, HttpEventType, HttpHeaders, HttpStatusCode } from "@angular/common/http";
import { SessionInfoService } from "src/app/main/components/services/session-info.service";
import { ISessionInfo } from "src/app/main/models/session-info.entity";
import { finalize, Subscription } from "rxjs";
import { SystemConfig } from "../../enums/system-config.enum";
import { ApiUrl } from "src/app/_service/util/ApiUrl";

@Component({
  selector: 'crm-sign-dialog',
  templateUrl: './CrmSignDialog.html',
  styleUrls: ['./CrmSignDialog.css'],
})
export class CrmSignDialog implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: SignDialogData, private dialogRef: MatDialogRef<CrmSignDialog>,private http: HttpClient,private sessionInfoSvc: SessionInfoService) {

  }

  private attachmentUrl = CrmAttachmentTypes.DRIVER_SIGNATURE;
  showButtons: boolean = true;
  isEnabledUpload: boolean = true;

  static fileUploadRequest: IFileUploadRequest = {
    typeId: CrmAttachmentTypes.EMPLOYEE_PHOTO,
    ownerId: 1,
    name: 'Haydovchi rasmi',
  };

  @ViewChild(CrmSigPlusForm) signForm!: CrmSigPlusForm;
  subscription$!: Subscription;
  uploadProgress!: number;

  ngOnInit() { }

  static show(title: string, ownerId: string, ownerType: ObjectOwnerType = ObjectOwnerType.DRIVER) {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(CrmSignDialog, {
      data: {
        title: title,
        ownerId: ownerId,
        ownerType:ownerType
      }
    });
    dialogRef.disableClose = true;
    return dialogRef.afterClosed();
  }

   base64ToBlob(base64:string, mime:string) 
  {
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
  }

  setSignImage(data:string){
    let item = this.base64ToBlob(data,'image/png');
    let formData = this.prepareFormData(new File([item], 'sign.png', { type: 'image/png' }));
    this.uploadFile(formData);
  }

  prepareFormData(dataFile:any) {
    const formData = new FormData();
    formData.append('typeId', CrmAttachmentTypes.DRIVER_SIGNATURE.toString());
    formData.append('ownerId', this.data.ownerId);
    formData.append('name', 'sign.png');
    formData.append('fileName', 'sign.png');
    formData.append("file", dataFile);

    return formData;
  }

  uploadFile(formData: FormData) {
    let uploadUrl = `${ApiUrl.API_URL()}/${SystemConfig.CRM_FILE_PREFIX}${CrmApiUrl.ATTACHMENT_DRIVER_SAVE}`;
    let session: ISessionInfo = this.sessionInfoSvc.getSesionInfo();
    if (session && session.data) {
      this.isEnabledUpload = false;
      const upload$ = this.http.post<IFileUploadData>(uploadUrl, formData, {
        reportProgress: true,
        observe: 'events',
        headers: new HttpHeaders().set('Authorization', `Bearer ${session.data.access_token}`),
      }).pipe(finalize(() => this.reset()));

      
      this.subscription$ = upload$.subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / (event.total || 1)));
        } else if (event.type == HttpEventType.Response
          && event.status == HttpStatusCode.Ok) {
          this.isEnabledUpload = true;
          this.dialogRef.close(true);
        }
      });
    }


  }

  reset(){

  }
  onConfirm() {
    this.signForm.onDone();
  };
  
  onCancel() {
    this.closeModal();
  };

  closeModal(){
    this.dialogRef.close(false);

  }

  onClear(){
    this.signForm.onClear();
  }
}

export interface SignDialogData{
  title: string,
  ownerId: string,
  ownerType:string
}

