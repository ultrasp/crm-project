import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom, Observable, tap, zip } from 'rxjs';
import { CrmAddCarOwnerIndividuals } from 'src/app/common/widgets/CrmAddCarOwnerIndividuals/CrmAddCarOwnerIndividuals';
import { CrmAddCarOwnerLegal } from 'src/app/common/widgets/CrmAddCarOwnerLegal/CrmAddCarOwnerLegal';
import { ISelectOption } from 'src/app/common/widgets/CrmSelect/CrmSelect';
import { CarCollection } from "../../../models/car-entity";
import { CarClientList } from "../../../../_shared/request/crm/CarClientList";
import { COFService } from "../../../../_service/COFService";
import { CarClientCollection } from "../../../models/car-client.entity";
import { CarClientListCollection } from "../../../models/car-client-list.entity";
import { CarClientType } from "../../../../common/enums/car_client_type";
import { ObjectOwnerType } from "src/app/common/enums/object-owner-type.enum";
import { BaseForm } from 'src/app/common/base.form/base-form';
import { AttributeSetupPanel } from 'src/app/common/widgets/AttributeSetupPanel/AttributeSetupPanel';
import { CrmAddressPanel } from 'src/app/common/widgets/CrmAddressPanel/CrmAddressPanel';
import { CrmAlertDialog } from 'src/app/common/widgets/CrmAlertDialog/CrmAlertDialog';
import { CrmAlertDialogTypeError } from 'src/app/common/enums/crm-alert-dialog.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'car-owner-yurik-add',
  templateUrl: './CarOwnerYurikAdd.html',
  styleUrls: ['./CarOwnerYurikAdd.css']
})
export class CarOwnerYurikAdd extends BaseForm implements OnInit {
  constructor(private translate: TranslateService, override cof: COFService,private router: Router) {super(cof) }

  private _owner_id: string = '';
  override form: FormGroup = new FormGroup({

    region: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    livePlace: new FormControl(),
    street: new FormControl('', []),
    note: new FormControl('', []),
    house: new FormControl('', []),
    korpus: new FormControl('', []),
    flat: new FormControl('', []),
    addrTypeId: new FormControl(0, []),
    cadas_id: new FormControl(),
  });
  @Input() set owner_id(value: string) {
    this._owner_id = value;
    this.getData();
  };
  get owner_id() {
    return this._owner_id;
  }

  ownerCompanyType: ObjectOwnerType = ObjectOwnerType.CAR_COMPANY;
  ownerClientType:ObjectOwnerType = ObjectOwnerType.CAR_CLIENT;

  ngOnInit() { }

  @ViewChild(CrmAddCarOwnerLegal) yurikPanel!: CrmAddCarOwnerLegal;
  @ViewChild(AttributeSetupPanel) attrPanel!: AttributeSetupPanel;
  @ViewChild(CrmAddressPanel) addressPanel!: CrmAddressPanel;

  prepareRequest() {
    return this.yurikPanel.saveClientRequest();
  }

  saveCompany(){
    let request = this.yurikPanel.prepareRequest();
    request.id = this._owner_id;
    return this.cof.doRequest(request);
  }
  
  override saveCallback(result: any): void {
    this._owner_id = result.data.id;
    setTimeout(() => {
      zip(this.saveCompany(),this.attrPanel.save(),this.addressPanel.save()).subscribe(res=>{
        CrmAlertDialog.show('GENERAL.DATA_SAVED', CrmAlertDialogTypeError.INFO);
        this.router.navigate(['/client/detail/', this._owner_id]);
      });
    }, 700);
  }
  
  clientFounded(){
    CrmAlertDialog.show(this.translate.instant('CAR.YURIK_ALREADY_SAVED'),CrmAlertDialogTypeError.ERROR);
  }
  
  async getData() {
    if (this.owner_id) {
      let clientRequest = new CarClientList();
      clientRequest.id = Number(this.owner_id);
      clientRequest.setCount(1);
      firstValueFrom(this.cof.doRequest(clientRequest).pipe(
        tap(
          res => {
            let data = <CarClientListCollection>res;
            if (data && data.total_elements > 0) {
              let car = data.data[0];
              this.form.patchValue({
                ownerType: String(car.sector),
              })
            }
          })));
    }
  }

}

