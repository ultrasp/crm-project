import { ControlValueAccessor } from "@angular/forms";
import { AttributeParamConfig } from "./AttributeParamConfig";

export interface AttributeParamWidgetIfc extends ControlValueAccessor {

	setParamConfig(param: AttributeParamConfig): void;

	getParamValue():string;
	getParamName():string;
	getLabelText():string;
	fieldToString():string;
	setEnabled( enable:boolean):void;
	setValue(val:string):void;
	setShowError(val:boolean):void;
}