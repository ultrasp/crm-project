import {Component, Input, OnInit,} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {firstValueFrom, Observable} from 'rxjs';
import {IEmployeeDocument, IEmployeeDocumentCollection} from 'src/app/main/models/employee-document.entity';
import {COFService} from 'src/app/_service/COFService';
import {StringUtil} from 'src/app/_service/util/StringUtil';
import {DriverDocuments} from 'src/app/_shared/request/crm/DriverDocuments';
import {DriverDocumentSave} from 'src/app/_shared/request/crm/DriverDocumentSave';
import {EmployeeDocuments} from 'src/app/_shared/request/crm/EmployeeDocuments';
import {EmployeeDocumentSave} from 'src/app/_shared/request/crm/EmployeeDocumentSave';
import {Reference} from 'src/app/_shared/request/crm/Reference';
import {CrmRefType} from '../../enums/crm-ref-type.enum';
import {ObjectOwnerType} from '../../enums/object-owner-type.enum';
import {CarPersonDocuments} from "../../../_shared/request/crm/CarPersonDocuments";
import {CarPersonDocumentSave} from "../../../_shared/request/crm/CarPersonDocumentSave";
import { RequestClassKey } from 'src/app/_shared/request/crm/RequestList';

@Component({
  selector: 'crm-passport-panel',
  templateUrl: './CrmPasportPanel.html',
  styleUrls: ['./CrmPasportPanel.css']
})
export class CrmPasportPanel implements OnInit {

  constructor(private cof: COFService) {}

  ngOnInit() {
    //  this.getValuesOfOwner()
  }

  @Input() form!: FormGroup;
  @Input() set ownerId(value:string){
    if(this._ownerId != value){
      this._ownerId = value;
      if(this._ownerId && this.autoload){
        this.getValuesOfOwner();
      }

    }
  }
  @Input() autoload:boolean = true;
  get ownerId(){
    return this._ownerId;
  }
  @Input() ownerType:ObjectOwnerType = ObjectOwnerType.EMPLOYEE;
  @Input() formLabelType?:string;
  request!: string;
  private _ownerId!:string;
  public isTypeDisabled:boolean = false;
  referenceKey: string = RequestClassKey.REFERENCE;
  givenByText:string = '';

  async getValuesOfOwner() {
    if(!this.form)
      return ;
    if (!( (this.form.get('docId')?.value || (this.ownerId && this.ownerId != '' && this.form.get('docType') && this.form.get('docType')?.value != null && this.form.get('docType')?.value >= 0))  && this.autoload))
      return;
    this.fillData();
  }

  async fillData(){
    let request = ( this.ownerType == ObjectOwnerType.EMPLOYEE ? new EmployeeDocuments() : (this.ownerType == ObjectOwnerType.DRIVER ? new DriverDocuments() : new CarPersonDocuments()));

    if(this.ownerId)
    request.setOwnerId(this.ownerId);

    // if(this.form.get('docType')?.value >= 0 )
    // request.type_id = null;

    if(this.form.get('docId')?.value)
    request.setId(this.form.get('docId')?.value);

    request.setCount(999);

    let response = < IEmployeeDocumentCollection > await firstValueFrom(this.cof.doRequest(request));
    if (response) {
      let items: IEmployeeDocument[] = response.data;
      if (items.length > 0) {
        let item = null;
        if(this.form.get('docType')?.value >= 0 ){
          item = items.find( v => v.type_id == this.form.get('docType')?.value);
        }
        this.setValue(item ? item : items[0])
        if(this.form.get('docId') != null){
          this.form.patchValue({ docId:(item ? item : items[0]).id })
        }
        if(this.ownerId){
          this.isTypeDisabled = true
        }
      }
    }

  }

  setValue(item: IEmployeeDocument) {
    // console.log(item.document_number,(<string>StringUtil.toStr(item.document_number)).substring(0, 2),(<string>StringUtil.toStr(item.document_number)).substring(2))
    this.form.patchValue({
      seriya: (<string>StringUtil.toStr(item.document_number)).substring(0, 2),
      nomer: (<string>StringUtil.toStr(item.document_number)).substring(2),
      givenDate: item.given_date,
      issueDate: item.issue_date,
      givenBy: item.given_by_id,
      docType:item.type_id
    });
    this.givenByText = item.given_by
  }

  prepareSaveRequest() {
    let docId:string = this.form.get('docId')?.value;
    let request = ( this.ownerType == ObjectOwnerType.EMPLOYEE ? new EmployeeDocumentSave(docId) : ( this.ownerType == ObjectOwnerType.CAR_CLIENT ? new CarPersonDocumentSave(docId) : new DriverDocumentSave(docId))) ;
    request.setOwnerId(this.ownerId);
    request.setDocNumber(this.form.get('seriya')?.value + this.form.get('nomer')?.value);
    request.given_date = this.form.get('givenDate')?.value;
    request.given_by = this.form.get('givenBy')?.value;
    request.issue_date = this.form.get('issueDate')?.value
    request.type_id = this.form.get('docType')?.value;
    return request;
  }

  save(): Observable < Object > {
    return this.cof.doRequest(this.prepareSaveRequest());
  }

  f(formControlName: string): boolean {
    let formControl = this.form.get(formControlName);
    return formControl != null && formControl!.status == 'INVALID' && formControl!.touched;
  }

  documentTypeParams = (request: Reference): void => {
    request.setTypeId( this.ownerType == ObjectOwnerType.EMPLOYEE ? CrmRefType.EMP_DOC_TYPES : CrmRefType.PERSON_DOC_TYPE);
    return;
  }

  givenPlaceParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.GIVEN_PLACE);
    return;
  }

}
