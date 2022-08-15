import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ObjectOwnerType } from 'src/app/common/enums/object-owner-type.enum';
import { IEmployeeAttribute, IEmployeeAttributeCollection } from 'src/app/main/models/employee-attribute.entity';
import { COFService } from 'src/app/_service/COFService';
import { EmployeeAttribute } from 'src/app/_shared/request/crm/EmployeeAttribute';

@Component({
  selector: 'app-employee-attributes',
  templateUrl: './employee-attributes.component.html',
  styleUrls: ['./employee-attributes.component.css']
})
export class EmployeeAttributesComponent implements OnInit {

  constructor(private cof:COFService) { }

  @Input() employeeId!:string;

  @Input() ownerType:ObjectOwnerType = ObjectOwnerType.EMPLOYEE;
  ngOnInit(): void {
  }

  
}

