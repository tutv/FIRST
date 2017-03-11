import {Injectable, Inject} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {Observable, Subject} from "rxjs";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2";
import {FirebaseRef} from 'angularfire2';

@Injectable()
export class CampaignService {
    private firebase: any;

    private path = 'events';

    private events: FirebaseListObservable<any>;

    constructor(private apiSrv: ApiService,
                @Inject(FirebaseRef) ref: Firebase,
                private firebaseDB: AngularFireDatabase) {
        this.firebase = ref;
        this.events = this.firebaseDB.list(this.path);
    }

    public updateTimelines(event_id: string, data: any) {
        let path = this.path + '/' + event_id + '/timelines';

        return this.firebaseDB.object(path).set(data);
    }

    public getTimelines(event_id: string): Observable<any> {
        let path = this.path + '/' + event_id + '/timelines';

        return this.firebaseDB.object(path);
    }

    public object(path: string): Observable<any> {
        return this.firebaseDB.object(path);
    }

    public array(path: string): Observable<any> {
        return this.firebaseDB.list(path);
    }

    public list(): Observable<any> {
        return this.firebaseDB.list(this.path);
    }

    public create(data: any): string {
        return this.events.push(data).key;
    }

    public detail(id: string): Observable<any> {
        return this.firebaseDB.object(this.path + '/' + id);
    }

    public getUsers(id: string): Observable<any> {
        return this.firebaseDB.list(this.path + '/' + id + '/users');
    }

    public getQuestions(id: string): Observable<any> {
        return this.firebaseDB.list(this.path + '/' + id + '/questions');
    }

    public createQuestion(id: string, data: any): Observable<any> {
        let questionPaths = this.path + '/' + id + '/questions';
        let key = this.firebaseDB.list(questionPaths).push(data).key;

        return this.firebaseDB.object(questionPaths + '/' + key);
    }

    public removeQuestion(event_id: string, question_id: string) {
        let path = this.path + '/' + event_id + '/questions/' + question_id;

        return this.firebaseDB.object(path).remove();
    }

    public pushQuestion(data) {
        let args = {
            method: 'POST',
            url: '/postquestion',
            data
        };

        return this.apiSrv.request(args);
    }

    public deleteC(id: string): Observable<any> {
        let args = {
            method: 'DELETE',
            url: '/campaign/' + id,
        };

        return this.apiSrv.requestAuth(args);
    }

    public update(key: string, updateData: any) {
        return this.events.update(key, updateData);
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
