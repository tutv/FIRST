import {Injectable, Inject} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {Observable, Subject} from "rxjs";
import {AngularFireDatabase} from "angularfire2";
import {FirebaseRef} from 'angularfire2';

@Injectable()
export class CampaignService {
    private firebase: any;

    private path = 'events';

    constructor(private apiSrv: ApiService,
                @Inject(FirebaseRef) ref: Firebase,
                private firebaseDB: AngularFireDatabase) {
        this.firebase = ref;
    }

    public list(): Observable<any> {
        return this.firebaseDB.list(this.path);
    }

    public create(data: any): string {
        return this.firebase.database().ref(this.path).push(data).key;
    }

    public detail(id: string): Observable<any> {
        return this.firebaseDB.object(this.path + '/' + id);
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
