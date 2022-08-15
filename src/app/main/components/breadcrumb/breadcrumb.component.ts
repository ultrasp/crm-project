import {
  Component
} from "@angular/core";
import {
  BreadcrumbModel,
  BreadCrumbService
} from "./BreadCrumbService";


@Component({
  selector: 'breadcrumb',
  templateUrl: 'breadcrumb.component.html',
  styleUrls: ['breadcrumb.component.css']
})
export class Breadcrumb {
  constructor(private service: BreadCrumbService) {

  }
  items: BreadcrumbModel[] = [];

  ngOnInit(): void {
    this.getBreadCrumbs();
  }

  getBreadCrumbs(): void {
    this.service.getItems()
      .subscribe(items => {
          this.items = items
        });
  }

  changeTheme(mode: any){
    let bodyElement = document.querySelector('body');
    if(mode == 'dark'){
      if(bodyElement){
        bodyElement ? bodyElement.classList ? bodyElement.classList.add('dark') : console.log('error body class does not exist') : console.log('error body does not exist') 
      }
    }else{
      if(bodyElement){
        bodyElement ? bodyElement.classList ? bodyElement.classList.remove('dark') : console.log('error body class does not exist') : console.log('error body does not exist') 
      }
    }
  }

}
