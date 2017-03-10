import {Injectable} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {Observable} from "rxjs";

@Injectable()
export class CampaignService {

    constructor(private apiSrv: ApiService) {
    }

    public list(businessId: string): Observable<any> {
        let args = {
            method: 'GET',
            url: '/campaign/business/' + businessId
        };

        return this.apiSrv.requestAuth(args);
    }

    public create(data: any): Observable<any> {
        let args = {
            method: 'POST',
            url: '/campaign',
            data: data
        };

        return this.apiSrv.requestAuth(args);
    }

    public detail(id: string): Observable<any> {
        let args = {
            method: 'GET',
            url: '/campaign/' + id
        };

        return this.apiSrv.requestAuth(args);
    }

    public deleteC(id: string): Observable<any> {
        let args = {
            method: 'DELETE',
            url: '/campaign/' + id,
        };

        return this.apiSrv.requestAuth(args);
    }

    public update(id: string, updateData: any) {
        let args = {
            method: 'PUT',
            url: `/campaign/${id}`,
            data: updateData
        };

        return this.apiSrv.requestAuth(args, true);
    }

    public updateSettings(id: string, configs: any) {
        let args = {
            method: 'PUT',
            url: `/campaign/${id}/settings`,
            data: {configs}
        };

        return this.apiSrv.requestAuth(args, true);
    }

    public updateFormSettings(id: string, formSettings: any) {
        let args = {
            method: 'PUT',
            url: `/campaign/${id}`,
            data: {formSettings}
        };

        return this.apiSrv.requestAuth(args, true);
    }

    public activate(id: string): Observable<any> {
        let args = {
            method: 'PUT',
            url: `/campaign/${id}/activate`,
        };

        return this.apiSrv.requestAuth(args);
    }

    public deactivate(id: string): Observable<any> {
        let args = {
            method: 'PUT',
            url: `/campaign/${id}/deactivate`,
        };

        return this.apiSrv.requestAuth(args);
    }

    public getResults(id: string): Observable<any> {
        let args = {
            method: 'GET',
            url: `/result/list/campaign/${id}`,
        };

        return this.apiSrv.requestAuth(args, true);
    }

    public exportCSV(id: string): void {
        let args = {
            method: 'GET',
            url: `/result/export-csv/campaign/${id}`,
        };

        this.apiSrv.download(args);
    }

    public sendTestEmail(id: string, data: any) {
        let args = {
            method: 'POST',
            url: `/campaign/${id}/test-email`,
            data
        };

        return this.apiSrv.requestAuth(args, true);
    }
}
