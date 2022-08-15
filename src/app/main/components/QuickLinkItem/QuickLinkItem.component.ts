import { Component, Output, EventEmitter, OnChanges, OnInit, HostListener, ElementRef, Input } from "@angular/core";

@Component({
    selector: 'quick-link-item',
    templateUrl: 'QuickLinkItem.component.html',
    styleUrls: ['QuickLinkItem.component.css']
})
export class QuickLinkItem {

    @Input() icon: string | undefined;
    @Input() title!: string;
    @Input() subtitle!: string;
    @Input() urlLink: string | undefined;
    
}