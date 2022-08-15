import { Injectable } from "@angular/core";
import {AccessService} from "./access-service";
import { AttributeSetup } from "src/app/_shared/request/crm/AttributeSetup";
import { ObjectOwnerType } from "src/app/common/enums/object-owner-type.enum";
import { COFService } from "src/app/_service/COFService";
import { AttributeSetupCollection, AttributeSetupEntity } from "../../models/attribute-setup.entity";
import { AttributeParamConfig } from "src/app/common/widgets/AttributeSetupPanel/AttributeParam/AttributeParamConfig";
import { TranslateService } from "@ngx-translate/core";
import { ownerPanelSearchRequest } from "../employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import { EmployeeAttribute } from "src/app/_shared/request/crm/EmployeeAttribute";
import { DriverAttribute } from "src/app/_shared/request/crm/DriverAttribute";
import { CarAttribute } from "src/app/_shared/request/crm/CarAttribute";
import { CarPersonAttribute } from "src/app/_shared/request/crm/CarPersonAttribute";
import { CarCompanyAttribute } from "src/app/_shared/request/crm/CarCompanyAttribute";
import { IEmployeeAttribute, IEmployeeAttributeCollection } from "../../models/employee-attribute.entity";
import { delay, firstValueFrom, map, mapTo, Observable, of, pipe, switchMap, tap } from "rxjs";

@Injectable(
    { providedIn: 'root' }
)
export class AttributeInfoService {

    constructor(private cof: COFService, private accessService: AccessService,private translate: TranslateService) {
    }

    private chachedParams:Map<string,AttributeParamConfig[]> = new Map();
    // private savedList:Map<string,AttributeSetupCollection> = new Map();
    public loadingList:Map<string,boolean>= new Map();

    private getAttrTarget(ownerType:string) {
        let target;
        switch (ownerType) {
          case ObjectOwnerType.EMPLOYEE:
            target = OwnerKey.EMPLOYEE
            break;
          case ObjectOwnerType.DRIVER:
            target = OwnerKey.DRIVER
            break;
          case ObjectOwnerType.CAR:
            target = OwnerKey.CAR
            break;
          case ObjectOwnerType.CAR_PERSON:
            target = OwnerKey.CAR_PERSON
            break;
          case ObjectOwnerType.CAR_COMPANY:
            target = OwnerKey.CAR_COMPANY
            break;
          default:
            break;
        }
        return target;
      }

    public getAttrListWithVal(ownerId :string,ownerType:ObjectOwnerType,readMode:boolean = false, isRefresh:boolean = true) :Observable<AttributeParamConfig[]>{
      if(isRefresh)
        this.clear(ownerType)
      return this.getCachedItems(ownerType,readMode).pipe(
          switchMap(() => {
            let items:any[] = readMode ? [] : this.chachedParams.get(ownerType) || [];
            return items?.length > 0 ? of(items) : this.getValuesOfOwner(ownerId,ownerType).pipe(switchMap( res =>this.getAttrTargetList(res,ownerType,readMode)))
          } 
          )
        ) 
        
        
    }

    public clear(ownerType:ObjectOwnerType) {
      this.loadingList.delete(ownerType);
      this.chachedParams.delete(ownerType);
    }

    public getCachedItems(ownerType:ObjectOwnerType,readMode:boolean):Observable<AttributeParamConfig[]> {
      return this.loadingList.has(ownerType) && !readMode ? of([]).pipe(delay(2000)) : of(this.chachedParams.get(ownerType) || []).pipe(tap( () => this.loadingList.set(ownerType,true)));
    }

    private getAttrTargetList(itemValues:AttributeObjectValue[],ownerType:string,readMode:boolean):Observable<AttributeParamConfig[]>{
        let target = this.getAttrTarget(ownerType);
        let params: AttributeParamConfig[] = [];
        if (!target)
            return of(params);

        let request = new AttributeSetup();
        request.target = target;
        request.setCount(1000);

        return this.cof.doRequest(request).pipe(
            map(res =>{
                if (res) {
                    // this.savedList.set(ownerType, ( < AttributeSetupCollection > res));
        
                    let data = ( < AttributeSetupCollection > res).data;
                    data.forEach((item: AttributeSetupEntity) => {
                        let field_type = item.field_type;
                        if (item.field_type.substring(0, 4) == 'REF_') {
                            field_type = item.field_type.substring(0, 3);
                            item.default_value = item.field_type.substring(4);
                        }
                        if (item.field_type.substring(0, 8) == 'REFTREE_') {
                            field_type = item.field_type.substring(0, 7);
                            item.default_value = item.field_type.substring(8);
                        }
                        if (item.field_type.substring(0, 9) == 'MULTIREF_') {
                            field_type = item.field_type.substring(0, 8);
                            item.default_value = item.field_type.substring(9);
                        }
        
                        let p = new AttributeParamConfig(item.id, item.key, this.getLabel(target?.toString() + '',item.key,item.name) , field_type, this.getValue(itemValues,item.key), item.security_role, item.default_value, item.required,
                        readMode || item.readonly, item.order, item.is_field, item.group_name);
                        params.push(p);
                    });
        
                }
                if(!readMode)
                this.chachedParams.set(ownerType,params);
                return params;
            })
        )
       
    }

    private getLabel(target:string,key:string,serverDesc:string){
        let transKey = 'ATTRIBUTES.'+target.replace(/\./i, '_').toUpperCase() + "_"+ key.toUpperCase();
        let translate = this.translate.instant(transKey);
        return translate == transKey ? serverDesc : transKey; 
    }
    
    public  getValue(values:AttributeObjectValue[],key: string): string {
        let item = values.find(v => v.key == key);
        return (item !== undefined ? item.name : '');
    }

    public  getValuesOfOwner(ownerId:string,ownerType:string): Observable<AttributeObjectValue[]> {
        if (!ownerId || !this.getOwnerRequest(ownerType))
          return of([]);
        let request: ownerPanelSearchRequest = < ownerPanelSearchRequest > this.getOwnerRequest(ownerType);
        request.setOwnerId(ownerId);
        request.setCount(1000);
        let resValues:AttributeObjectValue[] = [];
        return this.cof.doRequest(request).pipe(map(response =>{
            if (response) {
                let values: IEmployeeAttribute[] = (<any>response).data;
                values.forEach(v => {
                  resValues.push(new AttributeObjectValue(v.id.toString(), v.key, v.value));
                })
              }
              return resValues;
      
        })
        )
    }
    
    private getOwnerRequest(ownerType:string): ownerPanelSearchRequest | undefined {
        let request;
        switch (ownerType) {
          case ObjectOwnerType.EMPLOYEE:
            request = new EmployeeAttribute
            break;
          case ObjectOwnerType.DRIVER:
            request = new DriverAttribute
            break;
          case ObjectOwnerType.CAR:
            request = new CarAttribute;
            break;
          case ObjectOwnerType.CAR_PERSON:
            request = new CarPersonAttribute;
            break;
          case ObjectOwnerType.CAR_COMPANY:
            request = new CarCompanyAttribute;
            break;
          default:
            break;
        }
        return request;
    }
    
}


enum OwnerKey {
    EMPLOYEE = 'crm.rf_employee',
    DRIVER = 'driver.driver',
    CAR = 'car.car',
    CAR_PERSON = 'car.person',
    CAR_COMPANY = 'car.company'
}
  
export class AttributeObjectValue {
    public id!: string;
    public key!: string;
    public name!: string;
    constructor(id: string, key: string, name: string) {
        this.id = id;
        this.key = key;
        this.name = name;
    }
}
