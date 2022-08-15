import {
  Injectable
} from "@angular/core";
import {
  Tab
} from "./TabModel";
import {
  BehaviorSubject
} from "rxjs";
@Injectable({providedIn:'root'})
export class TabService {

  // public tabs: Tab[] = [];
  refreshTabKeyList:string[] = [];
  private tabStorage:ITabStorageItem[] = []
  itemKeys:string[] =[]
  public $tabSub = new BehaviorSubject < Tab[] > ([]);

  public getKey() :number{
    return Date.now()
  }

  public removeTab(compKey:number,index: number) {
    let tabItem = this.getTabByKey(compKey);
    if(!tabItem)
    return
    tabItem.tabs.splice(index, 1);
    if (tabItem.tabs.length > 0) {
      tabItem.tabs[tabItem.tabs.length - 1].active = true;
    }
    this.$tabSub.next(tabItem.tabs);
  }

  getTabByKey(compKey:number){
    return  this.tabStorage.find(v => v.key == compKey);
  }

  public setTabs(compKey:number,tabs:Tab[],activeTabIndex= 0){
    let tabItem:ITabStorageItem = {
      key:compKey,
      tabs:[]
    };
    tabItem.tabs = tabs;
    if(tabItem.tabs.length > 0)
    tabItem.tabs[activeTabIndex].active =true;
    this.$tabSub.next(tabItem.tabs);
    this.tabStorage.push(tabItem);
  }

  public addTab(compKey:number,tab: Tab, makeActive = false) {
    let tabItem = this.getTabByKey(compKey);
    if(!tabItem)
    return 
    if(makeActive){
      for (let i = 0; i < tabItem.tabs.length; i++) {
        if (tabItem.tabs[i].active === true) {
          tabItem.tabs[i].active = false;
        }
      }
      tab.active = true;
    }
    tab.id = tabItem.tabs.length + 1;
    tabItem.tabs.push(tab);
    this.$tabSub.next(tabItem.tabs);
  }

  refreshTab(tab:Tab){
    tab.$refreshData.emit();
  }

  refreshTabByKey(compKey:number,key:string){
    let tabItem = this.getTabByKey(compKey);
    if(!tabItem)
    return 
    tabItem.tabs.find( v=> v.key == key)?.$refreshData.emit();
  }

  getActiveTab(compKey:number):Tab | undefined{
    let tabItem = this.getTabByKey(compKey);
    if(!tabItem)
    return 
    return tabItem.tabs.find( v=> v.active)
  }

  refreshActiveTab(compKey:number){
    this.getActiveTab(compKey)?.$refreshData.emit();
  }

  refreshAll(compKey:number){
    let tabItem = this.getTabByKey(compKey);
    if(!tabItem)
    return 

    this.refreshActiveTab(compKey);
    tabItem.tabs.filter(v => !v.active).forEach( v=> {this.refreshTabKeyList.push(v.key);})
  }

  activeTabChanged(compKey:number,index:number){
    let tabItem = this.getTabByKey(compKey);
    if(!tabItem)
    return 

    tabItem.tabs.filter(v => v.active).forEach( v=> v.active = false);
    let selectedTab:Tab = tabItem.tabs[index];
    // if(selectedTab){
      selectedTab.active = true;
      if(this.refreshTabKeyList.includes(selectedTab.key)){
        selectedTab?.$refreshData.emit();
        this.refreshTabKeyList.splice(this.refreshTabKeyList.findIndex( v => v == selectedTab.key),1);
      }
    // }

  }

  public clear(compKey:number){
    let tabItem = this.getTabByKey(compKey);
    if(!tabItem)
    return 

    tabItem.tabs = [];
    this.$tabSub.next(tabItem.tabs);
  }

  public remove(compKey:number) {
    let index = this.tabStorage.findIndex(v => v.key == compKey)
    this.tabStorage.slice(index,1)
  }
}

interface ITabStorageItem{
  key:number;
  tabs: Tab[]
}