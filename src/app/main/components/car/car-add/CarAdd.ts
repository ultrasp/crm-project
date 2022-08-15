import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output, QueryList,
  ViewChild,
  ViewChildren
} from "@angular/core";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Car} from "../../../../_shared/request/crm/Car";
import {RequestClassKey} from "src/app/_shared/request/crm/RequestList";
import {CrmRefType} from "src/app/common/enums/crm-ref-type.enum";
import {Reference} from "src/app/_shared/request/crm/Reference";
import {BaseForm} from "src/app/common/base.form/base-form";
import {COFService} from "src/app/_service/COFService";
import {CarSave} from "src/app/_shared/request/crm/CarSave";
import {ObjectOwnerType} from "src/app/common/enums/object-owner-type.enum";
import {CarOwnerInformation} from "../forms/CarOwnerInformation/CarOwnerInformation";
import {
  catchError,
  concat,
  concatMap,
  delay,
  filter,
  firstValueFrom,
  map,
  merge,
  mergeMap,
  Observable, of,
  pipe,
  switchMap,
  tap,
  timer
} from "rxjs";
import {AttributeSetupPanel, saveAttributesRequest} from "src/app/common/widgets/AttributeSetupPanel/AttributeSetupPanel";
import {CarClientRelationSave} from "src/app/_shared/request/crm/CarClientRelationSave";
import {CarCollection, CarSaveResponse} from "src/app/main/models/car-entity";
import {SessionInfoService} from "../../services/session-info.service";
import {CarAddressSave} from "src/app/_shared/request/crm/CarAddressSave";
import {CrmAddressPanel} from "src/app/common/widgets/CrmAddressPanel/CrmAddressPanel";
import {CarClientRelationCollection, CarClientRelationSaveResponse} from "src/app/main/models/car-client-relation";
import {CrmAlertDialog} from "src/app/common/widgets/CrmAlertDialog/CrmAlertDialog";
import {CrmAlertDialogTypeError} from "src/app/common/enums/crm-alert-dialog.enum";
import {Router} from "@angular/router";
import {CommonUtil} from "../../../../_service/util/CommonUtil";
import {DateUtil} from "../../../../_service/util/DateUtil";
import {CarClientRelationList} from "../../../../_shared/request/crm/CarClientRelationList";
import {CarClientType} from "../../../../common/enums/car_client_type";
import { CarSaveWithDetailRequest } from "src/app/_shared/request/crm/CarSaveWithDetailRequest";
import { ICar, ICaraddress, ICarclientrelation, ICarSaveWithDetailsResponse, IClient, ICompany, IPerson, IPersondocument } from "src/app/main/models/car-save-with-details-entity";
import { CarTuningForm } from "../forms/CarTuningForm/CarTuningForm";
import { CarTuningSave } from "src/app/_shared/request/crm/CarTuningSave";
import { StringUtil } from "src/app/_service/util/StringUtil";
import { BreadcrumbModel, BreadCrumbService } from "../../breadcrumb/BreadCrumbService";
import { TranslateService } from "@ngx-translate/core";
import { CarClientList } from "src/app/_shared/request/crm/CarClientList";
import { CarClientCollection } from "src/app/main/models/car-client.entity";
import { CarClientListCollection } from "src/app/main/models/car-client-list.entity";
import { FormDialogComponent } from "src/app/common/widgets/CrmFormDialog/CrmFormDialog";
import {CarTechnicParams} from "../forms/CarTechnicParams/CarTechnicParams";
import {CrmOwnerShip} from "../../../../common/widgets/CrmOwnership/CrmOwnerShip";
import {MatTab, MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'crm-car-add',
  templateUrl: './CarAdd.html',
  styleUrls: ['./CarAdd.css'],
})
export class CarAdd extends BaseForm implements OnInit,FormDialogComponent {

  constructor(override cof: COFService, private session: SessionInfoService, private router: Router,
              private breadcrumbs: BreadCrumbService,private translate: TranslateService, private el: ElementRef) {
    super(cof);
  }

  ngOnInit(): void {
    if (this.car_id) {
      this.isAdd = false;
      this.getData();
    }else{

    }

  }

  @Input() car_id!: string;
  @Output() closeForm = new EventEmitter();
  @ViewChild('ownerShip') ownerShip!: CrmOwnerShip;
  @ViewChild('attributePanel') attributePanel!: AttributeSetupPanel;
  @ViewChild(CrmAddressPanel) adressPanel!: CrmAddressPanel;
  @ViewChild('ownerInformation') ownerInformation!: CarOwnerInformation;
  @ViewChild(CarTuningForm) gazInfoPanel!: CarTuningForm;

  ownerType: ObjectOwnerType = ObjectOwnerType.CAR;
  pageSize = 12;
  isAdd:boolean = true;
  requestCars = new Car();
  referenceKey: string = RequestClassKey.REFERENCE;
  client_id!: string;
  key:any;
  listOfCommands = ['1', '2', '3', '4', '5', '6'];
  activeTabIndex: any;
  secondActiveTabIndex: any;


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.ctrlKey && event.key !== 'Control' && this.listOfCommands.includes(event.key)){
      event.preventDefault();
      if(parseInt(event.key) <= 4){
        this.activeTabIndex = parseInt(event.key) - 1;
      }else{
        this.secondActiveTabIndex = parseInt(event.key) - 5;
      }

    }else if(event.ctrlKey && event.key == 'Control'){
      let tabElements = document.getElementsByClassName('tab--index-deviders');
      for(let i = 0; i < tabElements.length; i++){
        tabElements[i].classList.add('d-block');

      }
    }
  }
  @HostListener('document:keyup ', ['$event'])

  hanldeKeyUpEvent(event: KeyboardEvent){
    if(event.key == 'Control'){
      let tabElements = document.getElementsByClassName('tab--index-deviders');
      for(let i = 0; i < tabElements.length; i++){
        tabElements[i].classList.remove('d-block');
      }

    }

  }

  tabChanged(prefix: number = 0) {
    let element;
    if(prefix == 0) {
      element = this.el.nativeElement.querySelector('#firstTabGroup .mat-tab-body-active input, mat-select');
    }
    else {
      element = this.el.nativeElement.querySelector('#secondTabGroup .mat-tab-body-active input, mat-select');
    }
    if(element) {
      element.focus();
    }
  }

  override form: FormGroup = new FormGroup({
    gov_number: new FormControl(null, [Validators.required]),
    doc_seria: new FormControl(null, []),
    doc_number: new FormControl(null, []),
    reason_id: new FormControl(null, [Validators.required]),
    start_date: new FormControl(null, [Validators.required]),
    spec_note: new FormControl(null, []),
    extra_note: new FormControl(null, []),

    fuel_type_id: new FormControl(null, [Validators.required]),
    brand_id: new FormControl(null, [Validators.required]),
    model_id: new FormControl(null, [Validators.required]),
    type_id: new FormControl(null, [Validators.required]),
    body_type_id: new FormControl(null, [Validators.required]),
    engine_number: new FormControl(null, [Validators.required]),
    body_number: new FormControl(null, [Validators.required]),
    chassis_number: new FormControl(null, [Validators.required]),
    vin_code: new FormControl(null, [Validators.required, Validators.minLength(17), Validators.maxLength(17)]),
    color_id: new FormControl(null, [Validators.required]),
    sub_color_id: new FormControl(null, [Validators.required]),

    made_place: new FormControl(null, [Validators.required]),
    year: new FormControl(null, [Validators.required]),
    weight: new FormControl(null, []),
    pure_weight: new FormControl(null, []),
    power: new FormControl(null, [Validators.required]),
    place_count: new FormControl(null, []),
    common_place: new FormControl(null, []),
    gas_number: new FormControl(null, []),
    gas_installed_place: new FormControl(null, []),
    prohibited: new FormControl(null),

    ownerType: new FormControl(String(CarClientType.INDIVIDUAL), [Validators.required]),

    region: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    livePlace: new FormControl(),
    street: new FormControl('', []),
    note: new FormControl('', []),
    house: new FormControl('', []),
    korpus: new FormControl('', []),
    flat: new FormControl('', []),
    addrTypeId: new FormControl(0, []),
    cadas_id: new FormControl(),

    agr_type_id: new FormControl(null,[Validators.required]),
    agr_reestr: new FormControl(null,[Validators.required]),
    agr_notary_id: new FormControl(),
    agr_dni_id: new FormControl(),
    agr_blank: new FormControl(null,[Validators.required]),
    agr_number: new FormControl(null,[Validators.required]),
    agr_date: new FormControl(null,[Validators.required]),
    dealership_name: new FormControl(),

    client_phone: new FormControl(null,[Validators.required]),
    client_id: new FormControl(null),
    hasGaz: new FormControl(false)
  });


  setTexnoParams = (searchRequest: Reference): void => {
    searchRequest.setTypeId(CrmRefType.CAR_TEXNO_TYPES);
    return;
  }

  getFormValidationErrors() {

    const result: any[] = [];
    Object.keys(this.form.controls).forEach(key => {

      const controlErrors: any = this.form.get(key)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          result.push({
            'control': key,
            'error': keyError,
            'value': controlErrors[keyError]
          });
        });
      }
    });

    return result;
  }

  override beforeSave(): void {
  }

  override onValidError(): void {
    CrmAlertDialog.show('FORM.NOT_ALL_FIELDS_FILLED', CrmAlertDialogTypeError.INFO);
  }

  prepareRequest(): any {
    let saveReq = new CarSaveWithDetailRequest();
    let car:ICar = {
      body_number: this.form.get('body_number')?.value,
      body_type_id: this.form.get('body_type_id')?.value,
      brand_id: this.form.get('brand_id')?.value,
      chassis_number: this.form.get('chassis_number')?.value,
      color_id: this.form.get('color_id')?.value,
      sub_color_id: this.form.get('sub_color_id')?.value,
      country_id: this.form.get('made_place')?.value,
      engine_number: this.form.get('engine_number')?.value,
      fuel_type_id: this.form.get('fuel_type_id')?.value,
      id: this.car_id ? parseInt(this.car_id) : undefined,
      model_id: this.form.get('model_id')?.value,
      type_id: this.form.get('type_id')?.value,
      vin_code: this.form.get('vin_code')?.value,
      year: this.form.get('year')?.value,
    }

    let car_addresses:ICaraddress = {
      address: this.adressPanel.getAddressText(),
      block: this.form.get('korpus')?.value,
      cadas_id: this.form.get('cadas_id')?.value,
      city_id: this.form.get('city')?.value,
      flat: this.form.get('flat')?.value,
      house: this.form.get('house')?.value,
      // massiv_id: this.form.get('livePlace')?.value,
      note: this.form.get('note')?.value,
      region_id: this.form.get('region')?.value,
      // street_id: this.form.get('street')?.value,
      type_id: 0
    };

    let savReq:saveAttributesRequest = this.attributePanel.prepareSaveRequest()


    let client_relation:ICarclientrelation = {
      agr_blank: this.form.get('agr_blank')?.value,
      agr_date: this.form.get('agr_date')?.value,
      // agr_dni_id: this.form.get('agr_dni_id')?.value,
      // agr_notary_id: this.form.get('agr_notary_id')?.value,
      agr_number: this.form.get('agr_number')?.value,
      agr_reestr: this.form.get('agr_reestr')?.value,
      agr_type_id: this.form.get('agr_type_id')?.value,
      branch_id: this.session.getSesionInfo().data?.user_info.branch_id || 0,
      document_number: this.form.get('doc_number')?.value,
      document_serial: this.form.get('doc_seria')?.value,
      extra_note: this.form.get('extra_note')?.value,
      drb_number: this.form.get('gov_number')?.value,
      spec_note: this.form.get('spec_note')?.value,
      reason_id: this.form.get('reason_id')?.value,
      start_date: this.form.get('start_date')?.value,
      state_id: 0,
    }

    let client:IClient = {
      doc_id: this.form.get('ownerType')?.value == CarClientType.INDIVIDUAL ? this.form.get('fizikInfo.pnfl')?.value : this.form.get('yurikInfo.stir')?.value,
      name: this.form.get('ownerType')?.value == CarClientType.INDIVIDUAL ? this.form.get('fizikInfo.name')?.value :this.form.get('yurikInfo.organization')?.value,
      id: this.form.get('client_id')?.value,
      phone: this.form.get('client_phone')?.value,
      region_id: this.form.get('region')?.value,
      sector: this.form.get('ownerType')?.value == CarClientType.INDIVIDUAL ? CarClientType.INDIVIDUAL : CarClientType.LEGAL,
    }
    if(this.form.get('ownerType')?.value == CarClientType.INDIVIDUAL){
      let person:IPerson = {
        born_city_id: this.form.get('fizikInfo.born_city_id')?.value,
        born_country_id: this.form.get('fizikInfo.born_country_id')?.value,
        born_date: this.form.get('fizikInfo.birth_date')?.value,
        born_place: this.form.get('fizikInfo.born_place')?.value,
        born_region_id: this.form.get('fizikInfo.born_region_id')?.value,
        citizenship_id: this.form.get('fizikInfo.born_country_id')?.value,
        first_name:  this.form.get('fizikInfo.name')?.value,
        id: this.form.get('client_id')?.value,
        last_name: this.form.get('fizikInfo.last_name')?.value,
        middle_name: this.form.get('fizikInfo.middlename')?.value,
        pnfl: this.form.get('fizikInfo.pnfl')?.value,
        sex_id: this.form.get('fizikInfo.sex_type')?.value,
      }

      let person_document :IPersondocument={
        document_number: this.form.get('fizikInfo.seriya')?.value + this.form.get('fizikInfo.nomer')?.value,
        given_by: this.form.get('fizikInfo.givenBy')?.value,
        given_date: this.form.get('fizikInfo.givenDate')?.value,
        issue_date: this.form.get('fizikInfo.issueDate')?.value,
        type_id: this.form.get('fizikInfo.docType')?.value,
      }
      saveReq.person = person;
      saveReq.person_documents = [person_document];
    }else{
      let company:ICompany = {
        garaj: this.form.get('yurikInfo.garage')?.value,
        id: this.form.get('client_id')?.value,
        name: this.form.get('yurikInfo.organization')?.value,
        tax_id: this.form.get('yurikInfo.stir')?.value,
        type_id: this.form.get('yurikInfo.type')?.value,
      }
      saveReq.company = company;
    }

    saveReq.car = car;
    saveReq.car_addresses = [car_addresses];
    saveReq.car_attributes = savReq.attributes;
    saveReq.car_client_relation = client_relation;
    saveReq.client = client
    return saveReq;
  }

  save() {
    this.saveProcess();
  }

  override async saveCallback(result: ICarSaveWithDetailsResponse): Promise<void> {
    if (result) {
      let hasGaz = this.form.get('hasGaz')?.value;
      if(hasGaz){
        let request:CarTuningSave=this.gazInfoPanel.prepareRequest();
        request.car_id = result.data.car.id?.toString() + '';
        await firstValueFrom(this.cof.doRequest(request))
      }
      CrmAlertDialog.show('GENERAL.DATA_SAVED', CrmAlertDialogTypeError.INFO);
      this.closeForm.emit(true);
      this.router.navigate(['/car/detail/', result.data.car.id]);
    }
  }

  getData() {
    this.requestCars.setId(this.car_id);
    this.requestCars.setCount(1);
    setTimeout(()=>  this.adressPanel.getAddressValues(), 1000)
    firstValueFrom(this.cof.doRequest(this.requestCars).pipe(
      tap((res: any) => {
        let data = <CarCollection>res;
        if (data && data.total_elements > 0) {
          let car = data.data[0];
          this.form.patchValue({
            brand_id: car.brand_id,
            fuel_type_id: car.fuel_type_id,
            model_id: car.model_id,
            type_id: car.type_id,
            body_type_id: car.body_type_id,
            engine_number: car.engine_number,
            body_number: car.body_number,
            chassis_number: car.chassis_number,
            vin_code: car.vin_code,
            color_id: car.color_id,
            made_place: car.country_id + '',
            year: car.year,
          })
        }
      }),
      switchMap(__ => {
        return this.getRelationData();
      }),
    ));
  }

  getRelationData() {
    let relationRequest = new CarClientRelationList();
    relationRequest.setCount(1);
    relationRequest.car_id = this.car_id;
    return this.cof.doRequest(relationRequest).pipe(tap(res => {
        let data = <CarClientRelationCollection>res;
        if (data && data.total_elements > 0) {
          let row = data.data[0];
          this.form.patchValue({
            agr_type_id: row.agr_type_id,
            agr_reestr: row.agr_reestr,
            // agr_notary_id: row.agr_notary_id,
            agr_blank: row.agr_blank,
            agr_number: row.agr_number,
            agr_date: row.agr_date,
            client_id:row.client_id
          })
          this.client_id = String(row.client_id);
        }
      }),
    );
  }

  public setData(data: any) {
    this.car_id = data.car_id;
  }

}


