import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckRequestService {
  private value: number = 0;
  private itemsStore$ = new BehaviorSubject<number>(0);

  constructor() {
  }

  getStatus(): Observable<number> {
    return this.itemsStore$;
  }

  increment() {
    this.value ++;
    this.itemsStore$.next(this.value);
  }
  decrement() {
    this.value --;
    this.itemsStore$.next(this.value);
  }

}

