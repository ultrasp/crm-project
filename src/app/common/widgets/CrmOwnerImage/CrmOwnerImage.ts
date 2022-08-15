import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { COFService } from "../../../_service/COFService";
import { SessionInfoService } from "../../../main/components/services/session-info.service";
import { CrmImage } from "../CrmImage/CrmImage";
import { SystemConfig } from "../../enums/system-config.enum";
import { DriverAttachmentList } from "src/app/_shared/request/crm/DriverAttachmentList";
import { CrmApiUrl } from "../../enums/crm-api-urls.enum";
import { IEmployeeAttachment, IEmployeeAttachmentCollection } from "src/app/main/models/employee-attachment.entity";
import { ObjectOwnerType } from "../../enums/object-owner-type.enum";
import { EmployeeAttachmentList } from "src/app/_shared/request/crm/EmployeeAttachmentLIst";
import { CrmImageDialog } from "../CrmImageDialog/CrmImageDialog";

@Component({
  selector: 'crm-owner-image',
  template: `<crm-image [src]="defaultSrc" [width]="width" [height]="height" (click)="openImage()" #crmImg></crm-image>`,
})
export class CrmOwnerImage implements OnInit {

  @Input() width: any;
  @Input() height: any;
  @Input() defaultSrc: string = '';

  @Input() ownerType!: string;
  @Input() ownerId!: string;
  @Input() imgType!: string;
  @Input() autoLoad:boolean = true;

  avatarSrc!: string;

  @ViewChild(CrmImage, { static: true }) crmImg!: CrmImage;

  constructor(private cof: COFService) { }

  ngOnInit() {
    if(this.autoLoad)
    this.getAttach()
  }

  getAttach() {
    if(!this.ownerType)
      return;
    let request = (this.ownerType === ObjectOwnerType.DRIVER) ? new DriverAttachmentList() : new EmployeeAttachmentList();
    let apiUrl = (this.ownerType === ObjectOwnerType.DRIVER) ? CrmApiUrl.ATTACHMENT_DRIVER_IMAGE : CrmApiUrl.EMPLOYEE_ATTACHMENT_IMAGE;

    request.setOwnerId(this.ownerId);
    request.setCount(100);
    request.setTypeId(this.imgType);

    this.cof.doRequest(request).subscribe(result => {
      let data = <IEmployeeAttachmentCollection>result;
      if (data && data.total_elements > 0) {
        let maxId = 0 ;
        data.data.forEach(v => {
          if(v.id > maxId)
          maxId = v.id;
        });
        let latesImage:IEmployeeAttachment = <IEmployeeAttachment> data.data.find( v => v.id = maxId);
        if(latesImage){
          let avatar: string = SystemConfig.CRM_FILE_PREFIX +
          `${apiUrl}/` + latesImage.id;

          this.avatarSrc = avatar;
          this.crmImg.getImage(avatar);

        }
      }
    })
  }

  refresh() {
    this.getAttach();
  }

  openImage() {
    CrmImageDialog.show(this.avatarSrc)
  }
}



