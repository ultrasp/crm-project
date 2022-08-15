import {Component, Inject, Injector, Input, OnInit} from "@angular/core";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {COFService} from "../../../_service/COFService";
import {CommonUtil} from "../../../_service/util/CommonUtil";
import {SessionInfoService} from "../../../main/components/services/session-info.service";
import {ISessionInfo} from "../../../main/models/session-info.entity";

@Component({
  selector: 'crm-image',
  templateUrl: './CrmImage.html',
})
export class CrmImage implements OnInit {

  public setWidth: any;
  public setHeight: any;
  @Input() set width(value: any){
    this.setWidth = typeof value === "number" ? value + 'px' : value;
  };
  @Input() set height(value: any){
    this.setHeight = typeof value === "number" ? value + 'px' : value;
  };
  @Input() default: string = '';
  @Input() src: any = '';
  constructor(private sanitizer: DomSanitizer, private cof: COFService,  private sessionInfoSvc: SessionInfoService) {

  }

  ngOnInit() {
      this.src = this.default;
  }

  getRequest(api: string) {
    return {
      getURI() {
        return api
      }
    }
  }


  getImage(api: string) {
    if(!CommonUtil.isNull(api)) {
      let session: ISessionInfo = this.sessionInfoSvc.getSesionInfo();
      if(session && session.data) {
        this.cof.doGetFileRequest(this.getRequest(api)).subscribe(result => {
          this.createImageFromBlob(result);
        });
      }
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.src = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}



