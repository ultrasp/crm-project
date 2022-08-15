import {
  Component,
  Input,
  OnInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IStatusFlagResponse } from 'src/app/main/models/status-flag-entity';
import { COFService } from 'src/app/_service/COFService';
import { StatusFlagRequest } from 'src/app/_shared/request/crm/StatusFlagRequest';
import { ObjectOwnerType } from '../../enums/object-owner-type.enum';
import { AttributeParam } from '../AttributeSetupPanel/AttributeParam/AttributeParam';
import { AttributeParamConfig } from '../AttributeSetupPanel/AttributeParam/AttributeParamConfig';

@Component({
  selector: 'crm-status-flag-panel',
  templateUrl: './StatusFlagPanel.html',
  styleUrls: ['./StatusFlagPanel.css'],
})
export class StatusFlagPanel  implements OnInit {
  constructor(public cof: COFService) {
  }

  ngOnInit(): void {
    this.loadList();
  }

  @Input() readMode: boolean = false;
  
  @Input() set flag(v: number) {
    this._flag =v;
    this.reload();
  }

  get flag(){
    return this._flag;
  }
  @Input() ownerType: ObjectOwnerType = ObjectOwnerType.EMPLOYEE;

  private _flag!:number;
  public params: AttributeParamConfig[] = [];
  public flags!: number[];

  @ViewChildren(AttributeParam) paramComponents!: QueryList<AttributeParam>;


  public reload(): void {
    console.error('Need implement request')
  }

  getFlagTarget(){
    let target = '';
    
  }

  loadList(){
    let request = new StatusFlagRequest();
    request.setCount(10000);
    request.target = FlagTarget.USER;
    firstValueFrom(this.cof.doRequest(request)).then( (resp:any) =>{
      if(resp){
        let data:IStatusFlagResponse = resp;
        if(data.total_elements > 0){
          for (let index = 0; index < data.data.length; index++) {
            const flagElement = data.data[index];
            let p = new AttributeParamConfig(flagElement.id, 'FLAG', flagElement.name, 'checkbox', this.isItemChecked(), null, '0', false,this.readMode );
            this.params.push(p);
          }
        }
  
      }
    });
  }

  isItemChecked(){
    return '0';
  }

  public setValue(param: AttributeParamConfig, flag: number): void {
    if (flag <= 0) {
      param.dataValue = '0';
    }
    let isCheck: number = flag & parseInt(param.id);
    if (isCheck == parseInt(param.id)) param.dataValue = '1';
    else param.dataValue = '0';
  }

  public getStringValue(): string {
    let buf: string = '';
    let components = this.paramComponents.toArray();
    for (let index = 0; index < components.length; index++) {
      let pm = components[index];
      if (buf.length > 0) buf += ', ';
      buf += pm.fieldToString();
    }
    return buf;
  }


  reset() {
    this.paramComponents.forEach(item => item.setValue('0'));
  }
}

export enum FlagTarget{
  USER = 'crm.user'
}