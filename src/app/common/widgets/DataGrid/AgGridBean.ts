import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {
  AgGridAngular
} from "ag-grid-angular";
import {
  ColDef, Column, ColumnApi,
  GridApi,
  GridOptions,
  HeaderValueGetterParams,
  IDatasource,
  IGetRowsParams,
  RowClassRules, RowNode
} from "ag-grid-community";
import {COFService} from "src/app/_service/COFService";
import {AbstractSearch, ISortItem} from "src/app/_shared/abstract/AbstractSearch";
import {AcGridButtonRenderer} from "./renderer/button-renderer.component";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {CrmConfigService} from "src/app/_service/crm-config.service";
import {ICellRendererFunc} from "ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer";
import {ICellRendererParamsClass, ValueGetterParamsClass} from "./HelperExportClassess";


@Component({
  selector: 'crm-ag-gridbean',
  templateUrl: './AgGridBean.html',
  styleUrls: ['./AgGridBean.css']
})

export class AgGridBean implements AfterContentInit {

  @ViewChild('agGrid', {static: true}) agGrid!: AgGridAngular;

  @Input() columnDefs!: ColDef[];
  @Input() sideToside?: boolean = false;
  @Input() data!: any[];
  @Input() pageSize: number = 5;
  @Input() pageIndex: number = 0;
  @Input() showAddButton: boolean = false;
  @Input() request!: AbstractSearch;
  @Input() rowClassRules!: RowClassRules;

  @Output() onSelectionChanged: EventEmitter<{}> = new EventEmitter();
  @Output() gridReady: EventEmitter<{}> = new EventEmitter();
  @Output() addButtonClick: EventEmitter<{}> = new EventEmitter();

  gridOptions: GridOptions = {
    pagination: true,
    rowModelType: 'infinite',
    cacheBlockSize: 5,
    paginationPageSize: 5,
    rowClassRules: {}
  };

  @Input() exportLimit: number = 2000;

  export() {
    this.request.setCount(this.exportLimit);
    this.cof.doRequest(this.request).subscribe((response: any) => {
      let csvArray = response.data.map((row: any) => {
          return this.columnDefs.map((field: ColDef) => {
            if(field.valueGetter && typeof field.valueGetter == "function") {
              let objectValueGetter = new ValueGetterParamsClass(row);
              return field.valueGetter(objectValueGetter);
            }
            if(field.cellRenderer && typeof field.cellRenderer == "function" && (field.cellRenderer as ICellRendererFunc)) {
              let iCellRendererParamsClass = new ICellRendererParamsClass(row[<string>field.field]);
              return (field.cellRenderer as ICellRendererFunc)(iCellRendererParamsClass);
            }
            if(row[<string>field.field]) {
              return row[<string>field.field];
            }
          }).join(';')
        }
      );
      let headers: string[] = [];
      this.columnDefs.map((field: ColDef) => {
        let header = this.translate.instant(field.headerName!)
        if(field.cellRenderer && typeof field.cellRenderer == "string") {
          return ;
        }
        headers.push(header);
      });
      csvArray.unshift(headers.join(';'))
      const blob = new Blob(["\uFEFF" + csvArray.join('\r\n')], {type: 'text/csv; charset=UTF-8'});
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = url;
      link.download = "file.csv";
      link.click();
      link.remove();
    });
  }

  dataLoaded: boolean = false;
  defaultColDef: any = {
    headerClass: function (params: any) {
      return 'ac_grid_header';
    },
    cellRendererParams: {
      checkbox: true,
    },
  }

  rowStyle = {
    background: 'white',
    color: '#717070',
    borderRadius: "10px",
    textAlign: "center",
    "max-height": "60px",
    'border-bottom': 'var(--background-color-gray) 5px solid',
    'border-top': 'var(--background-color-gray) 5px solid'
  }
  rowSelection = 'single';


  frameworkComponents: any;

  dataSource!: IDatasource;

  constructor(private cof: COFService, private translate: TranslateService, private elementRef: ElementRef, private crmConfig: CrmConfigService) {
    this.frameworkComponents = {
      buttonRenderer: AcGridButtonRenderer,
    }
    this.translate.onLangChange.subscribe(() => {
      this.gridApi.refreshHeader();
    });

  }

  ngAfterContentInit(): void {

    this.columnDefs.forEach(column => {
      column.headerValueGetter = (params: HeaderValueGetterParams) => this.translate.instant(params.colDef.headerName!);
    });
    this.pageSize = this.crmConfig.getConfig().PageSize;
    this.gridOptions.cacheBlockSize = this.pageSize;
    this.gridOptions.paginationPageSize = this.pageSize;
    this.gridOptions.rowClassRules = this.rowClassRules;
  }

  setCellRenderer(renderer: any) {
    this.defaultColDef['cellRenderer'] = renderer;
  }

  isFullWidthCell(rowNode: any) {
    return rowNode.level === 1;
  };

  gridApi!: GridApi;

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridOptions.cacheBlockSize = this.pageSize;
    this.gridOptions.paginationPageSize = this.pageSize;
    if (!this.sideToside) {
      this.gridApi.sizeColumnsToFit();
    }
    this.gridOptions.rowClassRules = this.rowClassRules;
    this.gridReady.emit(true);
  }

  public reloadGrid() {
    this.dataSource = {
      getRows: (params: IGetRowsParams) => {
        if (!this.request) {
          params.successCallback([], 0);
          return;
        }
        this.request.setPage(params.startRow / this.pageSize);
        this.request.setCount(this.pageSize);
        this.request.setSorts(this.formatSortArray(params.sortModel));

        this.cof.doRequest(this.request).subscribe((response: any) => {
          params.successCallback(response.data, response.total_elements);
          this.setSelectedFirstRowByDefault(params.startRow);
          this.dataLoaded = true;
        });
      }
    }
    if (this.gridApi) {
      this.gridApi.setDatasource(this.dataSource);
      if (!this.sideToside) {
        this.gridApi.sizeColumnsToFit();
      }
    }
  }

  formatSortArray(items: IAcGridSort[]): ISortItem[] {
    return items.map(item => ({
      direction: item.sort.toUpperCase(),
      field: item.colId
    }));
  }

  onSelectionChangedEvent(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();
    this.onSelectionChanged.emit(selectedRows.length === 1 ? selectedRows[0] : null);
  }

  private setSelectedFirstRowByDefault(startRow: number) {
    let idSequence = 0;
    this.gridApi.forEachNode(function (rowNode, index) {
      rowNode.id = '' + idSequence++;
    });
    if (!this.sideToside) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  onPaginationChanged(event: any) {
    this.reloadGrid();
  }

}

export interface IAcGridSort {
  colId: string;
  sort: string;
}
