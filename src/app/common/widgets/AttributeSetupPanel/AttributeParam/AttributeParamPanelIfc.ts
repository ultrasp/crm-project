import { AttributeParamConfig } from "./AttributeParamConfig";

export interface AttributeParamPanelIfc {

	getKeyValue( excludeEmpty:boolean):string;
	fieldToString():string;
	setValue(value: string):void
}