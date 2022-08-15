import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CrmFormDialog} from "../CrmFormDialog/CrmFormDialog";

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './DropDownMenu.html',
  styleUrls: ['./DropDownMenu.css'],
})
export class DropDownMenu {

  @Input() items!: any[];
  @Input() title!: string;
  @Input() class?: string;
  @Input() icon?: string;

  @Output() selectEvent = new EventEmitter();


}

