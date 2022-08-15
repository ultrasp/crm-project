import {ValueGetterParams} from "ag-grid-community/dist/lib/entities/colDef";
import {ColDef, Column, ColumnApi, GridApi, RowNode} from "ag-grid-community";
import {ICellRendererParams} from "ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer";

export class ValueGetterParamsClass implements ValueGetterParams {
  constructor(data: any) {
    this.data = data;
  }
  api!: GridApi;
  colDef!: ColDef;
  column!: Column;
  columnApi!: ColumnApi;
  context: any;
  data!: any;

  getValue(field: string): any {

  }
  node!: RowNode | null;
}


export class ICellRendererParamsClass implements ICellRendererParams {

  constructor(value: any) {
    this.value = value;
  }

  $scope!: any;
  api!: GridApi;
  columnApi!: ColumnApi;
  context: any;
  data: any;
  eGridCell!: HTMLElement;
  eParentOfValue!: HTMLElement;
  node!: RowNode;

  registerRowDragger(rowDraggerElement: HTMLElement, dragStartPixels: number | undefined, value: string | undefined, suppressVisibilityChange: boolean | undefined): void {
  }

  rowIndex!: number;
  value: any;
  valueFormatted: any;



}
