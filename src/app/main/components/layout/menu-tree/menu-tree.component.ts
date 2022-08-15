
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Observable, of as observableOf } from 'rxjs';
import { MenuFlatNode } from './menu-flat-node.model';
import { MenuNode } from './menu-node.model';
import { MenuDatabase } from './menu-database.service';

@Component({
  selector: 'crm-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.css']
})
export class MenuTreeComponent {
  treeControl: FlatTreeControl<MenuFlatNode>;
  treeFlattener: MatTreeFlattener<MenuNode, MenuFlatNode>;
  dataSource: MatTreeFlatDataSource<MenuNode, MenuFlatNode>;

  constructor(database: MenuDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel, this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<MenuFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  hasChild = (_: number, _nodeData: MenuFlatNode) => _nodeData.expandable;

  transformer = (node: MenuNode, level: number) => {
    return new MenuFlatNode(!!node.children, node.caption, level, node.url);
  }

  private _getLevel = (node: MenuFlatNode) => node.level;

  private _isExpandable = (node: MenuFlatNode) => node.expandable;

  private _getChildren = (node: MenuNode): Observable<MenuNode[]> => observableOf(node.children);
}