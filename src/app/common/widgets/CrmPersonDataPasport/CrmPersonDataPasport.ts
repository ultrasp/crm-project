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
  GspResponse
} from "src/app/main/models/gsp.entity";
import { GspInfo } from "src/app/_shared/request/crm/GspInfo";
import { CloseValuesEvents } from "../CrmPersonDataPnfl/CrmPersonDataPnfl";
import { MipAddressInfo } from "src/app/_shared/request/crm/MipAddressInfo";
import { IMipAddressCollection, IMipAddressConverted } from "src/app/main/models/mip-address.entity";

@Component({
  selector: 'crm-person-data-pasport',
  templateUrl: './CrmPersonDataPasport.html',
  styleUrls: ['./CrmPersonDataPasport.css'],
})
export class CrmPersonDataPasport implements OnInit {

  form: FormGroup = new FormGroup({
    docNo: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/[A-ZА-Я]{2}\d{7}/)]),
  });
  item: any = {
    data: null,
    address: null
  }

  addNewCitizenShow: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private cof: COFService,
    private dialogRef: MatDialogRef < CrmPersonDataPasport > ) {
    this.form.reset({
      docNo: data.docNo,
    })
    this.addNewCitizenShow = data.addNewCitizen;
  }

  static openDialog(docNo: string = '', addNewCitizen = false) {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(CrmPersonDataPasport, {
      data: {
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
    let docNo:string = this.form.value.docNo;
    let request = new GspInfo(docNo.substring(0,2),docNo.substring(2));
    let result = await firstValueFrom(this.cof.doGetRequest(request))

    // .then(result => {
      if (result && !!result) {
        let {
          data,
          error_code,
          message,
          status
        } = < GspResponse > result;
        // console.log(result,'result')
        if ((!error_code || error_code == SystemConfig.NO_ERROR) && status === 200) {
          let item = data[0];
          console.log(item,'item')
          // data.pinfl = this.form.value.pinfl;
          let mip_data: IConvertedMipData = {
            birth_country: item.birth_country,
            birth_country_id: item.birth_country_id,
            birth_date: DateUtil.parseDateFromString(item.birth_date, 'YYYY-MM-DD'),
            birth_place: item.birth_place,
            birth_place_id: item.birth_place_id,
            citizenship: item.citizenship,
            citizenship_id: item.citizenship_id,
            date_begin_document: DateUtil.parseDateFromString(item.date_begin_document, 'YYYY-MM-DD'),
            date_end_document: DateUtil.parseDateFromString(item.date_end_document, 'YYYY-MM-DD'),
            doc_give_place: item.doc_give_place,
            doc_giveplace_id: item.doc_giveplace_id,
            document: item.document,
            livestatus: item.livestatus,
            name_engl: item.name_engl,
            name_latin: item.name_latin,
            nationality: item.nationality,
            nationality_id: item.nationality_id,
            patronym_latin: item.patronym_latin,
            sex: item.sex,
            surname_engl: item.surname_engl,
            surname_latin: item.surname_latin,
            pinfl: item.pnfl,
          }
          this.item.data = mip_data;
          console.log(this.item.data,'this.item.data')
        } else {
          CrmAlertDialog.show(error_code, CrmAlertDialogTypeError.ERROR);
        }
      }

      console.log(this.item.data.pinfl,'this.item.data.pnfl')
      if(this.item.data.pinfl){
        let addressRequest = new MipAddressInfo()
        addressRequest.setPinfl(this.item.data.pinfl)
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
      }
      
      this.dialogRef.close(this.item);


  }

  closeModal(): void {
    this.dialogRef.close()
  }

  ngOnInit(): void {
    if(this.data.docNo){
      this.submit();
    }
  }

}

