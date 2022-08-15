import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class BreadCrumbService {
    private items: BreadcrumbModel[] = [];
    private itemsStore$ = new BehaviorSubject<BreadcrumbModel[]>([]);

    constructor() { }
  
    getItems():Observable<BreadcrumbModel[]> {
        return this.itemsStore$;
    }

    setItems(items:BreadcrumbModel[]){
        this.items = [...items];
        this.itemsStore$.next(this.items)
    }
  }
  

export class BreadcrumbModel{
    constructor(public title:string,public url:string |null = null){}
}