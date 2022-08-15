import {ColDef, ValueGetterParams} from "ag-grid-community";
import {AbstractSearch} from "src/app/_shared/abstract/AbstractSearch";
import {EmployeePanels, IEmployeePanel} from "../../employee/EmployeeTemplatePanel/EmployeePanels";
import {CarTechnicalInspectionList} from "../../../../_shared/request/crm/CarTechnicalInspectionList";
import {CommonUtil} from "../../../../_service/util/CommonUtil";
import {CrmRefType} from "../../../../common/enums/crm-ref-type.enum";
import {ownerPanelSearchRequest} from "../../employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import {DateUtil} from "../../../../_service/util/DateUtil";
import {CarCheckList} from "../../../../_shared/request/crm/CarCheckList";
import {CarHistoryRequest} from "../../../../_shared/request/crm/CarHistoryRequest";
import {CarTuningList} from "../../../../_shared/request/crm/CarTuningList";
import { CarBlockList } from "src/app/_shared/request/crm/CarBlockList";
import { CarTuningType } from "src/app/common/enums/car-tuning-type.enum";
import { CarTrustList } from "src/app/_shared/request/crm/CarTrustList";

export class CarTechnicalInspection extends EmployeePanels implements IEmployeePanel {

  getRequest(): AbstractSearch {
    return new CarTechnicalInspectionList();
  }

  getColumnds(onEditBtnClick: any): ColDef[] {
    return [
      {
        field: 'state_id',
        headerName: 'DRIVER.STATUS',
        resizable: true,
        cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.DRIVER_TECHNICAL_INSPECTION_STATE)),
      },
      {
        field: 'note',
        headerName: 'GENERAL.INFORMATION',
        resizable: true,
      },
      {
        field: 'check_date',
        headerName: 'CAR.DATE_OF_INSPECTION',
        resizable: true,
        cellRenderer: params => ((params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      },
      {
        field: 'next_date',
        headerName: 'CAR.NEXT_INSPECTION',
        resizable: true,
        cellRenderer: params => ((params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      },
      {
        field: 'edit',
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: onEditBtnClick ? onEditBtnClick.bind(this) : '',
          icon: 'edit',
          colorMode: 'primary'
        },
        headerName: 'FORM.CHANGE'
      },
    ];
  }
}


export class CarOwnerHistory extends EmployeePanels implements IEmployeePanel {

  getRequest(): AbstractSearch {
    return new CarHistoryRequest();
  }

  getColumnds(onShowBtnClick:Function): ColDef[] {
    return [
      {
        cellRendererParams: {
          onClick: onShowBtnClick ? onShowBtnClick.bind(this) : '',
          icon: 'visibility',
          colorMode: 'primary'
        },
        width:60,
        cellRenderer: 'buttonRenderer',
        headerName: 'CAR.CARTOTEKA'
      },
      {
      field: 'client_name',
      headerName: 'CAR.CAR_OWNER',
      resizable: true,
    },
      {
        field: 'drb_number',
        headerName: 'CAR.GOV_NUMBER',
        resizable: true,
      },
      {
        field: 'reason_id',
        headerName: 'CAR.TEXNO_PROCESS',
        resizable: true,
        cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.CAR_TEXNO_TYPES))
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
          return params.data ? (params.data.document_serial || '') + ' ' + params.data.document_number : '';
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


export class CarCheckPanel extends EmployeePanels implements IEmployeePanel {

  getRequest(): ownerPanelSearchRequest {
    return new CarCheckList();
  }

  getColumnds(onEditBtnClick: any): ColDef[] {
    return [
      {
        field: 'type_id',
        headerName: 'DRIVER.TYPES_OF_INSPECTIONS',
        resizable: true,
        cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.CAR_CHECK_TYPE))
      },
      {
        field: 'start_date',
        headerName: 'GENERAL.START_DATE',
        cellRenderer: params => ((params.value) ? DateUtil.formatDate(params.value) + '' : ''),
        resizable: true,
      },
      {
        field: 'end_date',
        headerName: 'GENERAL.END_DATE',
        cellRenderer: params => ((params.value) ? DateUtil.formatDate(params.value) + '' : ''),
        resizable: true,
      },
      {
        field: 'result_id',
        headerName: 'DRIVER.INSPECTION_RESULTS',
        resizable: true,
        cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.CAR_CHECK_RESULT))
      },
      {
        field: 'note',
        headerName: 'GENERAL.INFORMATION',
        resizable: true,
      },

    ]
  }
}

export class CarTuningTab extends EmployeePanels implements IEmployeePanel {

  getRequest(): AbstractSearch {
    let request = new CarTuningList();
    request.type_ids = Array.from({length: CarTuningType.TUNING9}, (_, i) => i + 1)

    return request;
  }

  getColumnds(): ColDef[] {
    return [{
      field: 'type_id',
      headerName: 'GENERAL.TYPE',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.CAR_DOC_TYPE))
    },
      {
        field: 'document_number',
        headerName: 'GENERAL.DOCUMENT_NUMBER',
        resizable: true,
      },
      {
        field: 'given_by',
        headerName: 'GENERAL.INFORMATION',
        resizable: true,
      },
      {
        field: 'given_date',
        headerName: 'PASPORT.GIVEDATE',
        resizable: true,
        cellRenderer: params => ((params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      },
      {
        field: 'issue_date',
        headerName: 'PASPORT.ISSUEDATE',
        resizable: true,
        cellRenderer: params => ((params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      },
      {
        field: 'edit_by',
        headerName: 'GENERAL.EDIT_BY',
        resizable: true,
      },
      {
        field: 'edit_date',
        headerName: 'GENERAL.EDIT_DATE',
        resizable: true,
        cellRenderer: params => ((params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      },
    ];
  }
}

export class CarGasTab extends EmployeePanels implements IEmployeePanel {

  getRequest(): AbstractSearch {
    let request = new CarTuningList();
    request.type_ids = [CarTuningType.GAZ];
    return request;
  }

  getColumnds(): ColDef[] {
    return [{
      field: 'type_id',
      headerName: 'GENERAL.TYPE',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.CAR_DOC_TYPE))
    },
      {
        field: 'document_number',
        headerName: 'GENERAL.DOCUMENT_NUMBER',
        resizable: true,
      },
      {
        field: 'given_by',
        headerName: 'CAR.GAZ_SETUP_ORGANIZATION',
        resizable: true,
        width:600
      },
      {
        field: 'ud1',
        headerName: 'CAR.GAZ_MANUFACTURE_PLACE',
        resizable: true,
      },
      {
        field: 'given_date',
        headerName: 'CAR.GAZ_SETUP_DATE',
        resizable: true,
        cellRenderer: params => ((params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      },
      {
        field: 'issue_date',
        headerName: 'CAR.GAZ_ISSUE_DATE',
        resizable: true,
        cellRenderer: params => ((params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      },
      {
        field: 'check_date',
        headerName: 'CAR.GAZ_CHECK_DATE',
        resizable: true,
        cellRenderer: params => ((params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      },
      {
        field: 'next_check_date',
        headerName: 'CAR.GAZ_NEXT_TEST_DATE',
        resizable: true,
        cellRenderer: params => ((params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      },
      {
        field: 'ud2',
        headerName: 'CAR.GAZ_CYLINDER_CAPACITY',
        resizable: true,
      },
      {
        field: 'ud3',
        headerName: 'CAR.GAZ_CYLINDER_WEIGHT',
        resizable: true,
      },
      {
        field: 'edit_by',
        headerName: 'GENERAL.EDIT_BY',
        resizable: true,
      },
      {
        field: 'edit_date',
        headerName: 'GENERAL.EDIT_DATE',
        resizable: true,
        cellRenderer: params => ((params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      },
    ];
  }
}

export class CarBlockTab extends EmployeePanels implements IEmployeePanel {

  getRequest(): AbstractSearch {
    return new CarBlockList();
  }

  getColumnds(onEditBtnClick: any): ColDef[] {
    return [
      {
        field: 'block_date',
        headerName: 'CAR.BLOCK_DATE',
        resizable: true,
        cellRenderer: params => ((params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      },
      {
        field: 'block_number',
        headerName: 'CAR.BLOCK_NUMBER',
        resizable: true,
      },
      {
        field: 'blocker_company',
        width:300,
        headerName: 'CAR.BLOCKER_COMPANY',
        valueGetter: function abValueGetter(params: ValueGetterParams) {
          // console.log(params.data,'params.data')
          return !params.data ? '' : (params.data.blocker_company == null ? CommonUtil.getReferenceByTypeId(params.data.blocker_id, parseInt(CrmRefType.GIVEN_PLACE)) : params.data.blocker_company);
        },
        resizable: true,
      },
      {
        field: 'blocker_person',
        headerName: 'CAR.BLOCKER_PERSON',
        resizable: true,
      },
      {
        field: 'unblock_date',
        headerName: 'CAR.UNBLOCK_DATE',
        resizable: true,
        cellRenderer: params => ((params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      },
      {
        field: 'unblocker_company',
        headerName: 'CAR.UNBLOCKER_COMPANY',
        resizable: true,
      },
      {
        field: 'unblocker_person',
        headerName: 'CAR.UNBLOCKER_PERSON',
        resizable: true,
      },
      {
        cellRendererParams: {
          onClick: onEditBtnClick ? onEditBtnClick.bind(this) : '',
          icon: 'close',
          colorMode: 'primary'
        },
        cellRendererSelector: params =>{
          return (params.data?.state_id == 1) ? {component: "buttonRenderer"} : undefined},
        headerName: 'CAR.UNBLOCK'
      },
    ];
  }
}
export class CarTrustTab extends EmployeePanels implements IEmployeePanel {

  getRequest(): AbstractSearch {
    return new CarTrustList();
  }

  getColumnds(): ColDef[] {
    return [
      {
        field: 'state_id',
        headerName: 'CAR.STATE',
        resizable: true,
        cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.CAR_TRUSTEE_STATE))
      },
      {
        field: 'notary_name',
        headerName: 'CAR.NOTARY_NAME',
        resizable: true,
      },
      {
        field: 'type_id',
        headerName: 'CAR.TRUSTEE_TYPE',
        resizable: true,
        cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.CAR_TRUSTEE_TYPE))
      },
      {
        headerName: 'CAR.PERIOD',
        resizable: true,
        cellRenderer: params => `${ DateUtil.formatDate(params.data?.date_start)} - ${ DateUtil.formatDate(params.data?.date_end)}`
      },
      {
        field: 'given_name',
        headerName: 'CAR.GIVEN_NAME',
        resizable: true,
      },
      {
        field: 'user_name',
        headerName: 'CAR.USER_NAME',
        resizable: true,
      }
    ];
  }
}
