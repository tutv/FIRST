import {Injectable} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Observable} from "rxjs";

@Injectable()
export class EmailTemplateService {

    constructor(private api: ApiService) {
    }

    list(): Observable<any> {
        return this.api.requestAuth({
            method: 'GET',
            url: '/email-template'
        });
    }


    detail(id: string): Observable<any> {
        return this.api.requestAuth({
            method: 'GET',
            url: `/email-template/${id}`
        });
    }

}
