import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAddComponent } from './main/components/employee/employee-add/employee-add.component';
import { EmployeeDetail } from './main/components/employee/employeeDetail/EmployeeDetail';
import { HomeComponent } from './main/components/home/home.component';
import { CrmRefPage } from './main/components/reference/CrmRefPage';
import { UsersPage } from './main/components/users/UsersPage';
import { WidgetsComponent } from "./main/components/widgets/widgets.component";
import { EmployeeSearchPage } from "./main/components/employee/employee-search/EmployeeSearchPage";
import { DriverSearchPage } from "./main/components/driver/DriverSearchPage/DriverSearchPage";
import { DriverAddComponent } from "./main/components/driver/driver-add/driver-add.component";
import { DriverDetail } from './main/components/driver/DriverDetail/DriverDetail';
import { Report } from './main/components/Report/Report';
import { ReportControlPanel } from './main/components/Report/ReportControlPanel/ReportControlPanel';
import { AccessSearch } from './main/components/settings/access/AccessSearch';
import { RoleSearch } from './main/components/settings/role/RoleSearch';
import { LoginComponent } from './main/components/auth/login/login.component';
import { CarSearch } from './main/components/car/CarSearch';
import {BranchControlPanel} from "./main/components/settings/branch/BranchControlPanel";
import { AuthGuard } from './common/helpers/auth.guard';
import { CarAdd } from './main/components/car/car-add2/CarAdd';
import { CarModelSearch } from './main/components/car/car-model/CarModelSearch';
import {CarDetail} from "./main/components/car/car-detail/CarDetail";
import {CarClientDetail} from "./main/components/client/detail/CarClientDetail";
import { CarOwnerSearch } from './main/components/car/car-owners/CarOwnerSearch';
import { CarOwnerYurikAdd } from './main/components/car/car-owner-yurik-add/CarOwnerYurikAdd';
import { CarOwnerPersonAdd } from './main/components/car/car-owner-person-add/CarOwnerPersonAdd';
import { AutoCarSearch } from './main/components/auto-car/AutoCarSearch';
import {DrbStateListForm} from "./main/components/car/drb-state-search/DrbStateListForm";
import { AccessGuard } from './common/helpers/access.guard';
import {TechnicalInspectionCarSearch} from "./main/components/car/technical-inspection/TechnicalInspectionCarSearch";
import {
  TechnicalInspectionCarDetail
} from "./main/components/car/technical-inspection/deteail/TechnicalInspectionCarDetail";
import { CarCheck } from './main/components/car/car-check/CarCheck';
import { DriverCheck } from './main/components/driver/driver-check/DriverCheck';
import { ComponentKeyNames, MultiTab } from './main/components/MultiTab/MultiTab';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard],canActivateChild:[AccessGuard], children: [
      { path: '', component: HomeComponent, data:{breadcrumb: 'Home page'}},
      { path: 'users', component: UsersPage, data:{breadcrumb: 'User page',accessKey:'settings'} },
      { path: 'branches', component: HomeComponent, data:{breadcrumb: 'Branches page',accessKey:'settings'} },
      { path: 'reference', component: CrmRefPage, data:{breadcrumb: 'reference page',accessKey:'reference'} },
      { path: 'widgets', component: WidgetsComponent, data:{breadcrumb: 'widgets page'} },
      { path: 'employee/detail/:id', component: EmployeeDetail, data:{breadcrumb: 'Employee page',accessKey:'kadr_detail_view'} },
      { path: 'employee/add', component: EmployeeAddComponent, data:{breadcrumb: 'Employee add page',accessKey:'kadr_add_employee'} },
      { path: 'employee/search', component: EmployeeSearchPage, data:{breadcrumb: 'Employee search page',accessKey:'kadr_search_employee'} },
      // { path: 'driver/search', component: DriverSearchPage, data:{breadcrumb: 'Driver search page',accessKey:'dr_search'} },
      { path: 'driver/search', component: MultiTab, data:{breadcrumb: 'Car owner add page',initialComp:ComponentKeyNames.TDriverSearch,accessKey:'dr_search'} },
      { path: 'driver/add', component: DriverAddComponent, data:{breadcrumb: 'Driver add page',accessKey:'dr_add'} },
      { path: 'driver/detail/:id', component: DriverDetail, data:{breadcrumb: 'driver detail page',accessKey:'dr_view'} },
      { path: 'report/list', component: Report, data:{breadcrumb: 'Report list page',accessKey:'report'} },
      { path: 'settings/report', component: ReportControlPanel, data:{breadcrumb: 'Setting report page',accessKey:'settings'} },
      { path: 'settings/access', component: AccessSearch, data:{breadcrumb: 'Setting access page',accessKey:'settings'} },
      { path: 'settings/role', component: RoleSearch, data:{breadcrumb: 'Setting role page',accessKey:'settings'} },
      { path: 'settings/branch', component: BranchControlPanel, data:{breadcrumb: 'Setting branch page',accessKey:'settings'} },
      { path: 'car/list', component: CarSearch, data:{breadcrumb: 'Car list page',accessKey:'car_search'} },
      { path: 'car/detail/:id', component: CarDetail, data:{breadcrumb: 'Car list page',accessKey:'car'} },
      { path: 'car/add', component: CarAdd, data:{breadcrumb: 'Car add page',accessKey:'car_add'} },
      { path: 'car/drb-state/:typeId', component: DrbStateListForm, data:{breadcrumb: 'Car add page',accessKey:'car_drb'} },
      { path: 'client/detail/:id', component: CarClientDetail, data:{breadcrumb: 'Client page',accessKey:'car'} },
      { path: 'car-model', component: CarModelSearch, data:{breadcrumb: 'Car-model page',accessKey:'car'} },
      { path: 'car-owner/list', component: CarOwnerSearch, data:{breadcrumb: 'Car owner list page',accessKey:'car_search_owner'} },
      { path: 'car-yurik-owner/add', component: CarOwnerYurikAdd, data:{breadcrumb: 'Car yurik owner add page',accessKey:'car_add_company'} },
      { path: 'car-owner/person/add', component: CarOwnerPersonAdd, data:{breadcrumb: 'Car owner add page',accessKey:'car_add_person'} },
      { path: 'car/technical-inspection/search', component: TechnicalInspectionCarSearch, data:{breadcrumb: 'Car owner add page',accessKey:'car'} },
      { path: 'car/technical-inspection/detail/:id', component: TechnicalInspectionCarDetail, data:{breadcrumb: 'Car owner add page',accessKey:'car'} },
      { path: 'auto-car/search', component: AutoCarSearch, data:{breadcrumb: 'Auto car search page',accessKey:'car_search_owner'} },
      { path: 'car/check', component: CarCheck, data:{breadcrumb: 'Car owner add page',accessKey:'car'} },
      { path: 'driver/check', component: DriverCheck, data:{breadcrumb: 'Car owner add page',accessKey:'car'} },
    ]
  },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
