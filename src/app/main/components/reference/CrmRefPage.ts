import {
  Component,
  OnInit,
  ViewChild
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  ColDef
} from "ag-grid-community";
import {
  firstValueFrom,
  map, tap
} from "rxjs";
import {
  ICrmItem
} from "src/app/common/widgets/CrmList/ICrmItem";
import { AgGridBean } from "src/app/common/widgets/DataGrid/AgGridBean";
import {
  COFService
} from "src/app/_service/COFService";
import { AbstractCrmSearchRequest } from "src/app/_shared/abstract/AbstractCrmSearchRequest";
import {
  Reference
} from "src/app/_shared/request/crm/Reference";
import { RefTree } from "src/app/_shared/request/crm/RefTree";
import {
  RefType
} from "src/app/_shared/request/crm/RefType";
import {
  IRefType,
  IRefTypeCollection
} from "../../models/ref-type.entity";
import { IReference, IReferenceCollection } from "../../models/reference.entity";
import { BreadcrumbModel, BreadCrumbService } from "../breadcrumb/BreadCrumbService";
import { RefenceFormDialog, RefTreeTypeCategory } from "./refFormDialog/refFormDialog";
import {CrmConfirmDialog} from "../../../common/widgets/CrmConfirmDialog/CrmConfirmDialog";
import {ReferenceDelete} from "../../../_shared/request/crm/ReferenceDelete";
import {RefTreeDelete} from "../../../_shared/request/crm/RefTreeDelete";
import {DeleteResponseDataStringEntity} from "../../models/delete-response-data-string.entity";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'crm-ref-page',
  templateUrl: './CrmRefPage.html',
  styleUrls: ['./CrmRefPage.css']
})
export class CrmRefPage implements OnInit {

  constructor(private cof: COFService, private dialog: MatDialog, private translate: TranslateService, private breadcrumbs: BreadCrumbService) {
    this.breadcrumbs.setItems([
      new BreadcrumbModel(this.translate.instant('MENU.REFERENCES')),
    ]);

  }

  reftypeList!: IRefTypeCollection;

  reftypeData: Array<ICrmItem> = [];
  filteredReftypeData: Array<ICrmItem> = [];

  refTcolumnDefs: ColDef[] = [];
  refTablecolumnDefs: ColDef[] = [{
    field: 'key',
    headerName: 'GENERAL.ID',
    resizable: true,
  },
    {
      field: 'name',
      headerName: 'GENERAL.TITLE',
      resizable: true,
    },
  ];

  refTableNotReadOnlyDefs: ColDef[] = [
    {
      field: 'edit',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onBtnClick1.bind(this),
        icon: 'edit',
        colorMode: 'primary'
      },
      headerName: 'FORM.CHANGE'
    },
    {
      field: 'delete',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onDeleteBtnClick.bind(this),
        icon: 'delete',
        colorMode: 'warn'
      },
      headerName: 'FORM.DELETE'
    },
  ];

  refTreeTablecolumnDefs: ColDef[] = [
    {
      field: 'key',
      headerName: 'GENERAL.ID',
      resizable: true,
    },
    {
      field: 'parent_key',
      headerName: 'GENERAL.PARENT_KEY',
      resizable: true,
    },
    {
      field: 'name',
      headerName: 'GENERAL.TITLE',
      resizable: true,
    },
  ];


  referenceData: IReference[] = [];
  selectedRefType?: ICrmItem;

  getRequest!: Reference | RefTree;
  pageSize = 5;
  @ViewChild(AgGridBean, {static: false}) dataGrid!: AgGridBean;
  completeControlCount = 0;
  ngOnInit() {
    this.getRefTypeList();
    this.searchControl.valueChanges.pipe(
      tap(res => {
        this.completeControlCount ++;
        setTimeout(() => {
          this.completeControlCount --;
          if(this.completeControlCount == 0) {
            this.filteredReftypeData = this.reftypeData.filter(option => (option.key.toLowerCase().search(res) != -1 || option.title.toLowerCase().search(res) != -1));
          }
        }, 500);
      })
    ).subscribe();
  }

  searchControl = new FormControl();

  async getRefTypeList() {
    let request = new RefType();
    request.setKey("");
    request.setName("");
    request.setCount(1000);

    let result: any = await firstValueFrom(this.cof.doRequest(request));

    if (result && !!result) {
      this.reftypeList = result;
      this.filteredReftypeData = this.reftypeData = this.reftypeList.data.map(item => <ICrmItem>{
        key: item.id.toString(),
        title: item.name,
        obj: item,
      });
    } else {
    }

  }

  refTypeSelected(refType: ICrmItem) {
    if (this.selectedRefType?.key != refType.key) {
      this.selectedRefType = refType;
      let refTypeObject = <IRefType>refType.obj;
      this.refTcolumnDefs = refTypeObject.category_id == RefTreeTypeCategory.TREE ? (refTypeObject.readonly ? this.refTreeTablecolumnDefs : [...this.refTreeTablecolumnDefs, ...this.refTableNotReadOnlyDefs]) :
        (refTypeObject.readonly ? this.refTablecolumnDefs : [...this.refTablecolumnDefs, ...this.refTableNotReadOnlyDefs]);
      if ((<IRefType>refType.obj).category_id == RefTreeTypeCategory.TREE) {
        this.getRequest = new RefTree();
      } else {
        this.getRequest = new Reference();
      }
      this.getReferenceByType(this.selectedRefType.key);
    }
  }

  async getReferenceByType(typeId: string = '') {
    setTimeout(() => {
      this.getRequest.setTypeId(typeId);
      if (this.dataGrid)
        this.dataGrid.reloadGrid();

    }, 100)
  }

  showForm(reference: Reference | RefTree | null = null) {
    let ref: MatDialogRef<RefenceFormDialog> = RefenceFormDialog.openDialog(this.dialog, this.selectedRefType?.obj, reference);
    ref.afterClosed().subscribe(v => {
      if (v) {
        this.getReferenceByType(this.selectedRefType?.key);
      }
    })
  }

  onBtnClick1(e: any) {
    let reference: Reference | RefTree = e.rowData;
    this.showForm(reference);
  }

  onDeleteBtnClick(e: any) {
    CrmConfirmDialog.show(this.translate.instant('GENERAL.ARE_YOU_SURE_YOU_WANT_DELETE_THIS_ITEM'))
      .subscribe(res => {
        if (res) {
          let reference: Reference | RefTree = e.rowData;
          let deleteRequest: ReferenceDelete | RefTreeDelete = new ReferenceDelete();
          if(this.selectedRefType?.obj.category_id === RefTreeTypeCategory.TREE) {
            deleteRequest = new RefTreeDelete();
          }
          deleteRequest.id = reference.id;
          deleteRequest.type_id = reference.type_id;
          firstValueFrom(this.cof.doRequest(deleteRequest).pipe(tap(res => {
            let data = <DeleteResponseDataStringEntity> res;
            if(data.status == 200) {
              this.dataGrid.reloadGrid();
            }
          })))
        }
      });
  }
}
