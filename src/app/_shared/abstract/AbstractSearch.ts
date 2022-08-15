import { IRequest } from "./interfaces/IRequest";

export abstract class AbstractSearch implements IRequest {

  private page: number = 0;

  private count: number = 0;

  sorts:ISortItem[] = [];

  public getPage() {
    return this.page;
  }

  public getCount() {
    return this.count;
  }

  public setPage(page: number) {
    this.page = page;
  }

  public setCount(count: number) {
    this.count = count;
  }
  

  public setSorts(items: ISortItem[]) {
    this.sorts = items;
  }

  public getURI(): string {
    throw new Error("Index Out of Bounds");
  }

}

export interface ISortItem{
  direction:string;
  field:string;
}