import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {firstValueFrom, Observable, tap} from 'rxjs';
import { CrmAddCarOwnerIndividuals } from 'src/app/common/widgets/CrmAddCarOwnerIndividuals/CrmAddCarOwnerIndividuals';
import { CrmAddCarOwnerLegal } from 'src/app/common/widgets/CrmAddCarOwnerLegal/CrmAddCarOwnerLegal';
import { ISelectOption } from 'src/app/common/widgets/CrmSelect/CrmSelect';
import {CarCollection} from "../../../../models/car-entity";
import {CarClientList} from "../../../../../_shared/request/crm/CarClientList";
import {COFService} from "../../../../../_service/COFService";
import {CarClientCollection} from "../../../../models/car-client.entity";
import {CarClientListCollection} from "../../../../models/car-client-list.entity";
import {CarClientType} from "../../../../../common/enums/car_client_type";

@Component({
  selector: 'car-owner-information',
  templateUrl: './CarOwnerInformation.html',
  styleUrls: ['./CarOwnerInformation.css']
})
export class CarOwnerInformation implements OnInit {

  constructor(private translate:TranslateService, private cof: COFService) { }

  private _owner_id: string = '';
  @Input() form!:FormGroup;
  @Input() set owner_id(value: string) {
    this._owner_id = value;
    this.getData();
  };
  get owner_id() {
    return this._owner_id;
  }
  ngOnInit() {

  }
  @ViewChild(CrmAddCarOwnerIndividuals,{static:false}) fizikPanel!:CrmAddCarOwnerIndividuals;
  @ViewChild(CrmAddCarOwnerLegal,{static:false}) yurikPanel!:CrmAddCarOwnerLegal;

  ownerTypes:ISelectOption[] = [
    {
      key: String(CarClientType.INDIVIDUAL),
      title:this.translate.instant('GENERAL.FIZIK')
    },
    {
      key: String(CarClientType.LEGAL),
      title:this.translate.instant('GENERAL.YURIK')
    }
  ];

  isFizik():boolean{
    return this.form.get('ownerType')?.value == CarClientType.INDIVIDUAL;
  }

  isYurik():boolean{
    return this.form.get('ownerType')?.value == CarClientType.LEGAL;
  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl!.status == 'INVALID' && formControl!.touched;
  }

  save():Observable<string>{
    return this.form.get('ownerType')?.value == CarClientType.INDIVIDUAL ? this.fizikPanel.saveRequest() : this.yurikPanel.saveRequest();
  }

  async getData() {
    if(this.owner_id) {
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

