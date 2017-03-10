import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";

@Injectable()
export class BusinessService {

    constructor(private apiSrv: ApiService) {
    }

    verify(id: string): Observable<any> {
        return this.apiSrv.requestAuth({
            method: 'POST',
            data: {id},
            url: '/business/verify'
        });
    }
}
