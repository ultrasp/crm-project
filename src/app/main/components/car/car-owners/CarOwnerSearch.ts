import { Component, OnInit, ViewChild } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { FormControl, FormGroup } from "@angular/forms";
import { AgGridBean } from "../../../../common/widgets/DataGrid/AgGridBean";
import { StringUtil } from "../../../../_service/util/StringUtil";
import { TranslateService } from "@ngx-translate/core";
import { RequestClassKey } from "src/app/_shared/request/crm/RequestList";
import { CrmRefType } from "src/app/common/enums/crm-ref-type.enum";
import { Reference } from "src/app/_shared/request/crm/Reference";
import { BreadcrumbModel, BreadCrumbService } from "../../breadcrumb/BreadCrumbService";
import { Router } from "@angular/router";
import { CarOwnerList } from "src/app/_shared/request/crm/CarOwnerList";
import { CommonUtil } from "src/app/_service/util/CommonUtil";

@Component({
  selector: 'crm-car-owner-search',
  templateUrl: './CarOwnerSearch.html',
  styleUrls: ['./CarOwnerSearch.css'],
})
export class CarOwnerSearch implements OnInit {

  constructor(private translate: TranslateService, private breadcrumbs: BreadCrumbService, private router: Router) {
    this.breadcrumbs.setItems([
      new BreadcrumbModel(this.translate.instant('CAR.SEARCH_OWNERS')),
    ]);
  }

  requestCarOwner!: CarOwnerList;
  pageSize = 12;
  referenceKey: string = RequestClassKey.REFERENCE;

  ngOnInit(): void { }

  form: FormGroup = new FormGroup({
    client_doc_id: new FormControl(),
    client_name: new FormControl(),
    client_phone: new FormControl(),
    client_sector: new FormControl(),
    person_doc_num: new FormControl(),
    relation_branch_id: new FormControl(),
    relation_drb_number: new FormControl(),
  });

  refTableColumnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'GENERAL.ID',
      resizable: true,
    },
    {
      field: 'name',
      headerName: 'GENERAL.TITLE',
      resizable: true,
    },
    {
      field: 'doc_id',
      headerName: 'GENERAL.DOCUMENT_NUMBER',
      resizable: true,
    },
    {
      field: 'phone',
      headerName: 'CAR.PHONE',
      resizable: true,
    },
    {
      field: 'sector',
      headerName: 'CAR.SECTOR',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.SECTOR))
    },
  ];



  @ViewChild(AgGridBean, { static: true }) dataGrid!: AgGridBean;

  getCarOwnerList() {
    this.requestCarOwner = new CarOwnerList();
    this.requestCarOwner.setClientDocId(<string>StringUtil.toStr(this.form.get('client_doc_id')!.value, null));
    this.requestCarOwner.setClientName(<string>StringUtil.toStr(this.form.get('client_name')!.value, null));
    this.requestCarOwner.setClientPhone(<string>StringUtil.toStr(this.form.get('client_phone')!.value, null));
    this.requestCarOwner.setClientSector(<string>StringUtil.toStr(this.form.get('client_sector')!.value, null));
    this.requestCarOwner.setPersonDocNum(<string>StringUtil.toStr(this.form.get('person_doc_num')!.value, null));
    this.requestCarOwner.setRelationBranchId(<string>StringUtil.toStr(this.form.get('relation_branch_id')!.value, null));
    this.requestCarOwner.setRelationDrbNumber(<string>StringUtil.toStr(this.form.get('relation_drb_number')!.value, null));

    if (this.dataGrid) {
      this.dataGrid.reloadGrid();
    }
  }

  setSectorParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.SECTOR);
    return;
  }

  gridSelectEvent(event: any) {
    this.router.navigate(['/client/detail/', event.id]);
  }

}
