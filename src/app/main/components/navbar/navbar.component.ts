import {
  Component,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  HostListener,
  ElementRef
} from "@angular/core";
import {
  AuthenticationService
} from "src/app/_service/authentication.service";
import { ResourceService } from "src/app/_service/resources-service.service";
import {
  SessionInfoService
} from "../services/session-info.service";

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class Navbar {

  constructor(private eRef: ElementRef, private sessionInfoSvc: SessionInfoService, private resourceService: ResourceService) {
        this.setMenuElements();
  }
  @Output() sidebarStatus = new EventEmitter < string > ();
  sidebarStatusHolder: string | undefined;
  private clicked = false;
  @HostListener('document:click', ['$event'])

  onClick(event: Event) {
    if (this.eRef.nativeElement.contains(event.target)) {
    } else {
      this.sidebarStatusHolder = '';
      this.sidebarStatus.emit(this.sidebarStatusHolder)
    }
  }

  async setMenuElements() {
            this.setItems()
  }

  setItems(){
      this.menuItems = [];
    let items: MenuItem[] = this.getMenu();
    if (this.sessionInfoSvc.isAdmin()) {
      this.menuItems = items;
      return;
    }


    items.forEach(parentMenu => {
      console.log(parentMenu.access,this.sessionInfoSvc.hasAccess(parentMenu.access),'parentMenu.access')

      if (this.sessionInfoSvc.hasAccess(parentMenu.access)) {
        let canAdd = true;
        if (parentMenu.children.length > 0) {
          parentMenu.children = parentMenu.children.filter(childMenu => this.sessionInfoSvc.hasAccess(childMenu.access));
          if (parentMenu.children.length == 0)
            canAdd = false;
        }
        if (canAdd) {
          this.menuItems.push(parentMenu);
        }
      }
    });
  }

  getMenu() {
    const developerNavbar: MenuItem[] = [
      new MenuItem('MENU.HOME_PAGE', 'home', '/home'),
      new MenuItem('MENU.SETTINGS', 'settings', '', 'settings', [
        new MenuItem('MENU.USERS', 'trending_up', '/users'),
        new MenuItem('MENU.PERSONS', 'trending_up', '/branches')
      ]),
      new MenuItem('MENU.REFERENCES', 'wifi', '', 'reference', [
        new MenuItem('MENU.MAIN_REFERENCES', 'trending_up', '/reference'),
        new MenuItem('MENU.ADRESSES', 'trending_up', '/address'),
        new MenuItem('MENU.MODEL_SEARCH', 'trending_up', '/car-model'),
      ]),
      new MenuItem('MENU.COMPONENTS', 'devices', '/widgets', null),
      new MenuItem('MENU.EMPLOYES', 'people', '', 'kadr', [
        new MenuItem('MENU.SEARCH_EMPLOYEE', 'trending_up', '/employee/search', 'kadr_search_employee'),
        new MenuItem('MENU.ADD_EMPLOYEE', 'trending_up', '/employee/add', 'kadr_add_employee')
      ]),
      new MenuItem('MENU.DRIVERS', 'person_outline', '', 'driver', [
        new MenuItem('MENU.DRIVERS_SEARCH', 'trending_up', '/driver/search', 'dr_search'),
        new MenuItem('MENU.DRIVERS_ADD', 'trending_up', '/driver/add', 'dr_add'),
        new MenuItem('MENU.DRIVERS_PAGE', 'trending_up', '/driver/detail/1', 'dr_view')
      ]),
      new MenuItem('MENU.REPORT', 'menu_book', '/report/list', 'report'),
      new MenuItem('MENU.SETTINGS', 'settings', '', 'settings', [
        new MenuItem('MENU.REPORT_SETTINGS', 'trending_up', '/settings/report'),
        new MenuItem('MENU.ACCESS', 'trending_up', '/settings/access'),
        new MenuItem('MENU.BRANCH', 'trending_up', '/settings/branch'),
        new MenuItem('MENU.ROLE', 'trending_up', '/settings/role'),
      ]),
      new MenuItem('MENU.CAR', 'drive_eta', '', 'car', [
        new MenuItem('CAR.SEARCH', 'trending_up', '/car/list', 'car_search'),
        new MenuItem('CAR.ADD', 'trending_up', '/car/add', 'car_add'),
        new MenuItem('CAR.SEARCH_OWNERS', 'trending_up', '/car-owner/list', 'car_search_owner'),
        new MenuItem('MENU.ADD_PERSON_OWNER', 'trending_up', '/car-owner/person/add', 'car_add_person'),
        new MenuItem('CAR.ADD_YURIK_OWNER', 'trending_up', '/car-yurik-owner/add', 'car_add_company'),
        new MenuItem('CAR.LOST_DRB', 'trending_up', '/car/drb-state/2', 'car_drb'),
        new MenuItem('CAR.CUT_DRB', 'trending_up', '/car/drb-state/3', 'car_drb'),
        new MenuItem('CAR.STOLEN_DRB', 'trending_up', '/car/drb-state/4', 'car_drb'),
        new MenuItem('CAR.FAST_DRB', 'trending_up', '/car/drb-state/5', 'car_drb'),
        new MenuItem('CAR.TECHNICAL_INSPECTION', 'trending_up', '/car/technical-inspection/search', 'car_search'),
      ]),
      new MenuItem('CAR.EXTERNAL_API', 'swap_vert', '', null, [
        new MenuItem('CAR.AUTO_SHOPPING', 'trending_up', '/auto-car/search')
      ])
    ];

    const productionNavbar: MenuItem[] = [
      new MenuItem('MENU.HOME_PAGE', 'home', '/home'),
      new MenuItem('MENU.EMPLOYES', 'people', '', 'kadr', [
        new MenuItem('MENU.SEARCH_EMPLOYEE', 'trending_up', '/employee/search', 'kadr_search_employee'),
      ]),
      new MenuItem('MENU.DRIVERS', 'person_outline', '', 'driver', [
        new MenuItem('MENU.DRIVERS_SEARCH', 'trending_up', '/driver/search', 'dr_search')
      ]),
      new MenuItem('MENU.CAR', 'drive_eta', '', 'car', [
        new MenuItem('CAR.SEARCH', 'trending_up', '/car/list', 'car_search'),
        new MenuItem('CAR.CAR_CHECK', 'trending_up', '/car/check', 'car_search'),
        new MenuItem('CAR.PERSON_CHECK', 'trending_up', '/driver/check', 'car_search'),
        new MenuItem('CAR.ADD', 'trending_up', '/car/add', 'car_add'),
        new MenuItem('CAR.SEARCH_OWNERS', 'trending_up', '/car-owner/list', 'car_search_owner'),
        new MenuItem('MENU.ADD_PERSON_OWNER', 'trending_up', '/car-owner/person/add', 'car_add_person'),
        new MenuItem('CAR.ADD_YURIK_OWNER', 'trending_up', '/car-yurik-owner/add', 'car_add_company'),
        new MenuItem('CAR.LOST_DRB', 'trending_up', '/car/drb-state/2', 'car_drb'),
        new MenuItem('CAR.CUT_DRB', 'trending_up', '/car/drb-state/3', 'car_drb'),
        new MenuItem('CAR.STOLEN_DRB', 'trending_up', '/car/drb-state/4', 'car_drb'),
        new MenuItem('CAR.FAST_DRB', 'trending_up', '/car/drb-state/5', 'car_drb'),
        new MenuItem('CAR.TECHNICAL_INSPECTION', 'trending_up', '/car/technical-inspection/search', 'car_search'),
      ]),
      new MenuItem('MENU.SETTINGS', 'settings', '', 'settings', [
        new MenuItem('MENU.REPORT_SETTINGS', 'trending_up', '/settings/report'),
        new MenuItem('MENU.ACCESS', 'trending_up', '/settings/access'),
        new MenuItem('MENU.BRANCH', 'trending_up', '/settings/branch'),
        new MenuItem('MENU.ROLE', 'trending_up', '/settings/role'),
        new MenuItem('MENU.USERS', 'trending_up', '/users'),
        new MenuItem('MENU.PERSONS', 'trending_up', '/branches'),
      ]),
      new MenuItem('MENU.REFERENCES', 'wifi', '', 'reference', [
        new MenuItem('MENU.MAIN_REFERENCES', 'trending_up', '/reference'),
        new MenuItem('MENU.ADRESSES', 'trending_up', '/address'),
        new MenuItem('MENU.MODEL_SEARCH', 'trending_up', '/car-model'),
      ]),
      new MenuItem('MENU.REPORT', 'menu_book', 'report/list', 'report'),
      new MenuItem('CAR.EXTERNAL_API', 'swap_vert', '', null, [
        new MenuItem('CAR.AUTO_SHOPPING', 'trending_up', '/auto-car/search'),
      ]),
    ];
    return productionNavbar;
    // window.location.hostname == 'localhost' ? developerNavbar : productionNavbar;
  }


  menuItems: MenuItem[] = [];
  hasAccess(item: any) {
    let vRoute: string = item.url;

    return true;
  }
  menuClicked(subMenu: any) {
    this.sidebarStatusHolder = '';
    this.sidebarStatus.emit(this.sidebarStatusHolder)
  }

  openSidebar(label: any) {
    if (this.sidebarStatusHolder !== `elementSidebar${label}`) {
      this.sidebarStatusHolder = `elementSidebar${label}`;
      this.sidebarStatus.emit(this.sidebarStatusHolder)
    } else {
      this.sidebarStatusHolder = '';
      this.sidebarStatus.emit(this.sidebarStatusHolder)
    }

  }
}

export class MenuItem {
  constructor(public label: string, public icon: string, public url: string, public access: string | null = null, public children: MenuItem[] = []) {}
}
