import {
  Component,
  OnInit
} from "@angular/core";
import {
  NavigationStart,
  Router
} from "@angular/router";
import {
  ColDef
} from "ag-grid-community";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { COFService } from "src/app/_service/COFService";
import { RefType } from "src/app/_shared/request/crm/RefType";

@Component({
  selector: 'test-page',
  templateUrl: './TestPage.html'
})
export class TestPage implements OnInit {

  columnDefs: ColDef[] = [{
      field: 'id',
      headerName: 'Код',
      resizable: true,
    },
    {
      field: 'name',
      headerName: 'Номи',
      resizable: true,
    },
    {
      field: 'key',
      headerName: 'Калит'
    }
  ];

  data = [];

  constructor(private router: Router, private cof: COFService) {
  }

  ngOnInit(): void {
  }

  async filter() {
    let request = new RefType();
    request.setKey("car");
    request.setName("");
    request.setCount(3);

    let result:any = (await firstValueFrom(this.cof.doRequest(request)));

    this.data = result["data"];
  }
}
