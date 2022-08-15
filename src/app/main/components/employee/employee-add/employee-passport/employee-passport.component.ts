import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { firstValueFrom, Observable } from 'rxjs';
import { IEmployeeDocument, IEmployeeDocumentCollection } from 'src/app/main/models/employee-document.entity';
import { COFService } from 'src/app/_service/COFService';
import { EmployeeDocuments } from 'src/app/_shared/request/crm/EmployeeDocuments';

@Component({
  selector: 'app-employee-passport',
  templateUrl: './employee-passport.component.html',
  styleUrls: ['./employee-passport.component.css']
})
export class EmployeePassportComponent implements OnInit {

  constructor(private cof:COFService) { }

  ngOnInit(): void {
  }

  

}


