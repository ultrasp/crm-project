import {Component, OnInit, ViewChild} from "@angular/core";
import {COFService} from "../../../../_service/COFService";
import {SessionInfoService} from "../../services/session-info.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReportSave} from "../../../../_shared/request/crm/ReportSave";
import {CrmAlertDialog} from "../../../../common/widgets/CrmAlertDialog/CrmAlertDialog";
import {CrmAlertDialogTypeError} from "../../../../common/enums/crm-alert-dialog.enum";
import {BaseForm} from "../../../../common/base.form/base-form";
import {Node, TreeSelector} from "../../../../common/widgets/TreeSelector/TreeSelector";
import {PositionListComponent} from "./position/PositionListComponent";
import { RequestClassKey } from "src/app/_shared/request/crm/RequestList";
import { BreadcrumbModel, BreadCrumbService } from "../../breadcrumb/BreadCrumbService";
import { TranslateService } from "@ngx-translate/core";
import {firstValueFrom, tap} from "rxjs";
import {IBranchCollection} from "../../../models/branch.entity";
import {Branch} from "../../../../_shared/request/crm/Branch";
import {Address} from "../../../../_shared/request/crm/Address";
import {AddressType} from "../../../../common/enums/address-type.enum";
import {BranchSave} from "../../../../_shared/request/crm/BranchSave";
import {Reference} from "../../../../_shared/request/crm/Reference";
import {CrmRefType} from "../../../../common/enums/crm-ref-type.enum";

@Component({
  selector: 'app-branch-manager',
  templateUrl: 'BranchControlPanel.html',
  styleUrls: ['BranchControlPanel.css'],
})
export class BranchControlPanel extends BaseForm implements OnInit {
  ngOnInit() {
  }


  selected!: string;
  @ViewChild(TreeSelector, { static: true }) tree!: TreeSelector;
  @ViewChild(PositionListComponent, { static: true }) positionListComponent!: PositionListComponent;

  constructor(override cof: COFService, private session: SessionInfoService,private breadcrumbs: BreadCrumbService,private translate: TranslateService) {
    super(cof)
    this.breadcrumbs.setItems([
      new BreadcrumbModel(this.translate.instant('MENU.BRANCH')),
    ]);

  }

  override form = new FormGroup({
    branchId: new FormControl('', [Validators.required]),
    name: new FormControl('',[Validators.required]),
    start_date: new FormControl('',[Validators.required]),
    end_date: new FormControl('',[]),
    description: new FormControl('',[]),
    region_id: new FormControl('',[]),
    city_id: new FormControl('',[]),
    status: new FormControl('',[Validators.required]),
    type_id: new FormControl('',[Validators.required]),
  })

  setRegionParam = (request:Address):void =>{
    request.setType(AddressType.REGION);
  }

  setStatusParam = (request: Reference):void =>{
    request.setTypeId(CrmRefType.BRANCH_STATUS);
  }

  setTypeParam = (request: Reference): void =>{
    request.setTypeId(CrmRefType.BRANCH_TYPE);
  }

  BranchParams = (request: Branch): void =>{
    request.setSorts([
      {
        "direction": "ASC",
        "field": "id"
      }
    ]);
  }

  setCityParam = (request: Address): void => {
    request.setType(AddressType.CITY);
    if (this.form.get('region_id')?.value !== undefined)
      request.setParentId((this.form.get('region_id')?.value) ? this.form.get('region_id')?.value : '-1');
    else
      request.setParentId('-1');
    return;
  }

  branchKey = RequestClassKey.BRANCH;


  reportNodeSelected(node:Node) {
    console.log(node,'node');
    if(node){
      this.selected = node.id;
      this.clearDetails();
      this.getDetails();
    }
  }


  clearDetails() {
    this.form.reset();
  }


  getDetails(): void {
    this.positionListComponent.refresh();
    let request = new Branch();
    request.setCount(1);
    request.id = parseInt(this.selected);
    firstValueFrom(this.cof.doRequest(request).pipe(
      tap(res => {
        let data = (<IBranchCollection> res).data[0];
        this.form.patchValue({
          name: data.name,
          start_date: data.start_date,
          end_date: data.end_date,
          description: data.description,
          region_id: data.region_id,
          city_id: data.city_id,
          status: data.status,
          type_id: data.type_id,
          branchId: data.parent_id,
        })
      }),
    ));
  }

  fillDetail() {
    this.clearDetails();

  }


  onClear(){
    this.clearDetails();
  }

  isAdd: Boolean = false;

  onAdd() {
    this.isAdd = true;
    this.onSave();
  }


  onSave(){
    this.saveProcess()
  }

  prepareRequest() {
    let saveRequest = new BranchSave();
    if(!this.isAdd)
      saveRequest.id = this.selected;
    saveRequest.end_date = this.form.get('end_date')?.value;
    saveRequest.start_date = this.form.get('start_date')?.value;
    saveRequest.name = this.form.get('name')?.value;
    saveRequest.description = this.form.get('description')?.value;
    saveRequest.region_id = this.form.get('region_id')?.value;
    saveRequest.city_id = this.form.get('city_id')?.value;
    saveRequest.status = this.form.get('status')?.value;
    saveRequest.type_id = this.form.get('type_id')?.value;
    saveRequest.parent_id = this.form.get('branchId')?.value;
    return saveRequest;
  }

  override onValidError() {
    this.form.markAllAsTouched();
  }

  onSaveAsNew(){
    this.form.patchValue({
      id:null
    })
    this.saveProcess()
  }

  override afterSave(): void {
    this.clearDetails();
    CrmAlertDialog.show('GENERAL.DATA_SAVED',CrmAlertDialogTypeError.INFO);
    this.tree.refresh();
  }
}
