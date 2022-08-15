import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  forwardRef,
  ViewChildren,
  QueryList,
  OnDestroy
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  BehaviorSubject,
  firstValueFrom,
  Observable,
  of
} from 'rxjs';
import {
  ownerPanelSearchRequest
} from 'src/app/main/components/employee/EmployeeTemplatePanel/EmployeeTemplatePanel';
import { AttributeInfoService } from 'src/app/main/components/services/attribute-info.service';
import {
  SessionInfoService
} from 'src/app/main/components/services/session-info.service';
import {
  AttributeSetupCollection,
  AttributeSetupEntity
} from 'src/app/main/models/attribute-setup.entity';
import {
  IEmployeeAttribute,
  IEmployeeAttributeCollection
} from 'src/app/main/models/employee-attribute.entity';
import {
  COFService
} from 'src/app/_service/COFService';
import {
  StringUtil
} from 'src/app/_service/util/StringUtil';
import {
  AbstractSearch
} from 'src/app/_shared/abstract/AbstractSearch';
import {
  IRequest
} from 'src/app/_shared/abstract/interfaces/IRequest';
import {
  AttributeSetup
} from 'src/app/_shared/request/crm/AttributeSetup';
import {
  CarAttribute
} from 'src/app/_shared/request/crm/CarAttribute';
import {
  CarAttributeSave
} from 'src/app/_shared/request/crm/CarAttributeSave';
import {
  CarCompanyAttribute
} from 'src/app/_shared/request/crm/CarCompanyAttribute';
import {
  CarCompanyAttributeSave
} from 'src/app/_shared/request/crm/CarCompanyAttributeSave';
import {
  CarPersonAttribute
} from 'src/app/_shared/request/crm/CarPersonAttribute';
import {
  CarPersonAttributeSave
} from 'src/app/_shared/request/crm/CarPersonAttributeSave';
import {
  DriverAttribute
} from 'src/app/_shared/request/crm/DriverAttribute';
import {
  DriverAttributeSave
} from 'src/app/_shared/request/crm/DriverAttributeSave';
import {
  EmployeeAttribute
} from 'src/app/_shared/request/crm/EmployeeAttribute';
import {
  EmployeeAttributeSave
} from 'src/app/_shared/request/crm/EmployeeAttributeSave';
import {
  ObjectOwnerType
} from '../../enums/object-owner-type.enum';
import {
  SkeletonTabComponent
} from '../CrmDynamicTab/SkeletonTabComponent';
import {
  AttributeParam
} from './AttributeParam/AttributeParam';
import {
  AttributeParamConfig
} from './AttributeParam/AttributeParamConfig';

@Component({
  selector: 'crm-attribute-setup-panel',
  templateUrl: './AttributeSetupPanel.html',
  styleUrls: ['./AttributeSetupPanel.css'],
})
export class AttributeSetupPanel implements OnInit, OnDestroy {

  ngOnInit(): void {
    this.getAttrList();
    
  }
  constructor(private cof: COFService, private translate: TranslateService,private attributeService: AttributeInfoService) {}

  @Input() readMode: boolean = false;
  @Input() addSaveButton: boolean = false;
  @ViewChildren(AttributeParam) paramComponents!: QueryList < AttributeParam > ;
  // @Input() values: AttributeObjectValue[] = [];
  @Input() attrClass: string = 'element-4';
  @Output() onSave: EventEmitter < any > = new EventEmitter();

  @Input() ownerId!: string;
  @Input() ownerType: ObjectOwnerType = ObjectOwnerType.EMPLOYEE;
  @Input() parentForm!:FormGroup;

  public isDynamicLoaded: boolean = false;

  private listenFormChanges(){
    if(this.parentForm){
      this.parentForm.controls[AttrFormKey.FormKey].valueChanges.subscribe(formFields=>{
        Object.entries(formFields).forEach(entry => {
          const [formKey, formValue] = entry;
          this.paramComponents.filter(item => item.getParamName() == formKey).map(item => item.setValue(formValue == null ? '' : formValue + ''));
        });
      })
    }
  }

  async getAttrList() {
    let allParams = await firstValueFrom(this.attributeService.getAttrListWithVal(this.ownerId,this.ownerType,this.readMode));
    this.params = this.readMode ? allParams : allParams.filter(v => !v.isField);
    this.params.forEach(v=>{
      let findIndex  = this.groups.findIndex( gr => gr.key == ( v.groupName || 'general').toUpperCase() )
      if(findIndex == -1){
        this.groups.push(
          {
            key: (v.groupName || 'general').toUpperCase(),
            children: [v]
          }
        );
      }else{
        this.groups[findIndex].children.push(v);
      }
  })
    if(this.params.length > 0 ){

      if(this.parentForm){
        console.log('inf');
        let  inForm:FormGroup = new FormGroup({});
        this.params.forEach(param => inForm.addControl(param.name,new FormControl(param.defValue))) 
          this.parentForm.addControl(AttrFormKey.FormKey, inForm);
        this.listenFormChanges();
      }
    }
  }

  ngOnDestroy(): void {
    this.attributeService.clear(this.ownerType)
  }

  params: AttributeParamConfig[] = [];
  groups: AttributeGroup[] = [];

  isEmptyValue(comp: AttributeParam) {
    return StringUtil.emptyString(comp.getValue()) || comp.getValue() == null
  }

  isValid() {
    return this.paramComponents.toArray().filter(v => v.param.isRequiredField).reduce((val, comp) => {
      if (this.isEmptyValue(comp)) comp.setShowError(true)
      else comp.setShowError(false)
      return val && !this.isEmptyValue(comp)
    }, true);
  }

  onSaveClick() {
    this.onSave.emit();
  }

  reset() {
    this.paramComponents.forEach(item => item.setValue(''));
  }

  private getOwnerSaveRequest(): saveAttributesRequest | undefined {
    let request;
    switch (this.ownerType) {
      case ObjectOwnerType.EMPLOYEE:
        request = new EmployeeAttributeSave
        break;
      case ObjectOwnerType.DRIVER:
        request = new DriverAttributeSave
        break;
      case ObjectOwnerType.CAR:
        request = new CarAttributeSave;
        break;
      case ObjectOwnerType.CAR_PERSON:
        request = new CarPersonAttributeSave;
        break;
      case ObjectOwnerType.CAR_COMPANY:
        request = new CarCompanyAttributeSave;
        break;

      default:
        break;
    }
    return request;
  }
  prepareSaveRequest(): saveAttributesRequest {
    let request = < saveAttributesRequest > this.getOwnerSaveRequest();
    request.setOwnerId(this.ownerId);

    let components = this.paramComponents.toArray();
    request.attributes = [];
    for (let i: number = 0; i < this.params.length; i++) {
      let par: string = components[i].getValue();
      if (StringUtil.emptyString(par) || par == null)
        continue;
      let item: ObjectAttributeItem = new ObjectAttributeItem();
      item.key = components[i].getParamName();
      item.value = par;
      request.attributes.push(item);

    }

    return request;
  }

  setParentValues(){
    if(this.parentForm){
      let fields:any = {};
      this.paramComponents.forEach(item => 
        fields[item.getParamName()] = item.getValue()
      )
      this.parentForm.patchValue({
        [AttrFormKey.FormKey]:fields
      },{emitEvent:false});
      
    }
  }

  getAttrValList(){
    let fields:any = [];
    this.paramComponents.forEach(item => 
      fields.push({
        key:item.getParamName(),
        value:item.getValue()
      })
    )
      return fields;
  }

  save(): Observable < Object > {
    return (this.getOwnerSaveRequest() ? this.cof.doRequest(this.prepareSaveRequest()) : of ());
  }

  async refreshValue() {
    let attrValues = await firstValueFrom(this.attributeService.getValuesOfOwner(this.ownerId,this.ownerType));
    this.paramComponents.forEach(item => item.setValue(this.attributeService.getValue(attrValues,item.param.name)));
  }
}

export enum AttrFormKey {
  FormKey = 'obj_attrs',
}


export interface saveAttributesRequest extends IRequest {
  setOwnerId(ownerId: string): void;
  attributes: ObjectAttributeItem[];
}

export class ObjectAttributeItem {
  key!: string;
  value!: string;
}

interface AttributeGroup{
  key:string;
  children:AttributeParamConfig[]
}