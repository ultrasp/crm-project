import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  forwardRef,
  ViewChildren,
  QueryList,
  ViewChild
} from '@angular/core';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  BehaviorSubject,
  firstValueFrom,
  Observable
} from 'rxjs';
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
  AttributeSetup
} from 'src/app/_shared/request/crm/AttributeSetup';
import {
  EmployeeAttribute
} from 'src/app/_shared/request/crm/EmployeeAttribute';
import {
  EmployeeAttributeSave
} from 'src/app/_shared/request/crm/EmployeeAttributeSave';
import { ObjectOwnerType } from '../../enums/object-owner-type.enum';
import { SkeletonTabComponent } from '../CrmDynamicTab/SkeletonTabComponent';
import {
  AttributeParam
} from './AttributeParam/AttributeParam';
import {
  AttributeParamConfig
} from './AttributeParam/AttributeParamConfig';
import { AttributeSetupPanel } from './AttributeSetupPanel';

@Component({
  selector: 'crm-attribute-dynamic-panel',
  template:`<crm-attribute-setup-panel [readMode]="readMode" [ownerId]="ownerId" [ownerType]="ownerType"></crm-attribute-setup-panel>`
})
export class AttributeSetupDynamicPanel implements OnInit,SkeletonTabComponent {

  ngOnInit(): void {
  }
  constructor() {
  }

  @ViewChild(AttributeSetupPanel) childPanel!: AttributeSetupPanel;

  public readMode: boolean = false;
  public ownerType: ObjectOwnerType = ObjectOwnerType.EMPLOYEE;
  public ownerId!:string
  public isDynamicLoaded: boolean = true;

  setData(data: any): void {
    this.isDynamicLoaded = true;
    this.ownerId = data.ownerId;
    this.ownerType = data.ownerType;
    this.readMode = data.readMode;
  }

  refreshData(){
    this.childPanel.refreshValue()
  }
}

