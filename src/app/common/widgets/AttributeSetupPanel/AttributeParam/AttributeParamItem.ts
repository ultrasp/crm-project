import { Type } from '@angular/core';
import { AttributeParamConfig } from './AttributeParamConfig';
import { AttributeParamWidgetIfc } from './AttributeParamWidgetIfc';

export class AttributeParamItem {
  constructor(public component: Type<AttributeParamWidgetIfc>, public param: AttributeParamConfig) {}
}