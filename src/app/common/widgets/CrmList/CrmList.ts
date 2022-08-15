import {
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core"
import { ICrmItem } from "./ICrmItem";

@Component({
  selector: 'crm-list',
  templateUrl: './CrmList.html',
  styleUrls:['./CrmList.css']
})

export class CrmList {
  @Input() data: ICrmItem[] = [];
  @Output() itemSelected = new EventEmitter<ICrmItem>();
  displayedColumns:string[] = ['key','title'];
  columns: string[] = ['',''];
  clickedRow:any;

  onRowClick(row:ICrmItem){
    this.clickedRow = row;
    this.itemSelected.emit(this.clickedRow);
  }
}

