import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[crm-attribute-host]',
})
export class AttributeDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
