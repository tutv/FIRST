import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";

@Injectable()
export class AppService {

    constructor(private api: ApiService) {
    }

    public plans(appSlug: string): Observable<any> {
        let args = {
            url: `/app/plans/${appSlug}`,
            method: 'GET',
        };

        return this.api.requestAuth(args, true);
    }

    public createBill(planId: string, businessId: string): Observable<any> {
        let args = {
            url: `/billing/create`,
            method: 'POST',
            data: {
                planId,
                businessId
            }
        };

        return this.api.requestAuth(args, true);
    }
}
