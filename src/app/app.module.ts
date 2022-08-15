import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpService } from './_service/HttpService';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { AgGridBean } from './common/widgets/DataGrid/AgGridBean';
import { MainMenu } from './main/menu/MainMenu';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { TestPage } from './main/test/TestPage';
import { HomeComponent } from './main/components/home/home.component';
import { LoginComponent } from './main/components/auth/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrmRefPage } from './main/components/reference/CrmRefPage';
import { CrmList } from './common/widgets/CrmList/CrmList';
import { AcGridButtonRenderer } from './common/widgets/DataGrid/renderer/button-renderer.component';
import { CrmButton } from './common/widgets/CrmButton/CrmButton';
import { CrmInput } from './common/widgets/CrmInput/CrmInput';
import { UsersPage } from './main/components/users/UsersPage';
import { CrmSelect } from './common/widgets/CrmSelect/CrmSelect';
import { MatSelectModule } from '@angular/material/select';
import { CrmLoadList } from './common/widgets/CrmLoadList/CrmLoadList';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatDialogModule } from '@angular/material/dialog';
import { UserFormDialog } from './main/components/users/userFormDialog/userFormDialog';
import { RefenceFormDialog } from './main/components/reference/refFormDialog/refFormDialog';
import { CrmAmount } from "./common/widgets/CrmAmount/CrmAmount";
import { NgxMaskModule } from "ngx-mask";
import { CrmInteger } from "./common/widgets/CrmInteger/CrmInteger";
import { AutocompleteTextbox } from './common/widgets/AutocompleteTextbox/AutocompleteTextbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CrmCheckbox } from './common/widgets/CrmCheckbox/CrmCheckbox';
import { CrmAddressPanel } from './common/widgets/CrmAddressPanel/CrmAddressPanel';
import { CrmBranch } from "./common/widgets/CrmBranch/CrmBranch";
import { AttributeSetupPanel } from './common/widgets/AttributeSetupPanel/AttributeSetupPanel';
import { AttributeParam } from './common/widgets/AttributeSetupPanel/AttributeParam/AttributeParam';
import { AttrTypeText } from './common/widgets/AttributeSetupPanel/AttributeParam/widgets/AttrTypeText';
import { AttrTypeRef } from './common/widgets/AttributeSetupPanel/AttributeParam/widgets/AttrTypeRef';
import { AttrTypePhone } from './common/widgets/AttributeSetupPanel/AttributeParam/widgets/AttrTypePhone';
import { AttrTypeInspector } from './common/widgets/AttributeSetupPanel/AttributeParam/widgets/AttrTypeInspector';
import { CrmDateInput } from './common/widgets/CrmDateInput/CrmDateInput';
import { AttrTypeDate } from './common/widgets/AttributeSetupPanel/AttributeParam/widgets/AttrTypeDate';
import { AttrKeyValueList } from './common/widgets/AttributeSetupPanel/AttributeParam/widgets/AttrKeyValueList';
import { AttrCheckbox } from './common/widgets/AttributeSetupPanel/AttributeParam/widgets/AttrCheckbox';
import { WidgetsComponent } from "./main/components/widgets/widgets.component";
import { CrmAlertDialog } from "./common/widgets/CrmAlertDialog/CrmAlertDialog";
import { CrmConfirmDialog } from "./common/widgets/CrmConfirmDialog/CrmConfirmDialog";
import { MatNativeDateModule } from '@angular/material/core';
import { CrmDocumentSelector } from './common/widgets/CrmDocumentSelector/CrmDocumentSelector';
import { CrmPasportPanel } from './common/widgets/CrmPasportPanel/CrmPasportPanel';
import { AlertDialog } from './common/widgets/AlertDialog/AlertDialog';
import { EmployeeDetail } from './main/components/employee/employeeDetail/EmployeeDetail';
import { TabContentComponent } from './common/widgets/CrmDynamicTab/TabContentComponent';
import { ContentContainerDirective } from './common/widgets/CrmDynamicTab/ContentContainerDirective';
import { EmployeeTemplatePanel } from './main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel';
import { EmployeeAddComponent } from './main/components/employee/employee-add/employee-add.component';
import { EmployeeInfoComponent } from './main/components/employee/employee-add/employee-info/employee-info.component';
import { EmployeeAttributesComponent } from './main/components/employee/employee-add/employee-attributes/employee-attributes.component';
import { EmployeeAddressComponent } from './main/components/employee/employee-add/employee-address/employee-address.component';
import { EmployeePassportComponent } from './main/components/employee/employee-add/employee-passport/employee-passport.component';
import { EmployeeDepartmentComponent } from './main/components/employee/employee-add/employee-department/employee-department.component';
import { NotificationService } from './_service/NotificationService';
import { CrmFormDialog } from './common/widgets/CrmFormDialog/CrmFormDialog';
import { EmpAwardForm } from './main/components/employee/forms/empAward/EmpAwardForm';
import { EmpEducationForm } from './main/components/employee/forms/EmpEducationForm/EmpEducationForm';
import { EmpExperienceForm } from './main/components/employee/forms/EmpExperienceForm/EmpExperienceForm';
import { EmpMilitaryForm } from './main/components/employee/forms/EmpMilitaryForm/EmpMilitaryForm';
import { EmpRelativeForm } from './main/components/employee/forms/EmpRelativeForm/EmpRelativeForm';
import { EmployeeSearchPage } from "./main/components/employee/employee-search/EmployeeSearchPage";
import { AttributeDirective } from './common/widgets/AttributeSetupPanel/AttributeParam/AttributeDirective';
import { AttrTypeInteger } from './common/widgets/AttributeSetupPanel/AttributeParam/widgets/AttrTypeInteger';
import { CrmFileUploaderComponent } from './common/widgets/crm-file-uploader/crm-file-uploader.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EmpAddressForm } from './main/components/employee/forms/EmpAddress/EmpAddressForm';
import { CrmUploadDialog } from "./common/widgets/CrmUploadDialog/CrmUploadDialog";
import { CrmImage } from "./common/widgets/CrmImage/CrmImage";
import { CrmEmpAddDialog } from './main/components/employee/employee-add/CrmEmpAddDialog';
import { AttributeSetupDynamicPanel } from './common/widgets/AttributeSetupPanel/AttributeSetupDynamicPanel';
import { DriverSearchPage } from "./main/components/driver/DriverSearchPage/DriverSearchPage";
import { DriverInfoComponent } from "./main/components/driver/driver-add/driver-info/driver-info.component";
import { DriverAddComponent } from "./main/components/driver/driver-add/driver-add.component";
import { DriverDocumentComponent } from "./main/components/driver/driver-add/driver-document/driver-document.component";
import {
  DriverBirthplaceComponent
} from "./main/components/driver/driver-add/driver-birthplace/driver-birthplace.component";
import { DriverDetail } from './main/components/driver/DriverDetail/DriverDetail';
import { CrmPassword } from './common/widgets/CrmPassword/CrmPassword';
import { LayoutComponent } from './main/components/layout/layout.component';
import { MenuTreeComponent } from './main/components/layout/menu-tree/menu-tree.component';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CrmImageLoadButton } from './common/widgets/CrmImageLoadButton/CrmImageLoadButton';
import { DriverAddDialog } from './main/components/driver/driver-add/driverAddDialog';
import { EmpPunishForm } from './main/components/employee/forms/EmpPunishForm/EmpPunishForm';
import { PersonDocumentForm } from './main/components/driver/forms/PersonDocumentForm/PersonDocumentForm';
import { Report } from './main/components/Report/Report';
import { AttrBranchList } from './common/widgets/AttributeSetupPanel/AttributeParam/widgets/AttrBranchList';
import { EmpChangePositionForm } from "./main/components/employee/forms/empChangePosition/EmpChangePositionForm";
import { EmpChangeMilitaryTitleForm } from "./main/components/employee/forms/empChangeMilitaryTitle/EmpChangeMilitaryTitleForm";
import { EmpDismissalForm } from "./main/components/employee/forms/empDismissalForm/EmpDismissalForm";
import { ReportTreeSelector } from './main/components/Report/ReportTreeSelector/ReportTreeSelector';
import { ReportControlPanel } from './main/components/Report/ReportControlPanel/ReportControlPanel';
import { CrmTextarea } from './common/widgets/CrmTextarea/CrmTextarea';
import { ReportControlParamsPanel } from './main/components/Report/ReportControlParamsPanel/ReportControlParamsPanel';
import { ReportParamForm } from './main/components/Report/ReportParamForm/ReportParamForm';
import { StatusFlagPanel } from './common/widgets/StatusFlagPanel/StatusFlagPanel';
import { AccessSearch } from './main/components/settings/access/AccessSearch';
import { CrmJuridicalData } from "./common/widgets/CrmJuridicalData/CrmJuridicalData";
import { RoleSearch } from './main/components/settings/role/RoleSearch';
import { CrmAddCarOwnerLegal } from "./common/widgets/CrmAddCarOwnerLegal/CrmAddCarOwnerLegal";
import { CrmAddCarOwnerLegal2 } from "./common/widgets/CrmAddCarOwnerLegal2/CrmAddCarOwnerLegal2";
import { DropDownMenu } from "./common/widgets/DropDownMenu/DropDownMenu";
import { CrmOwnerShip } from './common/widgets/CrmOwnership/CrmOwnerShip';
import { CrmAddCarOwnerIndividuals } from './common/widgets/CrmAddCarOwnerIndividuals/CrmAddCarOwnerIndividuals';
import { CrmAddCarOwnerIndividuals2 } from './common/widgets/CrmAddCarOwnerIndividuals2/CrmAddCarOwnerIndividuals2';
import { CarSearch } from './main/components/car/CarSearch';
import { TreeSelector } from "./common/widgets/TreeSelector/TreeSelector";
import { BranchControlPanel } from "./main/components/settings/branch/BranchControlPanel";
import { PositionListComponent } from "./main/components/settings/branch/position/PositionListComponent";
import { BranchPositionForm } from "./main/components/settings/branch/PositionForm/BranchPositionForm";
import { CarAdd } from './main/components/car/car-add2/CarAdd';
import { CrmRadioGroup } from './common/widgets/CrmRadioGroup/CrmRadioGroup';
import { Header } from './main/components/header/Header';
import { Breadcrumb } from './main/components/breadcrumb/breadcrumb.component';
import { Navbar } from './main/components/navbar/navbar.component';
import { appInitializer } from './common/helpers/app.initializer';
import { AuthenticationService } from './_service/authentication.service';
import { JwtInterceptor } from './common/helpers/jwt.interceptor';
import { ErrorInterceptor } from './common/helpers/error.interceptor';
import { SessionInfoService } from './main/components/services/session-info.service';
import { LocalStorageService } from './main/components/services/local-storage.service';
import { CarModelSearch } from './main/components/car/car-model/CarModelSearch';
import { CarModelFormDialog } from './main/components/car/car-model/CarModelFormDialog/CarModelFormDialog';
import { CarOwnerInformation } from './main/components/car/forms/CarOwnerInformation/CarOwnerInformation';
import { CarTechnicParams } from './main/components/car/forms/CarTechnicParams/CarTechnicParams';
import { AuditListForm } from "./main/components/driver/forms/AuditListForm/AuditListForm";
import { DriverDocumentWrapperComponent } from './main/components/driver/driver-add/driver-document/DriverDocumentWrapperComponent';
import { CrmColor } from './common/widgets/CrmColor/CrmColor';
import { DriverPrintDialog } from './main/components/driver/DriverDetail/DriverPrintDialog/DriverPrintDialog';
import { DriverDepriveForm } from "./main/components/driver/forms/DepriveForm/DriverDepriveForm";
import { CrmMultiSelect } from './common/widgets/CrmMultiSelect/CrmMultiSelect';
import { CrmMultiLoadList } from './common/widgets/CrmMultiLoadList/CrmMultiLoadList';
import { DriverCheckForm } from "./main/components/driver/forms/CheckForm/DriverCheckForm";
import { FilterTableWrapper } from './main/components/filterTableContainer/filterTableWrapper.component';
import { CarDetail } from "./main/components/car/car-detail/CarDetail";
import { CrmOwnerImage } from './common/widgets/CrmOwnerImage/CrmOwnerImage';
import { CrmTableView } from "./common/widgets/CrmTableView/CrmTableView";
import { TechnicalInspectionForm } from "./main/components/car/forms/TechnicalInspection/TechnicalInspectionForm";
import { CarCheckForm } from "./main/components/car/forms/CheckForm/CarCheckForm";
import { CarTuningForm } from './main/components/car/forms/CarTuningForm/CarTuningForm';
import { EmpFileChangeForm } from "./main/components/employee/forms/empFileChange/EmpFileChangeForm";
import { CarEdit } from './main/components/car/car-edit/CarEdit';
import { CrmLabel } from './common/widgets/CrmLabel/CrmLabel';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CarBlockForm } from './main/components/car/car-detail/CarBlockForm/CarBlockForm';
import { CrmConfigService } from './_service/crm-config.service';
import {CarPrintDialog} from "./main/components/car/car-detail/CarPrintDialog/CarPrintDialog";
import {CarClientDetail} from "./main/components/client/detail/CarClientDetail";
import {CrmJsonView} from "./common/widgets/CrmJsonView/CrmJsonView";
import { CarOwnerSearch } from './main/components/car/car-owners/CarOwnerSearch';
import { CarOwnerYurikAdd } from './main/components/car/car-owner-yurik-add/CarOwnerYurikAdd';
import { CarOwnerPersonAdd } from './main/components/car/car-owner-person-add/CarOwnerPersonAdd';
import { CrmAutocomplete } from './common/widgets/CrmAutocomplete/CrmAutocomplete';
import { CrmTreeSelector } from './common/widgets/CrmTreeSelector/CrmTreeSelector';
import { AttrTypeRefTree } from './common/widgets/AttributeSetupPanel/AttributeParam/widgets/AttrTypeRefTree';
import { AttrTypeLabel } from './common/widgets/AttributeSetupPanel/AttributeParam/widgets/AttrTypeLabel';
import { CrmAutocompleteLoadList } from './common/widgets/CrmAutocompleteLoadList/CrmAutocompleteLoadList';
import {CompanyListForm} from "./main/components/car/forms/CompanyListForm/CompanyListForm";
import { CrmContactInput } from './common/widgets/CrmContactInput/CrmContactInput';
import { QuickLinkItem } from './main/components/QuickLinkItem/QuickLinkItem.component';
import { AutoCarSearch } from './main/components/auto-car/AutoCarSearch';
import { CrmImageDialog } from './common/widgets/CrmImageDialog/CrmImageDialog';
import { SecondaryLayout } from './main/components/SecondaryLayout/secondaryLayout.component';
import { EmpPunishRemoveForm } from './main/components/employee/forms/EmpPunishRemoveForm/EmpPunishRemoveForm';
import {CrmJsonViewDialog} from "./common/widgets/CrmJsonViewDialog/CrmJsonViewDialog";
import {CrmSigPlusForm} from "./common/widgets/CrmSigPlusForm/CrmSigPlusForm";
import { CrmVideoDevice } from './common/widgets/CrmVideoDevice/CrmVideoDevice';
import { EmpLanguageForm } from './main/components/employee/forms/EmpLanguageForm/EmpLanguageForm';
import { CrmSignDialog } from './common/widgets/CrmSignDialog/CrmSignDialog';
import {CrmDriverImageDialog} from "./common/widgets/CrmDriverImageDialog/CrmDriverImageDialog";
import { RoleAddForm } from './main/components/settings/role/role-add/RoleAddForm';
import { RoleAccessSearch } from './main/components/settings/role-access/RoleAccessSearch';
import {DrbStateListForm} from "./main/components/car/drb-state-search/DrbStateListForm";
import {DrbStateForm} from "./main/components/car/drb-state-search/drbStateForm/DrbStateForm";
import {CrmOverlay} from "./common/widgets/crn-overlay/CrmOverlay";
import { RoleAccessLinkForm } from './main/components/settings/role/RoleAccessLinkForm/RoleAccessLinkForm';
import { CrmPasportPanel2 } from './common/widgets/CrmPasportPanel2/CrmPasportPanel2';
import { CarOwnerInformation2 } from './main/components/car/forms/CarOwnerInformation2/CarOwnerInformation2';
import { DriverBirthplace2Component } from './main/components/driver/driver-add/driver-birthplace2/driver-birthplace2.component';
import { CrmAddressPanel2 } from './common/widgets/CrmAddressPanel2/CrmAddressPanel2';
import { CrmOwnerShip2 } from './common/widgets/CrmOwnership2/CrmOwnerShip2';
import { CarTechnicParams2 } from './main/components/car/forms/CarTechnicParams2/CarTechnicParams2';
import { CarTuningForm2 } from './main/components/car/forms/CarTuningForm2/CarTuningForm2';
import {TechnicalInspectionCarSearch} from "./main/components/car/technical-inspection/TechnicalInspectionCarSearch";
import {
  TechnicalInspectionCarDetail
} from "./main/components/car/technical-inspection/deteail/TechnicalInspectionCarDetail";
import { ResourceService } from './_service/resources-service.service';
import {CrmCarModel} from "./common/widgets/CrmCarModel/CrmCarModel";
import { AttrMultiSelect } from './common/widgets/AttributeSetupPanel/AttributeParam/widgets/AttrMultiSelect';
import {CarHistoryListForm} from "./main/components/car/forms/CarHistoryListForm/CarHistoryListForm";
import {CrmInputPatternDirective} from "./common/widgets/CrmInputPatternDirective/CrmInputPatternDirective";
import {DriverCertHistoryForm} from "./main/components/driver/forms/DriverCertHistoryForm/DriverCertHistoryForm";
import { CrmPersonDataPasport } from './common/widgets/CrmPersonDataPasport/CrmPersonDataPasport';
import { CrmPersonDataPnfl } from './common/widgets/CrmPersonDataPnfl/CrmPersonDataPnfl';
import { QRCodeModule } from 'angularx-qrcode';
import { CrmCheckboxList } from './common/widgets/CrmCheckboxList/CrmCheckboxList';
import { CarCheck } from './main/components/car/car-check/CarCheck';
import { TreeGridSelector } from './common/widgets/TreeGridSelector/TreeGridSelector';
import { MultiCheckGridSelector } from './common/widgets/MultiCheckGridSelector/MultiCheckGridSelector';
import {CarCheckCard} from "./main/components/car/car-detail/CarCheckCard/CarCheckCard";
import {PersonCheckCard} from "./main/components/car/car-detail/PersonCheckCard/PersonCheckCard";
import { CrmConfirmCommentDialog } from './common/widgets/CrmConfirmCommentDialog/CrmConfirmCommentDialog';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DriverCheck } from './main/components/driver/driver-check/DriverCheck';
import { MultiTab } from './main/components/MultiTab/MultiTab';
import { PortalModule } from '@angular/cdk/portal';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

// Load Application Configuration
export function initConfig(crmConfigService: CrmConfigService) {
  return () => crmConfigService.loadConfig();
}

export let InjectorInstance: Injector;
@NgModule({
  declarations: [
    AppComponent,
    AgGridBean,
    MainMenu,
    TestPage,
    HomeComponent,
    LoginComponent,
    WidgetsComponent,
    CrmRefPage,
    CrmList,
    CrmButton,
    CrmInput,
    CrmTextarea,
    CrmAmount,
    CrmInteger,
    CrmSelect,
    CrmLoadList,
    UsersPage,
    EmployeeSearchPage,
    UserFormDialog,
    RefenceFormDialog,
    AcGridButtonRenderer,
    AlertDialog,
    CrmAlertDialog,
    CrmConfirmDialog,
    CrmUploadDialog,
    CrmImage,
    CrmPersonDataPasport,
    CrmPersonDataPnfl,
    AutocompleteTextbox,
    CrmCheckbox,
    CrmCheckboxList,
    CrmAddressPanel,
    CrmBranch,
    CrmTableView,
    CrmDateInput,
    CrmAddressPanel,
    AttributeSetupPanel,
    AttributeSetupDynamicPanel,
    AttributeParam,
    AttrTypeText,
    AttrTypeRef,
    AttrTypeRefTree,
    AttrTypePhone,
    AttrTypeInspector,
    AttrTypeDate,
    AttrKeyValueList,
    AttrCheckbox,
    AttrTypeInteger,
    AttrBranchList,
    AttrTypeRefTree,
    AttrTypeLabel,
    AttrMultiSelect,
    AttributeDirective,
    CrmDocumentSelector,
    CrmPasportPanel,
    EmployeeDetail,
    TabContentComponent,
    ContentContainerDirective,
    EmployeeTemplatePanel,
    EmployeeAddComponent,
    EmployeeInfoComponent,
    EmployeeAttributesComponent,
    EmployeeAddressComponent,
    EmployeePassportComponent,
    EmployeeDepartmentComponent,
    CrmFormDialog,
    EmpAwardForm,
    EmpEducationForm,
    EmpExperienceForm,
    EmpMilitaryForm,
    EmpRelativeForm,
    EmpAddressForm,
    EmpChangePositionForm,
    EmpChangeMilitaryTitleForm,
    EmpDismissalForm,
    EmpFileChangeForm,
    CrmFileUploaderComponent,
    CrmEmpAddDialog,
    DriverSearchPage,
    DriverInfoComponent,
    DriverAddComponent,
    DriverDocumentComponent,
    DriverBirthplaceComponent,
    DriverDetail,
    AuditListForm,
    CrmOverlay,
    DrbStateListForm,
    DrbStateForm,
    CompanyListForm,
    DriverDepriveForm,
    DriverCheckForm,
    CrmPassword,
    LayoutComponent,
    MenuTreeComponent,
    CrmDriverImageDialog,
    CrmImageLoadButton,
    DriverAddDialog,
    EmpPunishForm,
    PersonDocumentForm,
    ReportTreeSelector,
    TreeSelector,
    DropDownMenu,
    Report,
    ReportControlPanel,
    ReportControlParamsPanel,
    ReportParamForm,
    StatusFlagPanel,
    BranchControlPanel,
    PositionListComponent,
    BranchPositionForm,
    AccessSearch,
    CrmJuridicalData,
    RoleSearch,
    CrmOwnerShip,
    CarSearch,
    TechnicalInspectionCarSearch,
    TechnicalInspectionCarDetail,
    CarAdd,
    CrmRadioGroup,
    CrmAddCarOwnerIndividuals,
    CrmAddCarOwnerLegal,
    CarSearch,
    Header,
    Breadcrumb,
    Navbar,
    CarModelSearch,
    CarModelFormDialog,
    CarOwnerInformation,
    CarTechnicParams,
    CarDetail,
    CarCheckForm,
    CarPrintDialog,
    CarClientDetail,
    TechnicalInspectionForm,
    CrmColor,
    DriverDocumentWrapperComponent,
    DriverPrintDialog,
    CrmMultiSelect,
    CrmMultiLoadList,
    FilterTableWrapper,
    CrmOwnerImage,
    CarTuningForm,
    CarEdit,
    CrmLabel,
    CarBlockForm,
    CarOwnerSearch,
    CarOwnerYurikAdd,
    CarOwnerPersonAdd,
    CrmJsonView,
    CrmJsonViewDialog,
    CrmSigPlusForm,
    CrmAutocomplete,
    CrmTreeSelector,
    QuickLinkItem,
    CrmCarModel,
    CrmAutocompleteLoadList,
    CrmContactInput,
    AutoCarSearch,
    CrmImageDialog,
    SecondaryLayout,
    EmpPunishRemoveForm,
    CrmVideoDevice,
    EmpLanguageForm,
    CrmSignDialog,
    RoleAddForm,
    RoleAccessSearch,
    RoleAccessLinkForm,
    CrmAddCarOwnerLegal2,
    CrmAddCarOwnerIndividuals2,
    CrmPasportPanel2,
    CarOwnerInformation2,
    DriverBirthplace2Component,
    CrmAddressPanel2,
    CrmOwnerShip2,
    CarTechnicParams2,
    CarTuningForm2,
    CarHistoryListForm,
    CrmInputPatternDirective,
    DriverCertHistoryForm,
    CarCheck,
    TreeGridSelector,
    MultiCheckGridSelector,
    CarCheckCard,
    PersonCheckCard,
    CrmConfirmCommentDialog,
    DriverCheck,
    MultiTab
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatTabsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatTableModule,
    MatGridListModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    FormsModule,
    CdkTreeModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    ScrollingModule,
    MatSidenavModule,
    MatListModule,
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'ru',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    AgGridModule.withComponents([AcGridButtonRenderer, CrmButton]),
    DragDropModule,
    QRCodeModule,
    ImageCropperModule,
    PortalModule
  ],
  providers: [HttpService, NotificationService, AcGridButtonRenderer, CrmFormDialog, CrmEmpAddDialog,
    { provide: APP_INITIALIZER, useFactory: initConfig, deps: [CrmConfigService], multi: true },
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService, ResourceService, SessionInfoService, LocalStorageService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private injector: Injector) {
    InjectorInstance = injector;
  }
}
