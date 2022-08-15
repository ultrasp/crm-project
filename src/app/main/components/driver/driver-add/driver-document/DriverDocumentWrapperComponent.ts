import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  DriverDocumentComponent
} from "./driver-document.component";
import {
  ownerPanelSearchRequest
} from "../../../employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import {
  IDriverCertificate,
  IDriverCertificateCollection
} from "../../../../models/driver-certificate.entity";
import {
  CommonUtil
} from "../../../../../_service/util/CommonUtil";
import {
  CrmRefType
} from "../../../../../common/enums/crm-ref-type.enum";
import {
  DriverCertificate
} from "../../../../../_shared/request/crm/DriverCertificate";
import {
  firstValueFrom
} from "rxjs";
import {
  COFService
} from "../../../../../_service/COFService";
import {
  DateUtil
} from "../../../../../_service/util/DateUtil";
import {
  CrmDriverCertificateStateEnum
} from "../../../../../common/enums/crm-driver-certificate-state.enum";
import {
  SystemDefault
} from "src/app/common/enums/system-defaults.enum";
import { FormDialogComponent } from "src/app/common/widgets/CrmFormDialog/CrmFormDialog";
import { IDriverInfo } from "src/app/main/models/driver-search.entity";
import { ICertificateLast } from "src/app/main/models/certificate-last.entity";

@Component({
  selector: 'app-driver-document-wrapper',
  templateUrl: 'DriverDocumentWrapperComponent.html',
  styleUrls: ['DriverDocumentWrapperComponent.css']

})
export class DriverDocumentWrapperComponent implements OnInit,FormDialogComponent {
  @Input() driver_id!: string;
  data!: DriverDocumentWrapperData;
  certificate = {
    document_number: '',
    branch_id: '',
    block_start: '',
    block_end: '',
    note: '',
    state_id: false,
  };
  @Input() readonly:boolean = true;
  @Input() isSetOwnerValue:boolean = true;
  @Output() closeForm = new EventEmitter();

  constructor(private fb: FormBuilder, private cof: COFService) {}
  saveProcess(): void {
    this.driverDocument.save().subscribe( result => {
      this.closeForm.emit(true);
    })
  }

  @ViewChild('driverDocument', {
    static: true
  }) driverDocument!: DriverDocumentComponent;
  @Output() dataSaved = new EventEmitter();

  ngOnInit(): void {
    this.setDynamicData();
  }

  categories = this.fb.array([]);
  form: FormGroup = new FormGroup({
    categories: this.categories,
    categoryStartDate: new FormControl('', [Validators.required]),
    categoryEndDate: new FormControl('', [Validators.required]),
    certificateFlag: new FormControl(0),
    categoryReason_id: new FormControl(0, [Validators.required]),
  });

  setDynamicData() {
    this.driver_id = this.data.driver_id;
    this.readonly = this.data.readonly ?? true;
    this.isSetOwnerValue= this.data.isSetOwnerValue ?? true;
    if(this.readonly){
      this.form.patchValue({
        categoryStartDate: new Date()
      })
    }
  }


  fillData(item: ICertificateLast) {
    this.certificate.document_number = CommonUtil.getReferenceByTypeId(item.state_id, parseInt(CrmRefType.DRIVER_CERTIFICATE_STATE));
    this.certificate.branch_id = CommonUtil.getBranchNameById(item.branch_id + '');
    this.certificate.block_start = < string > DateUtil.formatDate(new Date(item.block_start));
    this.certificate.block_end = < string > DateUtil.formatDate(new Date(item.block_end));
    if (item.state_id == CrmDriverCertificateStateEnum.DEPRIVED)
      this.certificate.state_id = true;
    this.certificate.note = item.note;
  }


  setData(data: any) {
    this.data = data;
  }

  refreshData(): void {
    this.loadData();
  }

  loadData() { }

}

export interface DriverDocumentWrapperData {
  driver_id: string;
  readonly: boolean;
  isSetOwnerValue:boolean;
}
