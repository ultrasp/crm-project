import { CompareUtil } from "src/app/_service/util/CompareUtil";

export class AttributeParamConfig {
  id: string;
  name: string;
  desc: string;
  component: string;
  dataValue: string ='';
  serityRole: string;
  defValue: string;
  isRequiredField: boolean;
  readOnly: boolean;
  enabled: boolean =  true;
  order: number | null;
  showError:boolean = false;
  isField:boolean;
  groupName:string | null;

  constructor(id: string,
    name: string,
    desc: string,
    objType: string,
    val: string,
    serityRole: string | null,
    defValue: string,
    isRequiredField: boolean,
    readOnly: boolean,
    order: number | null = null,
    isField:boolean = false,
    groupName:string |null = null) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.component = objType;
    this.dataValue = val;
    this.serityRole = ( serityRole ?? '') ;
    this.defValue = defValue == null ? "" : defValue;
    this.readOnly = readOnly;
    this.isRequiredField = isRequiredField;
    this.order = order;
    this.isField = isField;
    this.groupName = groupName
  }

  public  setEnabled(enable:boolean ):void{
    this.enabled = enable;
  }
}
