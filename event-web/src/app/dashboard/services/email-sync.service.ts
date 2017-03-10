import {Injectable} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {Observable} from "rxjs";

@Injectable()
export class EmailSyncService {

    constructor(private api: ApiService) {
    }

    create(campaignId: string, linkedAccountId: string, listId: string, extend?: any): Observable<any> {
        return this.api.requestAuth({
            url: '/pu-email-sync/create',
            method: 'POST',
            data: {
                campaignId,
                linkedAccountId,
                listId,
                extend
            }
        });
    }

    lists(campaignId: string): Observable<any> {
        return this.api.requestAuth({
            url: `/pu-email-sync/list/${campaignId}`,
            method: 'GET'
        });
    }

    remove(id: string): Observable<any> {
        return this.api.requestAuth({
            url: `/pu-email-sync/${id}`,
            method: 'DELETE'
        });
    }

}
