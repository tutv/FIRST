import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";

@Injectable()
export class MailChimpService {

    constructor(private api: ApiService) {
    }

    getLists(accountId: string): Observable<any> {
        return this.api.requestAuth({
            method: 'GET',
            url: `/mailchimp/getLists/linkedAccount/${accountId}`
        });
    }

}
