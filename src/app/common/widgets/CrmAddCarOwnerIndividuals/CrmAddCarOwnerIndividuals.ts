import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  catchError,
  concat,
  concatMap,
  empty,
  filter, firstValueFrom,
  iif,
  map,
  mergeMap,
  Observable,
  of,
  pipe,
  switchMap,
  takeWhile,
  tap
} from 'rxjs';
import {
  CarClient,
  CarClientCollection
} from 'src/app/main/models/car-client.entity';
import {
  ICarPersonGet,
  ICarPersonGetReponse
} from 'src/app/main/models/car-person-get.entity';
import {ICarPersonSave} from 'src/app/main/models/car-person-save.entity';
import {
  IDriver,
  IDriverCollection
} from 'src/app/main/models/driver.entity';
import {
  IConvertedMipData,
  MipData
} from 'src/app/main/models/mip.entity';
import {
  COFService
} from 'src/app/_service/COFService';
import {
  CarClientSave
} from 'src/app/_shared/request/crm/CarClientSave';
import {
  CarPersonFind
} from 'src/app/_shared/request/crm/CarPersonFind';
import {
  CarPersonSave
} from 'src/app/_shared/request/crm/CarPersonSave';
import {
  DriverSearch
} from 'src/app/_shared/request/crm/DriverSearch';
import {
  Reference
} from 'src/app/_shared/request/crm/Reference';
import {
  CrmRefType
} from '../../enums/crm-ref-type.enum';
import {
  ObjectOwnerType
} from '../../enums/object-owner-type.enum';
import {SystemDefault} from '../../enums/system-defaults.enum';
import {CarClientType} from "../../enums/car_client_type";
import {CarCompanyList} from "../../../_shared/request/crm/CarCompanyList";
import {CarCompanyListCollection} from "../../../main/models/car-company-list.entity";
import {CarPersonList} from "../../../_shared/request/crm/CarPersonList";
import {ICarPersonList} from "../../../main/models/car-person-list.entity";
import { CrmPasportPanel } from '../CrmPasportPanel/CrmPasportPanel';
import { CrmAddressPanel } from '../CrmAddressPanel/CrmAddressPanel';
import { IMipAddressCollection, IMipAddressConverted } from 'src/app/main/models/mip-address.entity';
import { CrmPersonDataPasport } from '../CrmPersonDataPasport/CrmPersonDataPasport';

@Component({
  selector: 'car-owner-individuals',
  templateUrl: './CrmAddCarOwnerIndividuals.html',
  styleUrls: ['./CrmAddCarOwnerIndividuals.css']
})
export class CrmAddCarOwnerIndividuals implements OnInit, OnDestroy {

  constructor(private cof: COFService) {
  }

  ownerType = ObjectOwnerType.CAR_PERSON;

  @Input() parentForm!: FormGroup;
  @Input() set driverId(value: string) {
    this._driver_id = value;
    if(this._driver_id && !this.isNew) {
      this.getAndFillData();
    }
  };
  get driverId() {
    return this._driver_id;
  }
  @Input() fillFromLocal:boolean = true;
  @Input() isNew:boolean = false;
  @Output() clientFound:EventEmitter<boolean> = new EventEmitter();
  private _driver_id:string = '';
  @ViewChild(CrmPasportPanel) pasportPanel!: CrmPasportPanel;
  @ViewChild(CrmAddressPanel) adressPanel!: CrmAddressPanel;


  ngOnInit() {
    this.parentForm.addControl('fizikInfo', this.form);
    if(this.driverId && !this.isNew) {
      this.getAndFillData();
    }
  }

  ngOnDestroy(): void {
    this.parentForm.removeControl('fizikInfo');
  }

  form: FormGroup = new FormGroup({
    last_name: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    middlename: new FormControl('', [Validators.required]),
    sex_type: new FormControl('', [Validators.required]),
    birth_date: new FormControl('', [Validators.required]),
    docType: new FormControl('', [Validators.required]),
    seriya: new FormControl('', [Validators.required]),
    nomer: new FormControl('', [Validators.required]),
    givenDate: new FormControl('', [Validators.required]),
    issueDate: new FormControl('', [Validators.required]),
    givenBy: new FormControl('', [Validators.required]),
    born_country_id: new FormControl(null, [Validators.required]),
    born_region_id: new FormControl(),
    born_city_id:new FormControl(null, []),
    born_place:new FormControl(null, []),
    pnfl: new FormControl(null, [Validators.required]),

  });
  setRefType = (request: Reference): void => {
    request.setTypeId(CrmRefType.GENDER);
    return;
  }

  public pasportDocNo: string = '';


  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl != null && formControl!.status == 'INVALID' && formControl!.touched;
  }

  onSearch() {
    let request = new CarPersonFind();
    request.setCount(1);
    request.passport = this.pasportDocNo;
    this.cof.doRequest(request).pipe(
      switchMap(v => {
        if (v && (<ICarPersonGetReponse>v).status == 200) {
          return this.convertDataFromLocal((<ICarPersonGetReponse>v).data)
        }else {
          return of()
        }

      }),
      catchError( () =>{
        return this.openMipDialog();
      })
    )
      .subscribe(response => {
      },
      )
  }

  getAndFillData() {
    let request = new CarPersonList();
    request.id = this.driverId;
    request.setCount(1);
    firstValueFrom(this.cof.doRequest(request).pipe(
      tap(
        res => {
          let data = <ICarPersonList>res;
          if (data && data.total_elements > 0) {
            let person = data.data[0];
            this.form.patchValue({
              born_country_id: person.born_country_id,
              birth_date: person.born_date,
              born_region_id: person.born_region_id,
              name: person.first_name,
              last_name: person.last_name,
              middlename: person.middle_name,
              pnfl: person.pnfl,
              sex_type: person.sex_id,
            })
            this.pasportDocNo
          }
        })));
        this.pasportPanel.fillData().then(()=>{
          this.pasportDocNo =  this.form.get('seriya')?.value + this.form.get('nomer')?.value
        });
  }

  convertDataFromLocal(driver: ICarPersonGet) {
    if (driver.id) {
      this.parentForm.patchValue({
        client_id:driver.id
      })
      this._driver_id = driver.id;
      this.clientFound.emit(true);
    }
    if(this.fillFromLocal)
    this.fillDriverToForm(driver);
    return empty();
  }

  fillDriverToForm(driver: ICarPersonGet) {

    this.form.patchValue({
      last_name: driver.surname_latin,
      name: driver.name_latin,
      middlename: driver.patronym_latin,
      sex_type: driver.sex,
      birth_date: driver.birth_date,
      docType: SystemDefault.PASSPORT_DOC,
      seriya: driver.document.substring(0, 2),
      nomer: driver.document.substring(2),
      givenDate: driver.date_begin_document,
      issueDate: driver.date_end_document,
      givenBy: driver.doc_give_place,
      born_country_id: driver.birth_country_id,
      born_region_id: driver.birth_place_id,
      pnfl: driver.pnfl
    })
    if(driver.address){
      this.parentForm.patchValue({
        region:driver.address.region_id,
        city: driver.address.city_id,
        livePlace: driver.address.massiv_id,
        street: driver.address.street_id,
        note: driver.address.note,
        house: driver.address.house,
        korpus: driver.address.block,
        flat: driver.address.flat,
        cadas_id: driver.address.cadas_id,
      })
    }
    this.refreshDocNo();
  }

  openMipDialog() {
    return CrmPersonDataPasport.openDialog(this.pasportDocNo).pipe(
      takeWhile(response => (response)),
      tap((v) => {

        return this.convertMipData(v.data,v.address)}),
    )
  }

  convertMipData(data: IConvertedMipData, address: IMipAddressConverted) {

    this.form.patchValue({
      last_name: data.surname_latin,
      name: data.name_latin,
      middlename: data.patronym_latin,
      sex_type: data.sex,
      birth_date: data.birth_date,
      docType: SystemDefault.PASSPORT_DOC,
      seriya: data.document.substring(0, 2),
      nomer: data.document.substring(2),
      givenDate: data.date_begin_document,
      issueDate: data.date_end_document,
      givenBy: data.doc_give_place,
      born_country_id: data.birth_country_id,
      pnfl: data.pinfl
    })

    this.parentForm.patchValue({
      region: address.region,
      country: address.country,
      cadas_id: address.cadastre,
      city: address.district,
      note: address.address,
    })
    this.refreshDocNo();
  }

  refreshDocNo() {
    this.pasportDocNo = this.form.get('seriya')?.value + this.form.get('nomer')?.value
  }

  prepareRequest() {
    let request = new CarPersonSave();
    request.id = this.driverId;
    request.born_country_id = this.form.get('born_country_id')?.value;
    request.born_date = this.form.get('birth_date')?.value;
    request.born_region_id = this.form.get('born_region_id')?.value;
    request.citizenship_id = this.form.get('born_country_id')?.value; 
    request.first_name = this.form.get('name')?.value;
    request.last_name = this.form.get('last_name')?.value;
    request.middle_name = this.form.get('middlename')?.value;
    request.pnfl = this.form.get('pnfl')?.value;
    request.sex_id = this.form.get('sex_type')?.value;
    return request;
  }

  saveClientRequest(){
    let request = new CarClientSave();
    request.doc_id = this.form.get('pnfl')?.value ;
    request.name = this.form.get('name')?.value;
    request.sector = CarClientType.INDIVIDUAL;
    request.region_id = this.parentForm.get('region')?.value;
    return request;
  }

  saveClient(): Observable<CarClientCollection> {
    return <Observable<CarClientCollection>>this.cof.doRequest(this.saveClientRequest());
  }

  saveRequest(): Observable<string> {
    let $saveClient = this.driverId ? of(this.driverId) : this.saveClient().pipe(map((v: CarClientCollection) => this.driverId = v.data.id));
    let $savePerson = (<Observable<ICarPersonSave>>this.cof.doRequest(this.prepareRequest())).pipe(map(v => v.data.id));
    return $saveClient.pipe(switchMap(() => $savePerson));
  }
}
