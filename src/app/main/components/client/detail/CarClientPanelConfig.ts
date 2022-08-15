import {ColDef, ValueGetterParams} from "ag-grid-community";
import {AbstractSearch} from "src/app/_shared/abstract/AbstractSearch";
import {EmployeePanels, IEmployeePanel} from "../../employee/EmployeeTemplatePanel/EmployeePanels";
import {CommonUtil} from "../../../../_service/util/CommonUtil";
import {CrmRefType} from "../../../../common/enums/crm-ref-type.enum";
import {CarClientAddress} from "../../../../_shared/request/crm/CarClientAddress";
import {DateUtil} from "../../../../_service/util/DateUtil";
import {DriverAddressPanel, DriverDocumentPanel} from "../../driver/DriverDetail/DriverPanelConfig";
import {CarClientRelationOwnerClient} from "../../../../_shared/request/crm/CarClientRelationsRequest";
import {CarPersonDocuments} from "../../../../_shared/request/crm/CarPersonDocuments";


export class CarClientRelationPanel extends EmployeePanels implements IEmployeePanel {

  getRequest(): AbstractSearch {
    return new CarClientRelationOwnerClient();
  }

  getColumnds(): ColDef[] {
    return [
      {
        field: 'drb_number',
        headerName: 'CAR.GOV_NUMBER',
        resizable: true,
      },
      {
        field: 'reason_id',
        headerName: 'CAR.TEXNO_PROCESS',
        cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.CAR_TEXNO_TYPES)),
        resizable: true,
        width:700
      },
      {
        field: 'start_date',
        headerName: 'GENERAL.FROM',
        resizable: true,
        cellRenderer: params => ((params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      },
      {
        field: 'end_date',
        headerName: 'GENERAL.TO',
        resizable: true,
        cellRenderer: params => ((params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      },
      {
        field: 'document_num',
        headerName: 'CAR.TECHNIC_NUM',
        resizable: true,
        valueGetter: function abValueGetter(params: ValueGetterParams) {
          return params.data ? params.data.document_serial + ' ' + params.data.document_number : '';
        }
      },
      {
        field: 'branch_id',
        headerName: 'GENERAL.TRIB',
        resizable: true,
        cellRenderer: params => CommonUtil.getBranchNameById(params.value)
      },
    ];
  }
}
export class CarClientAddressPanel extends DriverAddressPanel {

  override getRequest(): AbstractSearch {
    return new CarClientAddress();
  }
}

export class CarPersonDocumentPanel extends DriverDocumentPanel{

  override getRequest(): AbstractSearch {
    return new CarPersonDocuments();
  }
}
