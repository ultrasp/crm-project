import { CdkPortalOutletAttachedRef, ComponentPortal, Portal } from "@angular/cdk/portal";
import {
  Component,
  ComponentRef,
  OnInit,
  ViewChild
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  COFService
} from "src/app/_service/COFService";
import { BreadcrumbModel, BreadCrumbService } from "../breadcrumb/BreadCrumbService";
import { DriverDetail } from "../driver/DriverDetail/DriverDetail";
import { DriverSearchPage } from "../driver/DriverSearchPage/DriverSearchPage";
import { eventItem, IMultiTabComponent } from "./IMultiTabComponent";

@Component({
  selector: 'crm-multi-tab',
  templateUrl: './MultiTab.html',
  styleUrls: ['./MultiTab.css']
})
export class MultiTab implements OnInit {

  constructor(private route:ActivatedRoute) {
  }

  portals:IPortalList[] = [];
  selectedIndex:number = 0;
  ngOnInit(): void {
    if(this.route.snapshot.data['initialComp'] != null){
      let newComp:any = this.getComponent(this.route.snapshot.data['initialComp'])
      this.portals.push({
        portal :new ComponentPortal(newComp),
        inputData:null
      })
  
    }
  }

  components:any[] = [] 
  data:any;


  itemAttached(ref: CdkPortalOutletAttachedRef, pData:IPortalList){
    ref = ref as ComponentRef<IMultiTabComponent>;
    let comp = <IMultiTabComponent>ref.instance;
    comp.isTab = true;

    if(pData.inputData){
      console.log(pData.inputData,'pData.inputData')
      Object.keys(pData.inputData).forEach((key:string) => {
        (<any>comp)[key] = pData.inputData[key];
      });
    }

    comp.openTabComponent?.subscribe((res:eventItem)=>{
      let newComp:any = this.getComponent(res.component)
      if(newComp){
        this.portals.push({
          portal :new ComponentPortal(newComp),
          inputData:res.inputData
        })
        console.log(this.selectedIndex,this.portals,this.portals.length)
        this.selectedIndex = this.portals.length - 1; 
      }
    })
  }

  getComponent(key:ComponentKeyNames){
    let comp ;
    switch (key) {
      case ComponentKeyNames.TDriverDetail:
        comp = DriverDetail
        break;
      case ComponentKeyNames.TDriverSearch:
        comp = DriverSearchPage
        break;
      default:
        break;
    }
    return comp
  }

  removeTabItem(index:number){
    this.portals.splice(index, 1);
  }

}
 
interface IPortalList{
  portal : ComponentPortal<IMultiTabComponent>,
  inputData:any
}

export enum ComponentKeyNames{
  TDriverSearch,
  TDriverDetail
}