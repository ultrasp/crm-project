import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { Router } from "@angular/router";
import {
  Observable
} from "rxjs";
import {
  InjectorInstance
} from "src/app/app.module";
import { SystemDefault } from "src/app/common/enums/system-defaults.enum";
import { IMipAddressConverted } from "src/app/main/models/mip-address.entity";
import {
  IConvertedMipData,
  MipData
} from "src/app/main/models/mip.entity";
import { DateUtil } from "src/app/_service/util/DateUtil";
import { StringUtil } from "src/app/_service/util/StringUtil";
import {
  DriverAddComponent
} from "./driver-add.component";

@Component({
  selector: 'app-driver-add-dialog',
  template: `<app-driver-add [isForeign]="isForeign" [driver_id]="id" (dataSaved)="closeDialog($event)"></app-driver-add>`
})
export class DriverAddDialog implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef < DriverAddDialog >,private router: Router ) {
      this.id = data.id;
      this.isForeign = data.isForeign;
  }

  public id!: string;
  public isForeign: boolean = false;

  @ViewChild(DriverAddComponent, {
    static: true
  }) driverAdd!: DriverAddComponent;

  ngOnInit(): void {
    this.driverAdd.form.patchValue({
      docType: SystemDefault.PASSPORT_DOC,
    })
    if (this.data.data instanceof Object)
      this.driverAdd.form.patchValue({

        first_name: this.data.data.name_latin,
        middle_name: this.data.data.patronym_latin,
        last_name: this.data.data.surname_latin,

        ufirst_name: this.data.data.name_engl,
        umiddle_name: this.data.data.patronym_latin,
        ulast_name: this.data.data.surname_engl,

        rfirst_name: StringUtil.toCyrilic(this.data.data.name_latin),
        rmiddle_name: StringUtil.toCyrilic(this.data.data.patronym_latin),
        rlast_name: StringUtil.toCyrilic(this.data.data.surname_latin),

        sex_id: this.data.data.sex,
        born_date: this.data.data.birth_date,
        citizenship_id: this.data.data.citizenship_id,
        pnfl: this.data.data.pinfl,
        seriya: this.data.data.document.substr(0, 2),
        nomer: this.data.data.document.substr(2),
        givenDate: this.data.data.date_begin_document,
        issueDate: this.data.data.date_end_document,
        givenBy: this.data.data.doc_giveplace_id,

        born_country_id:this.data.data.birth_country_id,
        born_place:this.data.data.birth_place,


      })
      if(this.data.address){
        this.driverAdd.form.patchValue({
          region: this.data.address.region,
          city: this.data.address.district,
          note: this.data.address.address,
          cadas_id: this.data.address.cadastre,

        })
      }

  }


  static openFromMip(data: IConvertedMipData, address: IMipAddressConverted): Observable < any > {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(DriverAddDialog, {
      data: { data, address },
      width: '90%',
      height: '90%',
    });
    return dialogRef.afterClosed();

  }

  static open(driverId: string, isForeign: boolean = false): Observable < any > {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(DriverAddDialog, {
      data: {
        id: driverId,
        isForeign: isForeign
      },
      width: '90%',
      height: '90%',
    });
    return dialogRef.afterClosed();

  }

  closeDialog(saveState:ISaveState){
    console.log(this.data.id ,saveState,'saveState');
    if(!this.data.id && saveState && saveState.isSaved){
      this.router.navigate(['/driver/detail/', saveState.driverId]);
      this.dialogRef.close(false)
    }else{
      this.dialogRef.close(saveState.isSaved)
    }
  }

}

export interface ISaveState{
  driverId:string;
  isSaved:boolean
}
