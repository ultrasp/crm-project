import { TranslateService } from "@ngx-translate/core";
import { ColDef } from "ag-grid-community";
import { CrmAttachmentTypes } from "src/app/common/enums/crm-attachement-types.enum";
import { CrmRefType } from "src/app/common/enums/crm-ref-type.enum";
import { CommonUtil } from "src/app/_service/util/CommonUtil";
import { DateUtil } from "src/app/_service/util/DateUtil";
import { AbstractCrmSearchRequest } from "src/app/_shared/abstract/AbstractCrmSearchRequest";
import { AbstractSearch } from "src/app/_shared/abstract/AbstractSearch";
import { EmployeeAddress } from "src/app/_shared/request/crm/EmployeeAddress";
import { EmployeeAttachmentList } from "src/app/_shared/request/crm/EmployeeAttachmentLIst";
import { EmployeeAward } from "src/app/_shared/request/crm/EmployeeAward";
import { EmployeeEducation } from "src/app/_shared/request/crm/EmployeeEducation";
import { EmployeeExperience } from "src/app/_shared/request/crm/EmployeeExperience";
import { EmployeeLanguage } from "src/app/_shared/request/crm/EmployeeLanguage";
import { EmployeeMilitary } from "src/app/_shared/request/crm/EmployeeMilitary";
import { EmployeePunish } from "src/app/_shared/request/crm/EmployeePunish";
import { EmployeeRelative } from "src/app/_shared/request/crm/EmployeeRelative";
import { ownerPanelSearchRequest } from "./EmployeeTemplatePanel";

export class EmployeePanels {
  constructor(protected translate: TranslateService) { }
}
export interface IEmployeePanel {
  getColumnds(onEditBtnClick?: Function, onDeleteClick?: Function, onDownloadClick?: Function): ColDef[];
  getRequest(): AbstractSearch;
}
export class EmpAddressPanel extends EmployeePanels implements IEmployeePanel {

  getRequest(): ownerPanelSearchRequest {
    return new EmployeeAddress();
  }
  getColumnds(onEditBtnClick: any):ColDef[] {
    return [{
      field: 'id',
      // headerName: this.translate.instant('GENERAL.ID'),
      headerName: 'GENERAL.ID',
      resizable: true,
      width:70
    },
    {
      field: 'address',
      headerName: 'ADDRESS.ADDRESS',
      resizable: true,
      width:800
    },
    // {
    //   field: 'city_id',
    //   headerName: 'ADDRESS.CITY',
    //   resizable: true,
    // },
    {
      field: 'edit_by',
      headerName: 'GENERAL.EMPLOYEE',
      resizable: true,
      cellRenderer: params => CommonUtil.getEmployeeNameById(params.value),

    },
    // {
    //   field: 'flat',
    //   headerName: 'ADDRESS.FLAT',
    //   resizable: true,
    // },
    // {
    //   field: 'house',
    //   headerName: 'ADDRESS.HOUSE',
    //   resizable: true,
    // },
    // {
    //   field: 'massiv_id',
    //   headerName: 'ADDRESS.MASSIV',
    //   resizable: true,
    // },
    // {
    //   field: 'region_id',
    //   headerName: 'ADDRESS.REGION',
    //   resizable: true,
    // },
    // {
    //   field: 'street_id',
    //   headerName: 'ADDRESS.STREET',
    //   resizable: true,
    // },
    {
      field: 'type_id',
      headerName: 'GENERAL.TYPE',
      resizable: true,
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

export class EmpAwardPanel extends EmployeePanels implements IEmployeePanel {

  getRequest(): ownerPanelSearchRequest {
    return new EmployeeAward();
  }
  getColumnds(onEditBtnClick: any): ColDef[] {
    return [
    //   {
    //   field: 'id',
    //   headerName: 'GENERAL.ID',
    //   resizable: true,
    // },
    // {
    //   field: 'edit_by',
    //   headerName: 'GENERAL.EDIT_BY',
    //   resizable: true,
    //   cellRenderer: params => CommonUtil.getEmployeeNameById(params.value)
    // },
    {
      field: 'award_id',
      headerName: 'EMPLOYEE.AWARD_ID',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.AWARD))
    },
    {
      field: 'comment',
      headerName: 'GENERAL.COMMENT',
      resizable: true,
    },
    {
      field: 'award_date',
      headerName: 'EMPLOYEE.AWARD_DATE',
      cellRenderer: params => ( (params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      resizable: true,
    },
    {
      field: 'edit_date',
      headerName: 'GENERAL.EDIT_DATE',
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
      headerName: 'FORM.CHANGE'
    },
    ];
  }
}
export class EmpPunishPanel extends EmployeePanels implements IEmployeePanel {

  getRequest(): ownerPanelSearchRequest {
    return new EmployeePunish();
  }
  getColumnds(onEditBtnClick: any, onPunishIssueBtnClick: any): ColDef[] {
    return [
    //   {
    //   field: 'id',
    //   headerName:'GENERAL.ID',
    //   resizable: true,
    // },
    // {
    //   field: 'edit_by',
    //   headerName: 'GENERAL.EDIT_BY',
    //   resizable: true,
    //   cellRenderer: params => CommonUtil.getEmployeeNameById(params.value)
    // },
    {
      field: 'punish_id',
      headerName: 'EMPLOYEE.PUNISH_TYPE',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.PUNISH))
    },
    {
      field: 'comment',
      headerName: 'GENERAL.COMMENT',
      resizable: true,
    },
    {
      field: 'punish_date',
      headerName: 'EMPLOYEE.PUNISH_Date',
      cellRenderer: params => ( (params.value) ? DateUtil.formatDate(params.value) + '' : ''),
      resizable: true,
    },
    {
      field: 'edit_date',
      headerName: 'GENERAL.EDIT_DATE',
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
      headerName: 'FORM.CHANGE'
    },
    {
      field: 'remove',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: onPunishIssueBtnClick ? onPunishIssueBtnClick.bind(this) : '',
        icon: 'remove',
        colorMode: 'primary'
      },
      headerName: 'FORM.TAKE_OFF'
    },
    ];
  }
}
export class EmpEducationPanel extends EmployeePanels implements IEmployeePanel {

  getRequest(): ownerPanelSearchRequest {
    return new EmployeeEducation();
  }
  getColumnds(onEditBtnClick: any): ColDef[] {
    return [{
      field: 'id',
      headerName: 'GENERAL.ID',
      resizable: true,
    },
    {
      field: 'type_id',
      headerName: 'GENERAL.TYPE',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.EDUCATION))
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
      field: 'educ_organization',
      headerName: 'EMPLOYEE.EDU_ORGANIZATION_NAME',
      resizable: true,
    },
    {
      field: 'educ_address',
      headerName: 'EMPLOYEE.EDU_ORGANIZATION_ADDRESS',
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
      headerName: 'FORM.CHANGE'
    },
    ];
  }
}
export class EmpExperiencePanel extends EmployeePanels implements IEmployeePanel {

  getRequest(): ownerPanelSearchRequest {
    return new EmployeeExperience();
  }
  getColumnds(onEditBtnClick: any) : ColDef[]{
    return [{
      field: 'id',
      headerName: 'GENERAL.ID',
      resizable: true,
    },
    {
      field: 'position_id',
      headerName: 'GENERAL.POSITION',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.POSITION))
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
      field: 'work_address',
      headerName: 'EMPLOYEE.WORK_ADRESS',
      resizable: true,
    },
    {
      field: 'work_place',
      headerName: 'EMPLOYEE.WORK_PLACE',
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
      headerName: 'FORM.CHANGE'
    },
    ];
  }
}
export class EmpMilitaryPanel extends EmployeePanels implements IEmployeePanel {

  getRequest(): ownerPanelSearchRequest {
    return new EmployeeMilitary();
  }
  getColumnds(onEditBtnClick: any): ColDef[] {
    return [
    //   {
    //   field: 'id',
    //   headerName: 'GENERAL.ID',
    //   resizable: true,
    // },
    {
      field: 'given_by',
      headerName: 'PASPORT.ISSUEBY',
      resizable: true,
      // cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.MILITARY_DEGREE))
    },
    {
      field: 'military_title_id',
      headerName: 'EMPLOYEE.MILITARY_TITLE',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.MILITARY_DEGREE))
    },
    {
      field: 'military_date',
      headerName: 'EMPLOYEE.MILITARY_DATE',
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
      headerName: 'FORM.CHANGE'
    },
    ];
  }
}
export class EmpRelativePanel extends EmployeePanels implements IEmployeePanel {

  getRequest(): ownerPanelSearchRequest {
    return new EmployeeRelative();
  }
  getColumnds(onEditBtnClick: any): ColDef[] {
    return [{
      field: 'id',
      headerName: 'GENERAL.ID',
      resizable: true,
    },
    {
      field: 'name',
      headerName: 'GENERAL.NAME',
      resizable: true,
    },
    {
      field: 'type_id',
      headerName: 'EMPLOYEE.RELATIVE_TYPE',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.RELATIVITY_TYPE))
    },
    {
      field: 'life_place',
      headerName: 'GENERAL.LIFE_PLACE',
      resizable: true,
    },
    {
      field: 'born_place',
      headerName: 'GENERAL.BORN_PLACE',
      resizable: true,
    },
    {
      field: 'life_place_view',
      headerName: 'GENERAL.LIVE_PLACE',
      resizable: true,
    },
    {
      field: 'work_info',
      headerName: 'EMPLOYEE.WORK_PLACE',
      resizable: true,
    },
    {
      field: 'born_date',
      headerName: 'GENERAL.BORN_DATE',
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
      headerName: 'FORM.CHANGE'
    },
    ];
  }
}
export class EmployeeFiles extends EmployeePanels implements IEmployeePanel {

  getRequest(): ownerPanelSearchRequest {
    let request = new EmployeeAttachmentList();
    request.setTypeId(CrmAttachmentTypes.EMPLOYEE_FILES + '');
    return request;
  }
  getColumnds(onEditBtnClick: any, onDeleteBtnClick: any, onDownloadBtnClick: any): ColDef[] {
    return [
    {
      field: 'file_name',
      headerName: 'GENERAL.NAME',
      resizable: true,
    },
    {
      field: 'type_id',
      headerName: 'GENERAL.TYPE',
      resizable: true,
    },
     {
       field: 'download',
       cellRenderer: 'buttonRenderer',
       cellRendererParams: {
         onClick: onDownloadBtnClick ? onDownloadBtnClick.bind(this) : '',
         icon: 'file_download',
         colorMode: 'primary'
       },
       headerName: 'GENERAL.DOWNLOAD'
     },
    {
      field: 'delete',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: onDeleteBtnClick ? onDeleteBtnClick.bind(this) : '',
        icon: 'delete',
        colorMode: 'primary'
      },
      headerName: 'FORM.DELETE'
    },
    ];
  }


}

export class EmployeeLanguages extends EmployeePanels implements IEmployeePanel {

  getRequest(): ownerPanelSearchRequest {
    let request = new EmployeeLanguage();
    return request;
  }
  getColumnds(onDeleteBtnClick: any): ColDef[] {
    return [
    {
      field: 'lang_id',
      headerName: 'EMPLOYEE.LANGUAGE',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.EMPLOYEE_LANGUAGE))
    },
    {
      field: 'degree',
      headerName: 'EMPLOYEE.DEGREE',
      resizable: true,
      cellRenderer: params => CommonUtil.getReferenceByTypeId(params.value, parseInt(CrmRefType.EMPLOYEE_DEGREE))
    },
    {
      field: 'delete',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: onDeleteBtnClick ? onDeleteBtnClick.bind(this) : '',
        icon: 'delete',
        colorMode: 'primary'
      },
      headerName: 'FORM.DELETE'
    },
    ];
  }
}
