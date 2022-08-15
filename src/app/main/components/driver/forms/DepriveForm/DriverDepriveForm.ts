import {BaseForm} from "../../../../../common/base.form/base-form";
import {Component, Inject, OnInit} from "@angular/core";
import {COFService} from "../../../../../_service/COFService";
import {Reference} from "../../../../../_shared/request/crm/Reference";
import {CrmRefType} from "../../../../../common/enums/crm-ref-type.enum";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {InjectorInstance} from "../../../../../app.module";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DriverCertificateDeprivation} from "../../../../../_shared/request/crm/DriverCertificateDeprivation";
import { DriverCertificateActivation } from "src/app/_shared/request/crm/DriverCertificateActivation";
import { DriverCertificateLast } from "src/app/_shared/request/crm/DriverCertificateLast";
import { firstValueFrom } from "rxjs";
import { ICertificateLastData } from "src/app/main/models/certificate-last.entity";

@Component({
  selector: 'app-driver-deprive-form',
  templateUrl: 'DriverDepriveForm.html',
  styleUrls: ['DriverDepriveForm.css'],
})
export class DriverDepriveForm extends BaseForm implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, override cof: COFService,
              private dialogRef: MatDialogRef<DriverDepriveForm>) {
    super(cof);
  }

  override form: FormGroup = new FormGroup({
    note: new FormControl(null, [Validators.required]),
    block_type_id: new FormControl(null, [Validators.required]),
    block_start: new FormControl(null, [Validators.required]),
    block_end: new FormControl(null, [Validators.required]),
  })

  depriveRequest(request: Reference) {
    request.setTypeId(CrmRefType.DRIVER_DEPRIVE_TYPE);
  }

  static show(driverId: string,isDeprive = true) {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(this, {
      data: {
        driverId: driverId,
        isDeprive:isDeprive
      }
    });
    return dialogRef.afterClosed();
  }

  ngOnInit(): void {
    this.setActiveInfo()
  }

  async setActiveInfo(){
    if(!this.data.isDeprive){
      let request = new DriverCertificateLast();
      request.driver_id  = this.data.driverId;
      request.setCount(1);
      let result: any = await firstValueFrom(this.cof.doRequest(request));
      if(result && result.data) {
        let data: ICertificateLastData = result;
        if(data) {
          let cert = data.data;
          this.form.patchValue({
            note:  cert.note,
      // block_type_id: cert.state_id,
      block_start:cert.block_start ,
      block_end:cert.block_end
          })
  
        }
      }
    }

  }

  override afterSave() {
    this.dialogRef.close(true);
  }

  save() {
    this.saveProcess();
  }

  prepareRequest(): any {
    let request = this.data.isDeprive ? new DriverCertificateDeprivation() : new DriverCertificateActivation();
    request.note = this.form.get('note')?.value;
    request.driver_id = this.data.driverId;
    request.block_type_id = this.form.get('block_type_id')?.value;
    request.block_end = this.form.get('block_end')?.value;
    request.block_start = this.form.get('block_start')?.value;
    return request;
  }

}
