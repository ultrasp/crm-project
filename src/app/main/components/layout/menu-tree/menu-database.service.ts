import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MenuNode } from "./menu-node.model";
import { TREE_DATA } from "./tree-data.model";

@Injectable({ providedIn: 'root' })
export class MenuDatabase {
  dataChange = new BehaviorSubject<MenuNode[]>([]);

  get data(): MenuNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Parse the string to json object.
    const dataObject = JSON.parse(TREE_DATA);

    // Build the tree nodes from Json object. The result is a list of `MenuNode` with nested
    // menu node as children.
    const data = this.buildMenuTree(dataObject, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the menu structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `MenuNode`.
   */
  buildMenuTree(obj: any, level: number): MenuNode[] {
    return Object.keys(obj).reduce<MenuNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new MenuNode();
      node.caption = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildMenuTree(value, level + 1);
        } else {
          node.url = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}