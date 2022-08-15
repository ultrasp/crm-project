import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";
import {
  COFService
} from "src/app/_service/COFService";
import {
  EmployeeAttachmentAdd
} from "src/app/_shared/request/crm/EmployeeAttachmentAdd";
import {
  ObjectOwnerType
} from "../../enums/object-owner-type.enum";
import {
  CrmUploadDialog
} from "../CrmUploadDialog/CrmUploadDialog";

@Component({
  selector: 'crm-image-load-button',
  templateUrl: './CrmImageLoadButton.html',
  styleUrls: ['./CrmImageLoadButton.css'],
})
export class CrmImageLoadButton implements OnInit {

  @Input() ownerId!: string;
  @Input() ownerType: ObjectOwnerType = ObjectOwnerType.EMPLOYEE;

  @Output() imageLoaded: EventEmitter < any > = new EventEmitter();

  constructor(private cof: COFService) {}

  ngOnInit() {}

  attachAddRequest!: EmployeeAttachmentAdd;

  openImageUploadDialog() {
    if (!this.ownerId)
      return;
    CrmUploadDialog.show('Ходим фотографияси', parseInt(this.ownerId)).subscribe(result => {
      if (result && result.data) {
        this.attachAddRequest = (this.ownerType == ObjectOwnerType.EMPLOYEE ? new EmployeeAttachmentAdd() : new EmployeeAttachmentAdd());
        this.attachAddRequest.setOwnerId(this.ownerId);
        this.attachAddRequest.setAttachmentId(result.data.id);
        this.attachAddRequest.setTypeId("2");
        this.cof.doRequest(this.attachAddRequest).subscribe(resultData => {
          this.imageLoaded.emit();
        });
      }
    });
  }



}
