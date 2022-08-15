import { AfterContentChecked, AfterContentInit, AfterViewInit, Component } from "@angular/core";


@Component({
    selector: 'secondary-layout',
    templateUrl: './secondaryLayout.component.html',
    styleUrls: ['./secondaryLayout.component.css'],
  })
export class SecondaryLayout implements AfterViewInit {

    tableContainer: any;

    ngAfterViewInit(): void {
        setTimeout(() => {
        }, 0);
    }

}