import {
  Component,
  Input,
  ComponentFactoryResolver,
  ViewChild,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter
} from "@angular/core";
import { Observable } from "rxjs";
import {
  ContentContainerDirective
} from "./ContentContainerDirective";
import {
  SkeletonTabComponent
} from "./SkeletonTabComponent";
import {
  Tab
} from "./TabModel";
//https://javascript.plainenglish.io/dynamic-tab-based-application-using-angular-material-9f9da7de5732
//https://stackblitz.com/run?file=src%2Fapp%2Fad-banner.component.ts
@Component({
  selector: "app-tab-content",
  template: "<ng-template content-container></ng-template>"
})
export class TabContentComponent implements OnInit,AfterViewInit {
  @Input() tab!: Tab;
  @Input() set isActive(val:boolean){
    if(val && this.component && typeof this.component.initPanel === 'function'){
      this.component.initPanel()
    }
  };
  @Output() btnClicked =  new EventEmitter(); 
  @ViewChild(ContentContainerDirective, {
    static: true
  })
  contentContainer!: ContentContainerDirective;
  constructor() {}
  component!:SkeletonTabComponent;
  ngOnInit(): void {
    this.loadComponent()
  }

  ngAfterViewInit(): void {
  }

  loadComponent(){
    const tab: Tab = this.tab;
    const viewContainerRef = this.contentContainer.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(tab.component);
    this.component = componentRef.instance;
    (this.component as SkeletonTabComponent).setData(tab.tabData);
    (this.component as SkeletonTabComponent).isDynamicLoaded = true;

    if((<SkeletonTabComponent>this.component).btnClicked){
      (<SkeletonTabComponent>this.component).btnClicked!.subscribe( (data) =>{
        this.btnClicked.emit(data);
      })
    }
    if(tab.active){
      setTimeout(()=>{(this.component).refreshData!();},100)
    }

    this.tab.$refreshData.subscribe(__=>{
      this.component.refreshData!();
    })

  }
}

