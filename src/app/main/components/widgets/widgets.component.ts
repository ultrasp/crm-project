import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {CrmAlertDialog} from "../../../common/widgets/CrmAlertDialog/CrmAlertDialog";
import {CrmConfirmDialog} from "../../../common/widgets/CrmConfirmDialog/CrmConfirmDialog";
import {CrmAlertDialogTypeError} from "../../../common/enums/crm-alert-dialog.enum";
import { Tab } from "src/app/common/widgets/CrmDynamicTab/TabModel";
import { TabService } from "src/app/common/widgets/CrmDynamicTab/TabService";
import { CrmInput } from "src/app/common/widgets/CrmInput/CrmInput";
import { CrmJuridicalData } from "src/app/common/widgets/CrmJuridicalData/CrmJuridicalData";
import { CrmPersonDataPnfl } from "src/app/common/widgets/CrmPersonDataPnfl/CrmPersonDataPnfl";

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
})
export class WidgetsComponent implements OnInit {
  constructor(public dialog: MatDialog,private tabService: TabService) {
  }

  jsonData =
    {
      "tin": "478568997",
      "ns10Code": 26,
      "ns10Name": "TOSHKENT SHAHAR",
      "ns10NameUz": "TOSHKENT SHAHAR",
      "ns10NameRu": "г.ТАШКЕНТ",
    }

  crmAlertDialogOpen() {
    CrmAlertDialog.show('Xatolik chiqdi', CrmAlertDialogTypeError.INFO);
  }
  crmConfirmDialogOpen() {
    CrmConfirmDialog.show('Xatolik chiqdi').subscribe((result) => {
    });
  }

  crmPersonDataDialogOpen() {
    CrmPersonDataPnfl.openDialog('test', 'test').subscribe((result) => {
    });
  }

  customButtons = [
    {
      key: 'add',
      title: 'FORM.ADD',
      icon: 'add'
    }
  ];


  tabs = new Array < Tab > ();
  selectedTab!: number;

  ngOnInit(): void {

    this.tabService.$tabSub.subscribe(tabs => {
      this.tabs = tabs;
      this.selectedTab = tabs.findIndex(tab => tab.active);
    });
  }
 

  tabChanged(event: any) {
  }

  openForm(){
    CrmJuridicalData.openDialog().subscribe(result => {
    });
  }

}
