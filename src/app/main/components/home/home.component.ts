import {
  AfterContentInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import {
  ColDef, HeaderValueGetterParams
} from 'ag-grid-community';
import {
  Subscription
} from 'rxjs';
import { ROLES } from 'src/app/common/enums/roles-enum';
import {
  AgGridBean
} from 'src/app/common/widgets/DataGrid/AgGridBean';
import { AccessRoleUtility } from 'src/app/_service/util/AccessRoleUtility';
import { PrintUtility } from 'src/app/_service/util/PrintUtility';
import {
  RefType
} from 'src/app/_shared/request/crm/RefType';
import { IFileUploadData } from '../../models/file-upload-response.entity';
import { IFileUploadRequest } from '../../models/file-upload.request.entity';
import {
  IRefType
} from '../../models/ref-type.entity';
import {
  IUserInfo
} from '../../models/session-info.entity';
import { BreadCrumbService } from '../breadcrumb/BreadCrumbService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class HomeComponent implements OnInit, AfterContentInit, OnDestroy {

  @ViewChild(AgGridBean, {
    static: false
  }) dataGrid!: AgGridBean;

  private $subscription: Subscription = new Subscription();
  userInfo: IUserInfo | undefined;
  totalCount: number = 0;
  pageSize = 5;

  columnDefs: ColDef[] = [{
    field: 'id',
    headerName: "GENERAL.LASTNAME",
    resizable: true,
  },
  {
    field: 'name',
    headerName: "GENERAL.TITLE",
    resizable: true,
    cellClass: params => ['my-class1', 'my-class2']
  },
  {
    field: 'key',
    headerName: 'Key'
  }
  ];

  request = new RefType();
  selectedItem!: IRefType;
  fileUploadRequest!: IFileUploadRequest;
  isAdmin: boolean = false;

  constructor(private translate: TranslateService, private breadcrumbs: BreadCrumbService) {
    this.breadcrumbs.setItems([]);
  }

  ngOnInit(): void {
    this.request.setKey("");
    this.request.setName("");
    this.fileUploadRequest = {
      typeId: 2,
      ownerId: 1,
      name: 'Haydovchi rasmi',
    }
  }

  save(event: IFileUploadData) {
  }

  ngAfterContentInit() {
    this.setAdminAccess()
  }

  refreshDataGrid() {
    this.request.setName("Жинси");
    this.dataGrid.reloadGrid();
  }

  onSelectedItem(selectedItem: any) {
    this.selectedItem = selectedItem;
  }

  setAdminAccess(): void {
    this.isAdmin = AccessRoleUtility.HasAdminAccess(ROLES.Administrator);
  }

  print() {
    PrintUtility.print("printContent", ['print-page.css']);
  }

  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }

  homeComponentFakeData = [
    {id: 1, title: 'CAR.SEARCH_OWNERS', icon: 'person_outline', link: "/car-owner/list"},
    {id: 2, title: 'HOME_LINKS.REGISTRATION_OF_VEHICLES', subtitle: 'HOME_LINKS.AMT_ACCOUNTING', icon: 'drive_eta', link: "/car/add"},
    {id: 3, title: 'HOME_LINKS.ACCOUNTING_FOR_MANDATORY_TECHNICAL_INSPECTION_OF_THE_VEHICLE', subtitle: 'HOME_LINKS.INSPECTION_ACCOUNTING', icon: 'drive_eta', link: ""},
    {id: 4, title: 'HOME_LINKS.DRIVER', icon: 'person_outline', link: "/driver/search"},
    {id: 5, title: 'HOME_LINKS.PERSONNEL', icon: 'person_outline', link: "/employee/search"},
    {id: 6, title: 'HOME_LINKS.KAIS_ADMPRAKTIKA', subtitle: 'HOME_LINKS.INSPECTION_ACCOUNTING', icon: 'person_outline', link: ""},
    {id: 7, title: 'HOME_LINKS.ARREST_CONTROL_WANTED', icon: 'person_outline', link: ""},
    {id: 8, title: 'HOME_LINKS.PENALTY_AREA', icon: 'person_outline', link: ""},
    {id: 8, title: 'HOME_LINKS.ROAD_OBJECT', icon: 'person_outline', link: ""},

  ]

}
