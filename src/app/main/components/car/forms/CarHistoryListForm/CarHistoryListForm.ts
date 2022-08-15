import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {InjectorInstance} from "../../../../../app.module";
import {ColDef} from "ag-grid-community";
import {AgGridBean} from "../../../../../common/widgets/DataGrid/AgGridBean";
import {ICrmItem} from "../../../../../common/widgets/CrmList/ICrmItem";
import {CarOwnerHistory} from "../../car-detail/CarPanelConfig";
import {TranslateService} from "@ngx-translate/core";
import {CarHistoryRequest} from "../../../../../_shared/request/crm/CarHistoryRequest";
import { CarPrintDialog } from "../../car-detail/CarPrintDialog/CarPrintDialog";

@Component({
  selector: 'app-car-history-list',
  templateUrl: 'CarHistoryListForm.html',
})
export class CarHistoryListForm implements OnInit {
  constructor(public dialogRef: MatDialogRef <CarHistoryListForm>, @Inject(MAT_DIALOG_DATA) public data: any, private translate: TranslateService) {

  }
  @ViewChild('dataGrid', { static: true }) dataGrid!: AgGridBean;

  refTableColumnDefs: ColDef[] = [];
  

  request = new CarHistoryRequest();

  items: Array<ICrmItem> = [];

  static show(data: string) {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(CarHistoryListForm, {
        data: data,
        width: '80%'
      }
    );
    return dialogRef.afterClosed();
  }

  gridReady() {
    this.request.setCount(20);
    if(this.dataGrid) {
      this.dataGrid.reloadGrid();
    }
  }

  close() {
      this.dialogRef.close(null);
  }

  ngOnInit(): void {
    this.refTableColumnDefs = new CarOwnerHistory(this.translate).getColumnds(this.onHistoryShow);
    this.request.setOwnerId(this.data);
  }

  onHistoryShow = (params: any) => {
    let row: any = params.rowData;
    CarPrintDialog.show(row.id,1).subscribe()
  }

}
