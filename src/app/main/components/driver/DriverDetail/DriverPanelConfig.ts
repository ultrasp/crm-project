import { ColDef } from "ag-grid-community";
import { CrmRefType } from "src/app/common/enums/crm-ref-type.enum";
import { IReference } from "src/app/main/models/reference.entity";
import { CommonUtil } from "src/app/_service/util/CommonUtil";
import { DateUtil } from "src/app/_service/util/DateUtil";
import { AbstractSearch } from "src/app/_shared/abstract/AbstractSearch";
import { DriverAddress } from "src/app/_shared/request/crm/DriverAddress";
import { DriverCategory } from "src/app/_shared/request/crm/DriverCategory";
import { DriverCertificate } from "src/app/_shared/request/crm/DriverCertificate";
import { DriverDocuments } from "src/app/_shared/request/crm/DriverDocuments";
import { EmployeePanels, IEmployeePanel } from "../../employee/EmployeeTemplatePanel/EmployeePanels";
import { ownerPanelSearchRequest } from "../../employee/EmployeeTemplatePanel/EmployeeTemplatePanel";
import {DriverCheckList} from "../../../../_shared/request/crm/DriverCheckList";
import { DriverCategoryUtil } from "./DriverCategoryUtil";
import { CarSearchRequest } from "src/app/_shared/request/crm/CarSearchRequest";
import { DriverCertificateHistory } from "src/app/_shared/request/crm/DriverCertificateHistory";

export class DriverAddressPanel extends EmployeePanels implements IEmployeePanel {

  getRequest(): AbstractSearch {
    return new DriverAddress();
  }
  getColumnds(onEditBtnClick: any):ColDef[] {
    return [{
      field: 'id',
      headerName: 'GENERAL.ID',
      resizable: true,
    },
    {
      field: 'address',
      headerName: 'ADDRESS.ADDRESS',
      resizable: true,
    },
    {
      field: 'type_id',
      headerName: 'GENERAL.TYPE',
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.EMP_ADDRESS_TYPE))
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

export class DriverDocumentPanel extends EmployeePanels implements IEmployeePanel {

  getRequest(): AbstractSearch {
    return new DriverDocuments();
  }
  getColumnds(onEditBtnClick: any):ColDef[] {
    return [{
      field: 'id',
      headerName: 'GENERAL.ID',
      resizable: true,
    },
    {
      field: 'document_number',
      headerName: 'DRIVER.DOC_NUM',
      resizable: true,
    },
    {
      field: 'given_by',
      headerName: 'PASPORT.ISSUEBY',
      resizable: true,
    },
    {
      field: 'given_date',
      headerName: 'PASPORT.GIVEDATE',
      cellRenderer: params => ( (params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      resizable: true,
    },
    {
      field: 'issue_date',
      headerName: 'PASPORT.ISSUEDATE',
      cellRenderer: params => ( (params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      resizable: true,
    },
    {
      field: 'edit',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: onEditBtnClick ? onEditBtnClick.bind(this) : '',
        icon: 'edit',
        colorMode: 'primary'
      },
      headerName:  'FORM.CHANGE'
    },
    ];
  }
}

export class DriverCategoryPanel extends EmployeePanels implements IEmployeePanel {

  getRequest(): ownerPanelSearchRequest {
    return new DriverCertificate();
  }
  getColumnds(onEditBtnClick: any):ColDef[] {
    return [{
      field: 'document_number',
      headerName: 'DRIVER.DOCUMENT',
      resizable: true,
    },
    {
      field: 'given_date',
      headerName: 'GENERAL.START_DATE',
      cellRenderer: params => ( (params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      resizable: true,
    },
    {
      field: 'issue_date',
      headerName: 'GENERAL.END_DATE',
      cellRenderer: params => ( (params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      resizable: true,
    },
    {
      field: 'state_id',
      headerName: 'GENERAL.STATE',
      resizable: true,
    },
    {
      field: 'flag',
      headerName: 'GENERAL.FLAG',
      resizable: true,
      cellRenderer: params => {
        return DriverCategoryUtil.getText(params.value);
      }
    },
    ];
  }
}

export class DriverCheckPanel extends EmployeePanels implements IEmployeePanel {

  getRequest(): ownerPanelSearchRequest {
    return new DriverCheckList();
  }
  getColumnds(onEditBtnClick: any):ColDef[] {
    return [
      {
        field: 'type_id',
        headerName: 'DRIVER.TYPES_OF_INSPECTIONS',
        resizable: true,
        cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.DRIVER_CHECK_TYPE))
      },
      {
        field: 'start_date',
        headerName: 'GENERAL.START_DATE',
        cellRenderer: params => ( (params.value) ? DateUtil.formatDate(params.value) + '' : ''),
        resizable: true,
      },
      {
        field: 'end_date',
        headerName: 'GENERAL.END_DATE',
        cellRenderer: params => ( (params.value) ? DateUtil.formatDate(params.value) + '' : ''),
        resizable: true,
      },
      {
        field: 'result_id',
        headerName: 'DRIVER.INSPECTION_RESULTS',
        resizable: true,
        cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.DRIVER_CHECK_RESULT))
      },
      {
        field: 'note',
        headerName: 'GENERAL.INFORMATION',
        resizable: true,
      },
    ];
  }
}

export class DriverCarList extends EmployeePanels implements IEmployeePanel {

  getRequest(): ownerPanelSearchRequest {
    return new CarSearchRequest();
  }
  getColumnds():ColDef[] {
    return [
      {
        field: 'body_number',
        headerName: 'CAR.BODY_NUMBER',
        resizable: true,
      },
      {
        field: 'brand_id',
        headerName: 'CAR.BRAND',
        resizable: true,
        cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.CAR_BRAND))
      },
      {
        field: 'color_id',
        headerName: 'CAR.COLOR',
        resizable: true,
        cellRenderer: params => CommonUtil.getReferenceTreeByTypeId(params.value, parseInt(CrmRefType.CAR_COLOR))
      },
      {
        field: 'document',
        headerName: 'GENERAL.DOCUMENT_NUMBER',
        resizable: true,
      },
      {
        field: 'drb',
        headerName: 'CAR.DRB',
        resizable: true,
      },
      {
        field: 'technical_number',
        headerName: 'CAR.SERIA_NUMBER',
        resizable: true,
      },
      {
        field: 'name',
        headerName: 'GENERAL.NAME',
        resizable: true,
      },
      {
        field: 'reason_id',
        headerName: 'CAR.TEXNO_PROCESS',
        resizable: true,
        cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.CAR_TEXNO_TYPES))
      },
      {
        field: 'registration_date',
        headerName: 'CAR.REGISTER_DATE',
        resizable: true,
        cellRenderer: params => ( (params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      },
      {
        field: 'sector',
        headerName: 'CAR.SECTOR',
        resizable: true,
        cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.SECTOR))
      },
      {
        field: 'vin_code',
        headerName: 'CAR.VIN_CODE',
        resizable: true,
      },
      {
        field: 'year',
        headerName: 'CAR.YEAR',
        resizable: true,
      },
    ];
  }
}


export class DriverCertificatHistory extends EmployeePanels implements IEmployeePanel {

  getRequest(): ownerPanelSearchRequest {
    return new DriverCertificateHistory();
  }
  getColumnds():ColDef[] {
    return [
      {
        field: 'document_number',
        headerName: 'DRIVER_DETAIL_PRINT.CERTIFICATE',
        resizable: true,
      },
      {
        field: 'given_date',
        headerName: 'PASPORT.GIVEDATE',
        cellRenderer: params => ( (params.value) ? DateUtil.formatDate(params.value) + '' : ''),
        resizable: true,
        sortable:true
      },
      {
        field: 'issue_date',
        headerName: 'GENERAL.ISSUE_DATE',
        cellRenderer: params => ( (params.value) ? DateUtil.formatDate(params.value) + '' : ''),
        resizable: true,
      },
      {
        field: 'flag',
        headerName: 'GENERAL.CATEGORY',
        cellRenderer: params => DriverCategoryUtil.getText(params.value),
        resizable: true,
      },
    ];
  }
}






