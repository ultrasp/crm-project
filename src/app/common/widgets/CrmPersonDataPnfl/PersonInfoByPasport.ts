import { firstValueFrom } from "rxjs";
import { GspInfo } from "src/app/_shared/request/crm/GspInfo";

export class PersonInfoByPasport{

    public async getData(cof:any,serial:string,number :string) {
        let request = new GspInfo(serial,number);
        return await firstValueFrom(cof.doRequest(request))
        
    }
}