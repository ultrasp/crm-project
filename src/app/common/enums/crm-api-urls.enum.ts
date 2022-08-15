export enum CrmApiUrl {
  LOGIN = 'oauth/login',
  //access start
  ACCESS_LIST = 'access/list',
  //access end


  //country start
  COUNTRY_LIST = 'country/list',

  //role start
  ROLE_LIST = 'role/list',
  ROLE_SAVE = 'role/save',
  //role end

  //role access start
  ACCESS_ROLE_LIST = 'role-access/list',
  ROLE_ACCESS_SAVE = 'role-access/save',
  ROLE_ACCESS_DELETE = 'role-access/delete',
  //role access  end

  // audit start
  AUDIT_LIST = 'audit/list',
  //audit end

  //car-nfo start
  CAR_INFO_LIST = 'car-info/list',
  CAR_INFO_PARAM_LIST = 'car-info-param/list',
  CAR_INFO_CHECK_SAVE = 'car-info/check-state',

  PERSON_INFO_LIST = 'person-info/list',
  PERSON_INFO_PARAM_LIST = 'person-info-param/list',
  PERSON_INFO_CHECK_SAVE = 'person-info/check-state',
  //car-nfo end

  //car start
  CAR_LIST = 'car/list',
  CAR_SEARCH = 'car/search',
  CAR_SEARCH_SHORT = 'car/search-short',
  CAR_SAVE = 'car/save',
  CAR_SAVE_WITH_DETAIL = 'car/save-with-details',
  CAR_GET_WITH_DETAIL = 'car/get-with-details',

  CAR_ATTRIBUTE_LIST = 'car-attribute/list',
  CAR_ATTRIBUTE_SAVE_LIST = 'car-attribute/save-list',
  CAR_MODEL_LIST = 'car-model/list',
  CAR_MODEL_SAVE = 'car-model/save',

  CAR_CLIENT_RELATION_SAVE = 'car-client-relation/save',
  CAR_CLIENT_RELATION_LIST = 'car-client-relation/list',
  CAR_CLIENT_RELATION_CHECK = 'car-client-relation/carCheck',

  CAR_PERSON_GET = 'person/get-person',
  CAR_PERSON_SAVE = 'person/save',
  CAR_PERSON_LIST = 'person/list',
  CAR_PERSON_DOCUMENT_LIST = 'person-document/list',
  CAR_PERSON_DOCUMENT_SAVE = 'person-document/save',
  CAR_PERSON_ATTRIBUTE_LIST = 'person-attribute/list',
  CAR_PERSON_ATTRIBUTE_SAVE_LIST = 'person-attribute/save-list',

  CAR_COMPANY_SAVE = 'company/save',
  CAR_COMPANY_LIST = 'company/list',
  CAR_COMPANY_ATTRIBUTE_LIST = 'company-attribute/list',
  CAR_COMPANY_ATTRIBUTE_SAVE_LIST = 'company-attribute/save-list',
  CAR_COMPANY_GET = 'company/get-company',

  CAR_TECHNICAL_INSPECTION_SAVE = 'car-technical-inspection/save',
  CAR_TECHNICAL_INSPECTION_LIST= 'car-technical-inspection/list',

  CAR_CLIENT_SAVE = 'client/save',
  CAR_CLIENT_LIST = 'client/list',
  CAR_CLIENT_ADDRESS_LIST = 'client-address/list',
  CAR_CLIENT_ADDRESS_SAVE = 'client-address/save',

  CAR_ADRESS_SAVE = 'car-address/save',
  CAR_ADDRESS_LIST = 'car-address/list',

  CAR_CHECK_SAVE = 'car-check/save',
  CAR_CHECK_LIST = 'car-check/list',
  CAR_TUNING_LIST = 'car-tuning/list',
  CAR_TUNING_SAVE = 'car-tuning/save',
  CAR_BLOCK_SAVE = 'car-block/block',
  CAR_UNBLOCK_SAVE = 'car-block/unblock',
  CAR_BLOCK_LIST = 'car-block/list',

  CAR_TRUSTEE_LIST = "car-trustee/list",

  CAR_HISTORY = 'car/history',
  CAR_OWNER_LIST = 'car/owner-search',
  CAR_DRB_STATE_LIST = 'drb-state-log/list',
  CAR_DRB_STATE_SAVE = 'drb-state-log/save',
  CAR_DRB_STATE_DELETE = 'drb-state-log/delete',
  //car end

  //auto car start
  AUTO_CAR_SEARCH = 'auto-car/search',
  AUTO_CAR_SAVE = 'auto-car/save',
  //auto car end

  ATTRIBUTE_SETUP_LIST = 'attribute-setup/list',
  //driver start
  DRIVER_LIST = 'driver/list',
  DRIVER_SEARCH = 'driver/search',
  DRIVER_ADDRESS_LIST = 'driver-address/list',
  DRIVER_ATTRIBUTE_LIST = 'driver-attribute/list',
  DRIVER_CATEGORY_LIST = 'driver-category/list',
  DRIVER_DOCUMENT_LIST = 'driver-document/list',
  DRIVER_CERTIFICATE_LIST = 'driver-certificate/list',
  DRIVER_CERTIFICATE_GET_LAST = 'driver-certificate/get_last',
  DRIVER_CERTIFICATE_HISTORY = 'driver-certificate/history',
  DRIVER_CERTIFICATE_HISTORY_SAVE = 'driver-certificate/save-cert-history',


  DRIVER_CATEGORY_SAVE = 'driver-category/save',
  DRIVER_SAVE = 'driver/save',
  DRIVER_ATTRIBUTE_SAVE = 'driver-attribute/save-list',
  DRIVER_ADRESS_SAVE = 'driver-address/save',
  DRIVER_DOCUMENT_SAVE = 'driver-document/save',
  DRIVER_CERTIFICATE_SAVE = 'driver-certificate/create-cert',
  DRIVER_CERTIFICATE_DEPRIVATION = 'driver-certificate/deprivation',
  DRIVER_CERTIFICATE_ACTIVATION = 'driver-certificate/actrivation',
  DRIVER_CHECK_SAVE = 'driver-check/save',
  DRIVER_CHECK_LIST = 'driver-check/list',

  DRIVER_FULL_SAVE = 'driver/save-with-details',

  //driver end

  //user list
  USER_LIST = 'user/list',
  USER_SAVE = 'user/save',
  USER_BLOCK = 'user/block',
  //user list end

  //report start
  REPORT_LIST = 'report/list',
  REPORT_PARAM_LIST = 'report-param/list',
  REPORT_EXECUTE = 'report/execute',

  REPORT_PARAM_ADD = 'report-param/add',
  REPORT_PARAM_UPDATE = 'report-param/update',
  REPORT_PARAM_DELETE = 'report-param/delete',

  REPORT_ADD = 'report/add',
  REPORT_UPDATE = 'report/update',
  //report end


  //branch-manager
  BRANCH_POSITION_LIST = "branch-position/list",
  BRANCH_POSITION_SAVE = "branch-position/save",

  //employee start
  EMPLOYEE_LIST = "employee/list",
  EMPLOYEE_AWARD_LIST = 'employee-award/list',
  EMPLOYEE_EDUCATION_LIST = 'employee-education/list',
  EMPLOYEE_EXPERIENCE_LIST = 'employee-experience/list',
  EMPLOYEE_MILITARY_LIST = 'employee-military/list',
  EMPLOYEE_RELATIVITY_LIST = 'employee-relative/list',
  EMPLOYEE_ADDRESS_LIST = 'employee-address/list',
  EMPLOYEE_ATTRIBUTE_LIST = 'employee-attribute/list',
  EMPLOYEE_DOCUMENT_LIST = 'employee-document/list',
  EMPLOYEE_PUNISH_LIST = 'employee-punish/list',
  EMPLOYEE_LANGUAGE_LIST = 'employee-language/list',
  EMPLOYEE_LANGUAGE_SAVE = 'employee-language/save',
  EMPLOYEE_LANGUAGE_DELETE = 'employee-language/delete',
  EMPLOYEE_ATTACHMENT_LIST = 'attachment/list',
  EMPLOYEE_ATTACHMENT_DELETE = 'attachment/delete',
  EMPLOYEE_ATTACHMENT_DOWNLOAD = 'attachment/download',
  EMPLOYEE_ATTACHMENT_SAVE = 'attachment/save',
  EMPLOYEE_ATTACHMENT_IMAGE = 'attachment/image',

  EMPLOYEE_CHANGE_POSITION = 'employee/change-workplace',
  EMPLOYEE_CHANGE_MILITARY_TITLE = 'employee/change-military-title',
  EMPLOYEE_DISMISSAL = 'employee/dismissal',

  EMPLOYEE_SAVE = 'employee/save',

  EMPLOYEE_AWARD_ADD = 'employee-award/add',
  EMPLOYEE_AWARD_UPDATE = 'employee-award/update',

  EMPLOYEE_PUNISH_ADD = 'employee-punish/add',
  EMPLOYEE_PUNISH_UPDATE = 'employee-punish/update',

  EMPLOYEE_EDUCATION_ADD = 'employee-education/add',
  EMPLOYEE_EDUCATION_UPDATE = 'employee-education/update',

  EMPLOYEE_EXPERIENCE_ADD = 'employee-experience/add',
  EMPLOYEE_EXPERIENCE_UPDATE = 'employee-experience/update',

  EMPLOYEE_MILITARY_ADD = 'employee-military/add',
  EMPLOYEE_MILITARY_UPDATE = 'employee-military/update',

  EMPLOYEE_RELATIVITY_ADD = 'employee-relative/add',
  EMPLOYEE_RELATIVITY_UPDATE = 'employee-relative/update',

  EMPLOYEE_ADDRESS_ADD = 'employee-address/add',
  EMPLOYEE_ADDRESS_UPDATE = 'employee-address/update',

  EMPLOYEE_DOCUMENT_ADD = 'employee-document/add',
  EMPLOYEE_DOCUMENT_UPDATE = 'employee-document/update',

  EMPLOYEE_ATTACHMENT_ADD = 'employee-attachment/add',
  //employee end


  ATTRIBUTE_SAVE = 'employee-attribute/save',

  //minvuz
  MINVUZ_GET_DIPLOM = "minvuz/get-diploma",

  //soliq
  TAX_GNK_FIZTAXOBJECTS = "gnk/fiztaxobjects",

  //fhdyo
  FXDYO_GET_MARRIAGE_INFO = "fhdyo/get-marriage-info",

  //mip start
  JURIDICAL_MIP_INFO = 'mip2/get-entity-info',
  FIZICAL_MIP_INFO = 'mip2/get-doc-info',
  ADDRESS_MIP_INFO = 'mip2/get-address-info',
  //mip end
  FIZICAL_GSP_INFO = 'gcp/get-person-info-by-passport',

  //address star
  ADDRESS_LIST = "address/list",
  //address end

  //branch start
  BRANCH_LIST = "branch/list",
  BRANCH_SAVE = "branch/save",
  //branch end

  //file start
  ATTACHMENT_DRIVER_LIST = "attachment-driver/list",
  ATTACHMENT_DRIVER_SAVE = "attachment-driver/save",
  ATTACHMENT_DRIVER_IMAGE = "attachment-driver/image",
  //file end

  //reference start
  REFERENCE_LIST = 'reference/list',
  REFERENCE_SAVE = 'reference/save',
  REFERENCE_DELETE = 'reference/delete',
  REFERENCE_TYPE_LIST = 'ref-type/list',
  //reference end

  //reference tree start
  REF_TREE_LIST = 'ref-tree/list',
  REF_TREE_SAVE = 'ref-tree/save',
  REF_TREE_DELETE = 'ref-tree/delete',
  //reference tree end

  //status flag start
  STATUS_FLAG_LIST = 'status-flag/list'
  //status flag end
}
