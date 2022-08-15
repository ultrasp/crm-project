import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { SystemConfig } from "src/app/common/enums/system-config.enum";
import { SessionInfoService } from "../components/services/session-info.service";

@Component({
  selector: 'crm-main-menu',
  templateUrl: './MainMenu.html',
  styleUrls: ['./MainMenu.css']
})
export class MainMenu implements OnInit {

  menuItems: any[] = [{
    'label': 'MENU.HOME_PAGE',
    'url': '/home'
  }, {
    'label': 'MENU.SETTINGS',
    'icon': 'attach_money',
    'children': [{
      'label': 'MENU.USERS',
      'icon': 'trending_up',
      'url': '/users'
    },
    {
      'label': 'MENU.PERSONS',
      'icon': 'trending_up',
      'url': '/branches'
    },
    ]
  },
  {
    'label': 'MENU.REFERENCES',
    'icon': 'bar_chart',
    'children': [{
      'label': 'MENU.MAIN_REFERENCES',
      'icon': 'trending_up',
      'url': '/reference'
    },
    {
      'label': 'MENU.ADRESSES',
      'icon': 'trending_up',
      'url': '/address'
    },
    {
      'label': 'MENU.MODEL_SEARCH',
      'icon': 'trending_up',
      'url': '/car-model'
    },
    ]
  },
  {
    'label': 'MENU.COMPONENTS',
    'url': '/widgets'
  },
  {
    'label': 'MENU.EMPLOYES',
    'icon': 'attach_money',
    'children': [{
      'label': 'MENU.SEARCH_EMPLOYEE',
      'icon': 'trending_up',
      'url': '/employee/search'
    },
    {
      'label': 'MENU.ADD_EMPLOYEE',
      'icon': 'trending_up',
      'url': '/employee/add'
    },
  ]
  },
  {
    'label': 'MENU.DRIVERS',
    'icon': 'attach_money',
    'children': [{
      'label': 'MENU.DRIVERS_SEARCH',
      'icon': 'trending_up',
      'url': '/driver/search'
    },
      {
      'label': 'MENU.DRIVERS_ADD',
      'icon': 'trending_up',
      'url': '/driver/add'
    },
    {
      'label': 'MENU.DRIVERS_PAGE',
      'icon': 'trending_up',
      'url': '/driver/detail/1'
    },
]
  },
  {
    'label': 'MENU.REPORT',
    'url': '/report/list'
  },
  {
    'label': 'MENU.SETTINGS',
    'icon': 'attach_money',
    'children': [{
      'label': 'MENU.REPORT_SETTINGS',
      'icon': 'trending_up',
      'url': '/settings/report'
    },
    {
      'label': 'MENU.ACCESS',
      'icon': 'trending_up',
      'url': '/settings/access'
    },
    {
      'label': 'MENU.BRANCH',
      'icon': 'trending_up',
      'url': '/settings/branch'
    },
    {
      'label': 'MENU.ROLE',
      'icon': 'trending_up',
      'url': '/settings/role'
    },
    ]
  },
  {
    'label': 'MENU.CAR',
    'icon': 'attach_money',
    'children' : [
      {
        'label': 'CAR.SEARCH',
        'icon': 'trending_up',
        'url': '/car/list'
      },
      {
        'label': 'CAR.ADD',
        'icon': 'trending_up',
        'url': '/car/add'
      },
      {
        'label': 'CAR.SEARCH_OWNERS',
        'icon': 'trending_up',
        'url': '/car-owner/list'
      },
      {
        'label': 'MENU.ADD_PERSON_OWNER',
        'icon': 'trending_up',
        'url': '/car-owner/person/add'
      }]
    },
    {
      'label': 'CAR.EXTERNAL_API',
      'icon': 'swap_vert',
      'children' : [
        {
          'label': 'CAR.AUTO_SHOPPING',
          'icon': 'trending_up',
          'url': '/auto-car/search'
        }
      ]
    }
  ];
  @Input() name = '';
  @Input() userName = '';
  public now: Date = new Date();

  constructor(private router: Router,
    private sessionInfoSvc: SessionInfoService, public translate:TranslateService) {  
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
      }
    });
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  ngOnInit(): void {
    let userInfo = this.sessionInfoSvc.getSesionInfo().data?.user_info;
    localStorage.setItem(SystemConfig.CURRENT_LANGUAGE, SystemConfig.LANG_RU);
    if (!this.userName && !this.name) {
      this.userName = userInfo?.username || '';
      this.name = userInfo?.name || '';
    }
  }

  hasAccess(item: any) {
    let vRoute: string = item.url;

    return true;
  }

  menuClicked(subMenu: any) {
  }

  onLogout() {
    this.logout.emit();
  }

  selectLanguage(value: string) {
    this.translate.use(value);
    localStorage.setItem(SystemConfig.CURRENT_LANGUAGE, value);
  }

  @Output() logout = new EventEmitter();
}
