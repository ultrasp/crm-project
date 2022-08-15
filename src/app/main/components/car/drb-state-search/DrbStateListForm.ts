import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {AgGridBean} from "../../../../common/widgets/DataGrid/AgGridBean";
import {ColDef} from "ag-grid-community";
import {DrbStateLogList} from "../../../../_shared/request/crm/DrbStateLogList";
import {ActivatedRoute, Params} from "@angular/router";
import {firstValueFrom, map, merge, Subject, tap} from "rxjs";
import {BreadcrumbModel, BreadCrumbService} from "../../breadcrumb/BreadCrumbService";
import {TranslateService} from "@ngx-translate/core";
import {CrmFormDialog} from "../../../../common/widgets/CrmFormDialog/CrmFormDialog";
import {DrbStateForm} from "./drbStateForm/DrbStateForm";
import {IDialogPersonFormData} from "../../employee/forms/IPersonFormInput";
import {ObjectOwnerType} from "../../../../common/enums/object-owner-type.enum";
import {DateUtil} from "../../../../_service/util/DateUtil";
import {StringUtil} from "../../../../_service/util/StringUtil";
import {CrmConfirmDialog} from "../../../../common/widgets/CrmConfirmDialog/CrmConfirmDialog";
import {COFService} from "../../../../_service/COFService";
import {DrbStateLogDelete} from "../../../../_shared/request/crm/DrbStateLogDelete";
import {CarCheckList} from "../../../../_shared/request/crm/CarCheckList";
import {IDriverCheck, IDriverCheckCollection} from "../../../models/driver-check.entity";

@Component({
  selector: 'app-drb-state-list',
  templateUrl: 'DrbStateListForm.html',
})
export class DrbStateListForm  implements OnInit{
  constructor(private route: ActivatedRoute, private breadcrumbs: BreadCrumbService, private translate: TranslateService, private cof: COFService) {

  }
  @Input() typeId!: number;

  request = new DrbStateLogList();

  form: FormGroup = new FormGroup({
    drb: new FormControl(null, []),
  })

  @ViewChild(AgGridBean, { static: true }) dataGrid!: AgGridBean;

  onRowEdit = (params: any) => {
    let row: any = params.rowData;
    let id = row == null ? '' : <string>StringUtil.toStr(row.id,'')
    this.onSave(id)
  }

  async deleteRow(params: any) {
    let row: any = params.rowData;
    let id = row == null ? '' : <string>StringUtil.toStr(row.id,'');
    if(id) {
      let needDelete: boolean = await firstValueFrom(CrmConfirmDialog.show('GENERAL.ARE_YOU_SURE_YOU_WANT_DELETE_THIS_ITEM'));
      if (needDelete) {
        let deleteRequest: any = new DrbStateLogDelete(id);
        firstValueFrom(this.cof.doRequest(deleteRequest).pipe(tap(res => {
          this.$refreshDetail.next(null);
        })));
      }
    }
  }


  refTableColumnDefs: ColDef[] = [
    {
      field: 'date',
      headerName: 'GENERAL.DATE',
      resizable: true,
      cellRenderer: params => ((params.value) ? DateUtil.formatDate(params.value) + '' : '')
    },
    {
      field: 'drb',
      headerName: 'CAR.DRB',
      resizable: true,
    },
    {
      field: 'drb_count',
      headerName: 'GENERAL.COUNT_OF',
      resizable: true,
    },
    {
      field: 'note',
      headerName: 'CAR.EXTRA_NOTE',
      resizable: true,
    },
    {
      field: 'edit',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onRowEdit ? this.onRowEdit.bind(this) : '',
        icon: 'edit',
        colorMode: 'primary'
      },
      headerName: 'FORM.CHANGE'
    },
    {
      field: 'delete',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.deleteRow ? this.deleteRow.bind(this) : '',
        icon: 'delete',
        colorMode: 'primary'
      },
      headerName: 'FORM.DELETE'
    },
  ];
  $refreshDetail: Subject<null> = new Subject();
  private sub: any;

  ngOnInit(): void {
    this.sub = merge(this.route.params, this.$refreshDetail).pipe(
      map((params: Params | null) => {
        if (params)
          this.typeId = parseInt(params['typeId']);
      }),
      tap(() => {
        this.getList();
        this.breadcrumbs.setItems([
          new BreadcrumbModel(this.translate.instant(this.getTitle())),
        ]);
      }),
      map(__ => {
      }),
    ).subscribe();
  }

  getTitle() {
    let title: string = '';
    switch (this.typeId) {
      case DrbTypes.lost:
        title = "CAR.LOST_DRB";
        break;
      case DrbTypes.cut:
        title = "CAR.CUT_DRB";
        break;
      case DrbTypes.stolen:
        title = "CAR.STOLEN_DRB";
        break;
      case DrbTypes.fast_number:
        title = "CAR.FAST_DRB";
        break;
    }
    return title;
  }

  async onSave(id: string = "") {
    let params: IDialogPersonFormData = {
      id: id,
      ownerId: String(this.typeId),
      ownerType: ObjectOwnerType.CAR,
    }
    let needRefresh: boolean = await firstValueFrom(CrmFormDialog.show(this.getTitle(), DrbStateForm, params));
    if (needRefresh) {
      this.$refreshDetail.next(null);
    }
  }




  getList() {
    this.form.markAllAsTouched();
    if(this.form?.valid) {
      this.request.drb = this.form.get('drb')?.value == '' ? null : this.form.get('drb')?.value; 
      this.request.type_id = this.typeId
      this.dataGrid.reloadGrid();
    }
  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl!.status == 'INVALID' && formControl!.touched;
  }

}

export enum DrbTypes{
  lost = 2,
  cut = 3,
  stolen = 4,
  fast_number = 5,
}
