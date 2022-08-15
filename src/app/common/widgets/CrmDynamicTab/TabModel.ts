import {
  EventEmitter,
  Type
} from '@angular/core';
import { Observable } from 'rxjs';
export class Tab {
  public id!: number;
  public title: string;
  public tabData: any;
  public active: boolean = false;
  public component: Type < any > ;
  public $refreshData:EventEmitter<any> =  new EventEmitter();
  public key!:string;
  constructor(component: Type < any > , title: string, tabData: any, key:string = '') {
    this.tabData = tabData;
    this.component = component;
    this.title = title;
    this.key = key;
  }


}
