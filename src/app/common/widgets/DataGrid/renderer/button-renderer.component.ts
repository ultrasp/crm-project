import {
  Component
} from '@angular/core';
import {
  ICellRendererAngularComp
} from 'ag-grid-angular';

@Component({
  selector: 'ac-grid-button-renderer',
  template: `
  <crm-button  [icon]="params?.icon" [colorMode]="params?.colorMode || ''"  (onClick)="onClick($event)"></crm-button>
    `
})

export class AcGridButtonRenderer implements ICellRendererAngularComp {

  params?: IButtonParams;
 


  agInit(params: any): void {
    this.params = params;
  }

  refresh(params ? : any): boolean {
    return true;
  }

  onClick($event: any) {
    if (this.params && this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }
}

export interface IButtonParams{
  label? : string;
  icon? : string;
  colorMode?:string;
  onClick?:Function;
  node?:any;
}