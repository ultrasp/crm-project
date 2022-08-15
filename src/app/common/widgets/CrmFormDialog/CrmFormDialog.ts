import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  InjectorInstance
} from 'src/app/app.module';
import {
  BaseForm
} from '../../base.form/base-form';
import {
  ContentContainerDirective
} from '../CrmDynamicTab/ContentContainerDirective';

@Component({
  selector: 'app-CrmFormDialog',
  templateUrl: './CrmFormDialog.html',
  styleUrls: ['./CrmFormDialog.css']
})
export class CrmFormDialog implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormDialogData, public dialogRef: MatDialogRef < CrmFormDialog > , ) {}

  ngOnInit() {
    this.loadComponent()
  }

  @ViewChild(ContentContainerDirective, {
    static: true
  })
  contentContainer!: ContentContainerDirective;
  component!: FormDialogComponent;

  loadComponent() {
    const viewContainerRef = this.contentContainer.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(this.data.component);
    this.component = < FormDialogComponent > componentRef.instance;
    ( < FormDialogComponent > this.component).setData(this.data.data)
    this.component.closeForm.subscribe( res =>{
      this.close(res);
    })
  }

  public static show(title: string | null, component: any, data: any = null):Observable<boolean> {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(CrmFormDialog, {
      data: {
        title: title,
        component: component,
        data: data
      }
    });

    return dialogRef.afterClosed();

  }

  save() {
    this.component.saveProcess();
  }

  close(isNeedRefresh : boolean = false) {
    this.dialogRef.close(isNeedRefresh);
  }
  ngOnDestroy() {
    this.contentContainer.viewContainerRef.clear();
  }
}

export interface FormDialogData {
  title: string,
    component: any,
    data: any
}

export interface FormDialogComponent {
  saveProcess(): void;
  setData(data:any):void;
  closeForm:Observable<any>;
}
