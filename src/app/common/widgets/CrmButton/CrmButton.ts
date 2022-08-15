import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { SessionInfoService } from 'src/app/main/components/services/session-info.service';

@Component({
  selector: 'crm-button',
  templateUrl: './CrmButton.html',
  styleUrls: ['./CrmButton.css']
})
export class CrmButton implements OnInit {

  @Input() type:string ='icon';
  @Input() icon?:string;
  @Input() label?:string;
  @Input() buttonType?:string = 'submit';
  @Input() colorMode?:string = 'primary';
  @Input() style?:string;
  @Input() class?:string;
  @Input() enabled:boolean = true;
  @Input() accessKey:string | null = null;
  @Output() onClick = new EventEmitter();
  hasAccess = false;

  constructor(public sessionInfoSvc: SessionInfoService) {
   }

  ngOnInit() {
    this.hasAccess = this.sessionInfoSvc.hasAccess(this.accessKey);
  }

  btnClicked(){
    if(this.enabled)
    this.onClick.emit();
  }
}
