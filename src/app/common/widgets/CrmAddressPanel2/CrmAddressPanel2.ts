import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  FormGroup,
} from '@angular/forms';
import { COFService } from 'src/app/_service/COFService';
import { Address } from 'src/app/_shared/request/crm/Address';
import { AddressType } from '../../enums/address-type.enum';
import { AutocompleteTextbox } from '../AutocompleteTextbox/AutocompleteTextbox';
import { IAddress,IAddressCollection } from 'src/app/main/models/address-entity';
import { firstValueFrom, Observable } from 'rxjs';
import { EmployeeAddressSave } from 'src/app/_shared/request/crm/EmployeeAddressSave';
import { EmployeeAddress } from 'src/app/_shared/request/crm/EmployeeAddress';
import { IObjectAddressCollection } from 'src/app/main/models/object-address.entity';
import { DriverAddress } from 'src/app/_shared/request/crm/DriverAddress';
import { DriverAddressSave } from 'src/app/_shared/request/crm/DriverAddressSave';
import { ObjectOwnerType } from '../../enums/object-owner-type.enum';
import { CarAddressSave } from 'src/app/_shared/request/crm/CarAddressSave';
import { IAddressGetRequest, IAddressRequest } from 'src/app/_shared/abstract/interfaces/IAddressRequest';
import { CarAddressList } from 'src/app/_shared/request/crm/CarAddressList';
import { IRequest } from 'src/app/_shared/abstract/interfaces/IRequest';
import {CarClientAddressSave} from "../../../_shared/request/crm/CarClientAddressSave";
import {CarClientAddress} from "../../../_shared/request/crm/CarClientAddress";
import { Reference } from 'src/app/_shared/request/crm/Reference';
import { CrmRefType } from '../../enums/crm-ref-type.enum';

export class CrmAddress {}
@Component({
  selector: 'crm-address-panel-2',
  templateUrl: './CrmAddressPanel2.html',
  styleUrls: ['./CrmAddressPanel2.css'],
})
export class CrmAddressPanel2 implements OnInit {
  @Input() errorsHidden: boolean = true;
  @Input() form!: FormGroup;
  @Input() ownerId!:string;
  @Input() ownerType:ObjectOwnerType = ObjectOwnerType.EMPLOYEE;
  @Input() id!:string;
  @Input() inputsUIType?:string;

  @ViewChildren(AutocompleteTextbox)
  autocompleteTextboxes!: QueryList<AutocompleteTextbox>;

  objAddressText :any= {
    country: null,
    region: null,
    city:null,
    // livePlace:null,
    // street: null,
  };

  constructor(
    protected cofService: COFService,
  ) {
  }

  ngOnInit(): void {
    if( this.ownerId != null && this.ownerId != '' && (this.form.get('addrTypeId')?.value != null || this.id != '') )
     this.getAddressValues();

    this.form.get('region')!.valueChanges.subscribe(v=>{
      this.form.patchValue({
        city:null
      })
    })

  }
  reset() {
    this.form.reset();
  }

  toString(): string {
    var stringParts:any[] = [];

    return stringParts.reduce((prev, current) => prev + current);
  }

  preOrEmpty(pre: string, value: string | undefined): string {
    return value == null || value.trim() == '' ? '' : pre + value;
  }

  public get valid(): boolean {
    return (
      this.form.valid &&
      this.autocompleteTextboxes
        .map((c) => c.textMatches)
        .reduce((prev, current) => prev && current)
    );
  }

  loadText(key:string,typeId:string){
    let request =  new Address();
    request.setType(typeId);
    request.setCount(1);
    this.cofService.doRequest(request).subscribe((result:any) => {
      if(result){
        let data:IAddressCollection = <IAddressCollection>result.data;
        this.objAddressText[key] = data.data[0].name;
      }
    });

  }

  countryParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CITIZENSHIP);
    return;
  }
  setRegionParam = (request:Address):void =>{
    request.setType(AddressType.REGION);
  }

  setCityParam = (request: Address): void => {
    request.setType(AddressType.CITY);
    if (this.form.get('region')?.value !== undefined)
      request.setParentId((this.form.get('region')?.value) ? this.form.get('region')?.value : '-1');
    else
      request.setParentId('-1');
    return;
  }

  addAddresCity(request: Address){
    request.setCount(1000);
    if (this.form.get('city')?.value !== undefined)
      request.setParentId(this.form.get('city')?.value);
  }

  setLivePlaceParam = (request: Address, text:string): void => {
    request.setType(AddressType.LIVE_PLACE);
    this.addAddresCity(request)
    request.setName(text);
    return;
  }

  setStreetParam = (request: Address, text:string): void => {
    request.setType(AddressType.STREET);
    this.addAddresCity(request)
    request.setName(text);
    return;
  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl!.status == 'INVALID' && formControl!.touched;
  }

  getOwnerValueRequest(){
    let request:IAddressGetRequest  = new EmployeeAddress();
    switch (this.ownerType) {
      case ObjectOwnerType.EMPLOYEE:
        request = new EmployeeAddress();
        break;
      case ObjectOwnerType.DRIVER:
        request = new  DriverAddress();
        break;
      case ObjectOwnerType.CAR:
        request = new  CarAddressList();
        break;
      case ObjectOwnerType.CAR_CLIENT:
        request = new  CarClientAddress();
        break;
      default:
        break;
    }
    return request;
  }

  async getAddressValues(){
    let request = this.getOwnerValueRequest();

    if(this.id){
      request.setId(this.id);
    }else{
      request.type_id = this.form.get('addrTypeId')?.value;
    }
    request.setOwnerId(this.ownerId);
    request.setCount(1);
    let resp = await firstValueFrom(this.cofService.doRequest((<IRequest><unknown>request)));
    if(resp && (resp as any).data.length > 0){
      let address = (<IObjectAddressCollection>resp).data[0];
      this.id = address.id + '';

      this.form.patchValue({
        region: address.region_id,
        city: address.city_id,
        livePlace: address.naspunkt_name,
        street:address.street_id,
        note:address.note,
        house:address.house,
        korpus:address.block,
        country_id:address.country_id,
        flat:address.flat,
        addrTypeId:address.type_id,
        cadas_id: address.cadas_id,
        street_name:address.street_name,

      });
    }
  }

  prepareSaveRequest(){
    let request: DriverAddressSave | EmployeeAddressSave | CarAddressSave = new DriverAddressSave();
    switch (this.ownerType) {
      case ObjectOwnerType.EMPLOYEE:
        request = new EmployeeAddressSave(this.id ? false : true)
        break;
      case ObjectOwnerType.DRIVER:
        request = new DriverAddressSave();
        break;
      case ObjectOwnerType.CAR:
        request = new CarAddressSave();
        break;
      case ObjectOwnerType.CAR_CLIENT:
        request = new CarClientAddressSave();
        break;
    }
    if(this.id){
      request.setId(this.id);
    }
    request.setOwnerId(this.ownerId);
    request.address = this.getAddressText();
    request.region_id = this.form.get('region')?.value;
    request.city_id = this.form.get('city')?.value;
    request.flat = this.form.get('flat')?.value == "" ? 0 : this.form.get('flat')?.value ;
    request.house = this.form.get('house')?.value;
    request.naspunkt = this.form.get('livePlace')?.value;
    request.block = this.form.get('korpus')?.value;
    request.note = this.form.get('note')?.value;
    request.cadas_id = this.form.get('cadas_id')?.value;
    request.street_name = this.form.get('street_name')?.value;

    // if(this.form.get('street')?.value)
    //   request.street_id = this.form.get('street')?.value;
    request.setTypeId(this.form.get('addrTypeId')?.value);
    return request;
  }

  save():Observable<Object>{
    return this.cofService.doRequest(this.prepareSaveRequest());
  }

  getAddressText():string{
    let text = '';
    if(this.form.get('region')?.value)
      text += ' Обл. '+ this.objAddressText.region

    if(this.form.get('city')?.value)
      text += ', г. '+ this.objAddressText.city

    if(this.form.get('livePlace')?.value)
    text += ', МПН. '+ this.form.get('livePlace')?.value

    if(this.form.get('street_name')?.value)
    text += ', Ул. '+ this.form.get('street_name')?.value

    if(this.form.get('house')?.value)
    text += ', д. '+ this.form.get('house')?.value

    if(this.form.get('note')?.value)
    text += ', (адресс) '+ this.form.get('note')?.value

    if(this.form.get('korpus')?.value)
    text += ', корпус. '+ this.form.get('korpus')?.value

    if(this.form.get('flat')?.value)
    text += ', кв. '+ this.form.get('flat')?.value

    return text;
  }
}

export interface IAddressByCity{
  setCity(cityId:string | null):void;
}

export interface IAddressByRegion{
  setRegion(regionId:string | null):void;
}

