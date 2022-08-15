import { AfterContentChecked, AfterContentInit, AfterViewInit, Component } from "@angular/core";


@Component({
    selector: 'filter-table-wrapper',
    templateUrl: './filterTableWrapper.component.html',
    styleUrls: ['./filterTableWrapper.component.css'],
  })
export class FilterTableWrapper implements AfterViewInit {

    tableContainer: any;

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.tableContainer = this.calculateHeight();
        }, 0);
    }

    calculateHeight(): number{
        let formContainer: any = document.getElementById('formContainer');
        let headerContainer: any = document.getElementById('header-container');
        let breadcrumbContainer: any = document.getElementById('breadcrumb');
        return (window.innerHeight - (formContainer.offsetHeight + headerContainer.offsetHeight + breadcrumbContainer.offsetHeight + 110))
    }
}