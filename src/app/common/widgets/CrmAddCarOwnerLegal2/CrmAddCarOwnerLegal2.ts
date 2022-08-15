import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  empty, firstValueFrom,
  map,
  Observable,
  of,
  switchMap,
  tap
} from 'rxjs';
import {CarClientCollection} from 'src/app/main/models/car-client.entity';
import {ICarPersonSave} from 'src/app/main/models/car-person-save.entity';
import {
  IDriver,
  IDriverCollection
} from 'src/app/main/models/driver.entity';
import {
  JuridicMIPData, JuridicMIPDataResponse
} from 'src/app/main/models/juridic-mip.entity';
import {
  COFService
} from 'src/app/_service/COFService';
import {CarClientSave} from 'src/app/_shared/request/crm/CarClientSave';
import {CarCompanySave} from 'src/app/_shared/request/crm/CarCompanySave';
import {
  DriverSearch
} from 'src/app/_shared/request/crm/DriverSearch';
import {
  JuridicMipInfo
} from 'src/app/_shared/request/crm/JuridicMipInfo';
import {
  Reference
} from 'src/app/_shared/request/crm/Reference';
import {
  CrmRefType
} from '../../enums/crm-ref-type.enum';
import {CarClientType} from "../../enums/car_client_type";
import {CarCompanyList} from "../../../_shared/request/crm/CarCompanyList";
import {CarClientListCollection} from "../../../main/models/car-client-list.entity";
import {CarCompanyListCollection} from "../../../main/models/car-company-list.entity";
import { CarCompanyFind } from 'src/app/_shared/request/crm/CarCompanyFind';
import { ICarCompanyGet, ICarCompanyGetCollection } from 'src/app/main/models/car-company-get.entity';
import {CompanyListForm} from "../../../main/components/car/forms/CompanyListForm/CompanyListForm";

@Component({
  selector: 'crm-add-car-owner-legal-2',
  templateUrl: './CrmAddCarOwnerLegal2.html',
  styleUrls: ['./CrmAddCarOwnerLegal2.css']
})
export class CrmAddCarOwnerLegal2 implements OnInit, OnDestroy {

  constructor(private cof: COFService) {
  }

  ngOnInit() {
    this.parentForm.addControl('yurikInfo', this.form);
    if(this.driverId) {
      this.getAndFillData();
    }
  }

  ngOnDestroy(): void {
    this.parentForm.removeControl('yurikInfo');
  }

  @Input() parentForm!: FormGroup;
  @Input() driverId!: string;
  @Output() clientFound:EventEmitter<boolean> = new EventEmitter();

  form: FormGroup = new FormGroup({
    stir: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    type: new FormControl('', [Validators.required]),
    organization: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    garage: new FormControl()
  });

  setRefType = (request: Reference): void => {
    request.setTypeId(CrmRefType.COMPANY_LEVEL_TYPE);
    return;
  }


  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl != null && formControl!.status == 'INVALID' && formControl!.touched;
  }

  onSearch() {
    let request = new CarCompanyFind();
    request.setCount(100000);
    request.inn = this.form.get('stir')?.value;
    this.cof.doRequest(request).pipe(
      switchMap(v => {
        let data = <ICarCompanyGetCollection>v;
        if (data && data.total_elements > 0) {
          if(data.total_elements == 1) {
            return this.convertDataFromLocal((<ICarCompanyGetCollection>v).data[0])
          }
          else {
            CompanyListForm.show(request).subscribe(res => {
              if(res) {
                this.convertDataFromLocal(res);
              }
            })
            return of('')
          }
        } else {
          return this.getFromMip();
        }
      })
    )
      .subscribe(response => {
      })
  }

  convertDataFromLocal(company: ICarCompanyGet) {
    this.driverId = company.company.id
    this.parentForm.patchValue({
      client_id:this.driverId
    })
    this.form.patchValue({
      garage: company.company.garaj,
      organization: company.company.name,
      stir: company.company.tax_id,
      type: company.company.type_id,
    })
    this.clientFound.emit(true);
    return empty();
  }

  getFromMip() {
    let request = new JuridicMipInfo();
    request.setInn(this.form.value.stir);
    return this.cof.doRequest(request)
      .pipe(
        tap(result => {
          if (result && !!result && (<JuridicMIPDataResponse>result).data) {
            let data = <JuridicMIPDataResponse>result;
            this.form.patchValue({
              // type: data.okpo,
              organization: data.data.name_full,
              // garage: ''
            })
          }
        })
      )
  }

  getAndFillData() {
    let request = new CarCompanyList();
    request.id = this.driverId;
    request.setCount(1);
    firstValueFrom(this.cof.doRequest(request).pipe(
      tap(
        res => {
          let data = <CarCompanyListCollection>res;
          if (data && data.total_elements > 0) {
            let company = data.data[0];
            this.form.patchValue({
              garage: company.garaj,
              organization: company.name,
              stir: company.tax_id,
              type: company.type_id,
            })
          }
        })));
  }


  prepareRequest() {
    let request = new CarCompanySave();
    request.id = this.driverId;
    request.garaj = this.form.get('garage')?.value;
    request.name = this.form.get('organization')?.value;
    request.tax_id = this.form.get('stir')?.value;
    request.type_id = this.form.get('type')?.value;
    return request;
  }

  saveClientRequest(){
    let request = new CarClientSave();
    request.doc_id = this.form.get('stir')?.value;
    request.name = this.form.get('organization')?.value;
    request.sector = CarClientType.LEGAL;
    request.region_id = this.parentForm.get('region')?.value;
    return request
  }

  saveClient(): Observable<CarClientCollection> {
    return <Observable<CarClientCollection>>this.cof.doRequest(this.saveClientRequest());
  }

  saveCompany() {
    return this.cof.doRequest(this.prepareRequest()).pipe(map(v => (<any>v).data.id));
  }

  saveAndGetClientId() {
    return this.driverId ? of(this.driverId) : this.saveClient().pipe(map((v: CarClientCollection) => this.driverId = v.data.id));
  }

  saveRequest(): Observable<string> {
    return this.saveAndGetClientId().pipe(switchMap(() => this.saveCompany()));
  }

}
