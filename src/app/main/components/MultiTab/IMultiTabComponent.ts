import { EventEmitter } from "@angular/core"
import { ComponentKeyNames } from "./MultiTab";

export interface IMultiTabComponent{
    isTab:boolean
    openTabComponent?:EventEmitter<eventItem>;
}

export interface eventItem{
    component:ComponentKeyNames,
    inputData:any
}