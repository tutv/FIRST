import {Injectable} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {Observable} from "rxjs";

@Injectable()
export class TemplateService {

    constructor(private api: ApiService) {
    }

    lists(type: string): Observable<any> {
        return this.api.requestAuth({
            url: `/template/list/${type}`,
            method: 'GET'
        });
    }

    public detail(id: string): Observable<any> {
        return this.api
            .requestAuth({
                method: 'GET',
                url: `/template/${id}`,
            });
    }
}
