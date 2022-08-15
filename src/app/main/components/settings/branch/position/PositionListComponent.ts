import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {ColDef} from "ag-grid-community";
import {TranslateService} from "@ngx-translate/core";
import {BranchPositionList} from "../../../../../_shared/request/crm/BranchPositionList";
import {AgGridBean} from "../../../../../common/widgets/DataGrid/AgGridBean";
import {CrmCheckbox} from "../../../../../common/widgets/CrmCheckbox/CrmCheckbox";
import {CrmFormDialog} from "../../../../../common/widgets/CrmFormDialog/CrmFormDialog";
import {BranchPositionForm} from "../PositionForm/BranchPositionForm";
import {StringUtil} from "../../../../../_service/util/StringUtil";
import {CommonUtil} from "../../../../../_service/util/CommonUtil";
import {CrmRefType} from "../../../../../common/enums/crm-ref-type.enum";

@Component({
  selector: 'app-branch-position-list',
  templateUrl: 'PositionListComponent.html',
  styleUrls: ['PositionListComponent.css']
})
export class PositionListComponent implements OnInit {

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
  }

  private _branchId!: string;

  @Input() get branchId() {
    return this._branchId;
  }

  set branchId(v: string) {
    this._branchId = v;
    this.refresh();
  }


  @ViewChild(AgGridBean, {static: true}) grid!: AgGridBean;
  @ViewChild(CrmCheckbox, {static: true}) closedPosition!: CrmCheckbox;
  request = new BranchPositionList();

  openForm(id: string = '') {
    if(this._branchId != undefined) {
      CrmFormDialog.show('', BranchPositionForm, {
        ownerId: id ? id : null,
        id: this._branchId,
      }).subscribe(result => {
        this.refresh();
      })
    }
  }

  onRowEdit = (params: any) => {
    let row: any = params.rowData;
    let id = row == null ? '' : <string>StringUtil.toStr(row.id,'');
    this.openForm(id)
  }

  refTableColumnDefs: ColDef[] = [
    {
      field: 'position_id',
      headerName: 'GENERAL.POSITION',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.POSITION))
    },
    {
      field: 'quantity',
      headerName: 'SETTINGS.COUNT_OF_JOBS',
      resizable: true,
    },
    {
      field: 'quantity',
      headerName: 'SETTINGS.COUNT_OF_VACANT_JOBS',
      resizable: true,
    },
    {
      field: 'start_date',
      headerName: 'SETTINGS.CREATED_DATE',
      resizable: true,
    },
    {
      field: 'end_date',
      headerName: 'SETTINGS.CLOSING_DATE',
      resizable: true,
    },
    {
      field: 'edit',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onRowEdit,
        icon: 'edit',
        colorMode: 'primary'
      },
      headerName: 'FORM.CHANGE'
    },
  ];

  refresh() {
    this.request.setBranchId(this._branchId);
    this.request.setCount(50000);
    this.grid.reloadGrid();
  }
}
