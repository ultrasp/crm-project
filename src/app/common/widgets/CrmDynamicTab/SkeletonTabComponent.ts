import { EventEmitter } from "@angular/core";
import { BehaviorSubject, Observable, Observer } from "rxjs";

export interface SkeletonTabComponent {
  setData(data: any):void;
  isDynamicLoaded:boolean;
  refreshData?():void;
  initPanel?():void;
  btnClicked?: EventEmitter<any>;
}
