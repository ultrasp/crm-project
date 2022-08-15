import { HttpClient, HttpEventType, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Subscription } from 'rxjs/internal/Subscription';
import { IFileUploadData } from 'src/app/main/models/file-upload-response.entity';
import { IFileUploadRequest } from 'src/app/main/models/file-upload.request.entity';
import { SystemConfig } from '../../enums/system-config.enum';
import { SessionInfoService } from "../../../main/components/services/session-info.service";
import { ISessionInfo } from "../../../main/models/session-info.entity";
import { ApiUrl } from 'src/app/_service/util/ApiUrl';

@Component({
  selector: 'crm-file-uploader',
  templateUrl: './crm-file-uploader.component.html',
  styleUrls: ['./crm-file-uploader.component.css']
})
export class CrmFileUploaderComponent implements OnInit {

  @Input() requiredFileType!: string;
  @Input() fileUploadRequest!: IFileUploadRequest;
  @Input() maxSizeInMb!: number;
  @Input() attachmentUrl: string = "attachment";
  @Input() showFileSave: boolean = true;

  @Output() callback: EventEmitter<IFileUploadData> = new EventEmitter();

  fileName = '';
  uploadProgress!: number;
  subscription$!: Subscription;
  uploadUrl: string = `${ApiUrl.API_URL()}/${SystemConfig.CRM_FILE_PREFIX}${this.attachmentUrl}`;
  errorMessage: string = '';
  isEnabledUpload: boolean = true;

  @ViewChild('fileUpload') fileInput!: ElementRef;


  constructor(protected http: HttpClient, protected sessionInfoSvc: SessionInfoService) {
  }

  ngOnInit(): void {
    this.uploadUrl = `${ApiUrl.API_URL()}/${SystemConfig.CRM_FILE_PREFIX}${this.attachmentUrl}`;
  }


  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (this.validate(file)) {

      const formData = this.prepareFormData(file);

      this.uploadFile(formData);

    }

  }

  validate(file: File) {

    if (file) {
      this.fileName = file.name;
      const fileSizeInMb: number = file.size / 1024 / 1024; // MiB
      const isFileSizeValid = fileSizeInMb <= this.maxSizeInMb;
      this.errorMessage = (isFileSizeValid) ? '' : `Max size is ${this.maxSizeInMb} MB. Your file size is ${Math.trunc(fileSizeInMb)} MB`;
      return isFileSizeValid;
    } else {
      this.errorMessage = `Please choose a file.`;
      return false;
    }

  }

  prepareFormData(file: File) {
    const formData = new FormData();

    formData.append('typeId', this.fileUploadRequest.typeId.toString());
    formData.append('ownerId', this.fileUploadRequest.ownerId.toString());
    formData.append('name', this.fileUploadRequest.name.toString());
    formData.append('fileName', file.name);
    formData.append("file", file);

    return formData;
  }

  uploadFile(formData: FormData) {
    let session: ISessionInfo = this.sessionInfoSvc.getSesionInfo();
    if (session && session.data) {
      this.isEnabledUpload = false;
      const upload$ = this.http.post<IFileUploadData>(this.uploadUrl, formData, {
        reportProgress: true,
        observe: 'events',
        headers: new HttpHeaders().set('Authorization', `Bearer ${session.data.access_token}`),
      }).pipe(finalize(() => this.reset()));

      this.subscription$ = upload$.subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / (event.total || 1)));
        } else if (event.type == HttpEventType.Response
          && event.status == HttpStatusCode.Ok) {
          this.callback.emit(event.body ? event.body : undefined);
          this.isEnabledUpload = true;
        }
      });
    }


  }

  cancelUpload() {
    this.subscription$.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.isEnabledUpload = true;
  }

  removeElement() {
    this.fileInput.nativeElement.value = null;
  }
}
