import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {ITableViewData} from "../../../main/models/table-view-data.entity";


@Component({
  selector: 'crm-table-view',
  templateUrl: './CrmTableView.html',
  styleUrls: ['CrmTableView.css'],
})
export class CrmTableView {

  @Input() options: ITableViewData[] = [];
  @Input() title: string = '';


}



