import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrmCheckbox } from 'src/app/common/widgets/CrmCheckbox/CrmCheckbox';
import { CrmLoadList } from 'src/app/common/widgets/CrmLoadList/CrmLoadList';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {

  @Input() form!: FormGroup;

  @Input() filialParams!: (request: any) => void;
  @Input() militaryDegreeParams!: (request: any) => void;
  @Input() genderParams!: (request: any) => void;
  @Input() ethnicNatinalityParams!: (request: any) => void;
  @Input() academicAwardParams!: (request: any) => void;
  @Input() nationalityParams!: (request: any) => void;
  @Input() academicDegreeParams!: (request: any) => void;
  @Input() partyMembershipParams!: (request: any) => void;
  @Input() positionParams!: (request: any) => void;
  @Input() professionParams!: (request: any) => void;
  

  @ViewChild('filialList', {
    read: CrmLoadList
  }) filialList?: CrmLoadList;

  @ViewChild('militaryDegreeList', {
    read: CrmLoadList
  }) militaryDegreeList?: CrmLoadList;

  @ViewChild('genderList', {
    read: CrmLoadList
  }) genderList?: CrmLoadList;

  @ViewChild('ethnicNatinalityList', {
    read: CrmLoadList
  }) ethnicNatinalityList?: CrmLoadList;

  @ViewChild('academicAwardList', {
    read: CrmLoadList
  }) academicAwardList?: CrmLoadList;

  @ViewChild('nationalityList', {
    read: CrmLoadList
  }) nationalityList?: CrmLoadList;

  @ViewChild('academicDegreeList', {
    read: CrmLoadList
  }) academicDegreeList?: CrmLoadList;

  @ViewChild('partyMembership', {
    read: CrmLoadList
  }) partyMembership?: CrmCheckbox;

  @ViewChild('positionList', {
    read: CrmLoadList
  }) positionList?: CrmLoadList;

  constructor() { }

  ngOnInit(): void { }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);    
    return formControl!.status == 'INVALID' && formControl!.touched;
  }

}
