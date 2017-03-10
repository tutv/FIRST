import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";

@Injectable()
export class LinkingService {

    constructor(private api: ApiService) {
    }

    public list(businessId: string): Observable<any> {
        let args = {
            url: `/businesses/${businessId}/linked-accounts`,
            method: 'GET',
        };

        return this.api.requestAuth(args, true);
    }

    public detail(businessId: string, accountId: string): Observable<any> {
        let args = {
            url: `/businesses/${businessId}/linked-accounts/${accountId}`,
            method: 'GET',
        };

        return this.api.requestAuth(args, true);
    }

    public remove(id: string): Observable<any> {
        let args = {
            url: `/linked-account/${id}`,
            method: 'DELETE',
        };

        return this.api.requestAuth(args, true);
    }
}
