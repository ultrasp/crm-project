import {
  Component,
  Inject,
  OnInit
} from "@angular/core";
import {
  MatDialog,
  MatDialogRef
} from "@angular/material/dialog";
import {
  MAT_DIALOG_DATA
} from '@angular/material/dialog'
import {
  InjectorInstance
} from "../../../app.module";
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  firstValueFrom
} from "rxjs";
import {
  COFService
} from "../../../_service/COFService";
import {
  MipInfo
} from "../../../_shared/request/crm/MipInfo";
import {
  CrmAlertDialog
} from "../CrmAlertDialog/CrmAlertDialog";
import {
  CrmAlertDialogTypeError
} from "../../enums/crm-alert-dialog.enum";
import {
  IConvertedMipData,
  MipData,
  MipDataCollection
} from "src/app/main/models/mip.entity";
import {
  SystemConfig
} from "../../enums/system-config.enum";
import {
  DateUtil
} from "src/app/_service/util/DateUtil";
import {
  MipAddressInfo
} from "src/app/_shared/request/crm/MipAddressInfo";
import {
  IMipAddressCollection,
  IMipAddressConverted
} from "src/app/main/models/mip-address.entity";

@Component({
  selector: 'crm-person-data-pnfl',
  templateUrl: './CrmPersonDataPnfl.html',
  styleUrls: ['./CrmPersonDataPnfl.css'],
})
export class CrmPersonDataPnfl implements OnInit {

  form: FormGroup = new FormGroup({
    pinfl: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
    docNo: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/[A-ZА-Я]{2}\d{7}/)]),
  });
  item: any = {
    data: null,
    address: null
  }

  addNewCitizenShow: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private cof: COFService,
    private dialogRef: MatDialogRef < CrmPersonDataPnfl > ) {
    this.form.reset({
      pinfl: data.pinfl,
      docNo: data.docNo,
    })
    this.addNewCitizenShow = data.addNewCitizen;
  }

  static openDialog(pinfl: string = '', docNo: string = '', addNewCitizen = false) {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(CrmPersonDataPnfl, {
      data: {
        pinfl: pinfl,
        docNo: docNo,
        addNewCitizen: addNewCitizen,
      },
      width: '50%',
      height: '270px',
    });
    return dialogRef.afterClosed();

  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl!.status == 'INVALID' && formControl!.touched;
  }

  addNewCitizen() {
    this.dialogRef.close(CloseValuesEvents.AddNewCitizen);
  }

  async submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    let request = new MipInfo();
    request.setPinfl(this.form.value.pinfl);
    request.setDocNo(this.form.value.docNo);
    let result = await firstValueFrom(this.cof.doRequest(request))

    // .then(result => {
      if (result && !!result) {
        let {
          data,
          error_code,
          message,
          status
        } = < MipDataCollection > result;
        // console.log(result,'result')
        if ((!error_code || error_code == SystemConfig.NO_ERROR) && status === 200) {
          data.pinfl = this.form.value.pinfl;
          let mip_data: IConvertedMipData = {
            birth_country: data.birth_country,
            birth_country_id: data.birth_country_id,
            birth_date: DateUtil.parseDateFromString(data.birth_date, 'YYYY-MM-DD'),
            birth_place: data.birth_place,
            birth_place_id: data.birth_place_id,
            citizenship: data.citizenship,
            citizenship_id: data.citizenship_id,
            date_begin_document: DateUtil.parseDateFromString(data.date_begin_document, 'YYYY-DD-MM'),
            date_end_document: DateUtil.parseDateFromString(data.date_end_document, 'YYYY-DD-MM'),
            doc_give_place: data.doc_give_place,
            doc_giveplace_id: data.doc_giveplace_id,
            document: data.document,
            livestatus: data.livestatus,
            name_engl: data.name_engl,
            name_latin: data.name_latin,
            nationality: data.nationality,
            nationality_id: data.nationality_id,
            patronym_latin: data.patronym_latin,
            sex: data.sex,
            surname_engl: data.surname_engl,
            surname_latin: data.surname_latin,
            pinfl: data.pinfl,
          }
          this.item.data = mip_data;
          // console.log(result,'result')
        } else {
          CrmAlertDialog.show(error_code, CrmAlertDialogTypeError.ERROR);
        }
      }

    // }).catch(err => {
    //   if (typeof err == "string" && err == 'Internal Server Error') {
    //     CrmAlertDialog.show('ERROR.SERVER_ERROR', CrmAlertDialogTypeError.ERROR);
    //   }
    //   if (err.error.code === 400)
    //     CrmAlertDialog.show('NOT FOUND', CrmAlertDialogTypeError.ERROR);
    // });


    let addressRequest = new MipAddressInfo()
    addressRequest.setPinfl(this.form.value.pinfl)
    result = await firstValueFrom(this.cof.doRequest(addressRequest)) //.then(result => {
      if (result && !!result) {
        let {
          data,
          error_code,
          message,
          status,
          ok
        } = < IMipAddressCollection > result;
        if ((!error_code || error_code == SystemConfig.NO_ERROR) && status === 200) {
          if(data.data.permanent_registration != null){
            let address_data: IMipAddressConverted = {
              address: data.data.permanent_registration.address,
              cadastre: data.data.permanent_registration.cadastre,
              country: data.data.permanent_registration.country.id,
              region: data.data.permanent_registration.region.id,
              district: data.data.permanent_registration.district.id,
            }
            this.item.address = address_data;
          }
          // this.dialogRef.close(this.item);

        }
      }
      this.dialogRef.close(this.item);
    // }).catch(err => {
    // }).finally(()=>{
    //     if(this.item.data){
    //       const dialog: MatDialog = InjectorInstance.get(MatDialog);
    //       dialog.closeAll();
    //       this.dialogRef.close(this.item);
    //     }
    // });


  }

  closeModal(): void {
    this.dialogRef.close()
  }

  ngOnInit(): void {}

}

export enum CloseValuesEvents {
  AddNewCitizen = 1,
}
