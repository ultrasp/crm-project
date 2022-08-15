import {Component, Inject, OnInit} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import {InjectorInstance} from "../../../app.module";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {firstValueFrom} from "rxjs";
import {COFService} from "../../../_service/COFService";
import { JuridicMipInfo } from "../../../_shared/request/crm/JuridicMipInfo";
import {CrmAlertDialog} from "../CrmAlertDialog/CrmAlertDialog";
import {CrmAlertDialogTypeError} from "../../enums/crm-alert-dialog.enum";
import { MipData } from "src/app/main/models/mip.entity";
import { JuridicMIPData } from "src/app/main/models/juridic-mip.entity";

@Component({
  selector: 'crm-juridical-data',
  templateUrl: './CrmJuridicalData.html',
  styleUrls: ['./CrmJuridicalData.css'],
})
export class CrmJuridicalData implements OnInit {

  form: FormGroup = new FormGroup({
    inn: new FormControl('', Validators.required),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private cof: COFService,
              private dialogRef: MatDialogRef<CrmJuridicalData>) {

  }

  static openDialog() {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(CrmJuridicalData, {
      data: {},
      width: '50%',
      height: '300px',
    });
    return dialogRef.afterClosed();

  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl!.status == 'INVALID' && formControl!.touched;
  }

  async submit() {
    this.form.markAllAsTouched();
    if(!this.form.valid){
      return;
    }
    let request = new JuridicMipInfo();
    request.setInn(this.form.value.inn);
    firstValueFrom(this.cof.doRequest(request)).then(result => {
      if (result && !!result) {
        let data = <JuridicMIPData> result;
        this.dialogRef.close(data);
      }
    }).catch(err => {
      if(err.error.code === 400)
        CrmAlertDialog.show('GENERAL.NOT_FOUND', CrmAlertDialogTypeError.ERROR);
    });


  }

  ngOnInit(): void {
  }

}
