import {Injectable} from "@angular/core";
import {Headers, Http, Response, ResponseContentType} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/Rx";
import {environment} from "../../environments/environment";
import {ToasterService} from "angular2-toaster";
import {StorageService} from "./storage.service";
import {NgProgressService} from "ng2-progressbar";
import {AuthService} from "./auth.service";

@Injectable()
export class ApiService {
    private BASE_URL = '';

    constructor(private http: Http,
                private authSrv: AuthService,
                private toasterService: ToasterService,
                private storageSrv: StorageService,
                private progressService: NgProgressService) {
        this.BASE_URL = environment.api;
    }

    public download(args: any): void {
        let url_api = this.BASE_URL + args.url;

        let token = this.storageSrv.getToken();
        let access_token = token.access_token || false;

        let headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', access_token);

        let args_headers = args.headers || {};
        for (let header_key in args_headers) {
            headers.set(header_key, args_headers[header_key]);
        }

        this.http
            .request(url_api, {
                method: args.method,
                headers: headers,
                body: args.data,
                responseType: ResponseContentType.Blob
            })
            .subscribe(
                (response: Response) => {
                    let blob = new Blob([response.blob()], {type: 'text/csv'});
                    let url = window.URL.createObjectURL(blob);
                    window.open(url);
                },
                (error: Response) => {
                    this.toasterService.pop('error', 'Opps!', error.statusText);
                }
            );
    }

    public requestAuth(args, silent: boolean = false) {
        let token = this.storageSrv.getToken();
        let headers = args.headers || {};
        headers['Authorization'] = token;
        headers['mk-request-silent'] = silent ? 'yes' : false;

        args.headers = headers;

        return this.request(args);
    }

    public request(args): Observable<any> {
        let url_api = this.BASE_URL + args.url;

        let headers = new Headers();
        headers.set('Content-Type', 'application/json');
        let args_headers = args.headers || {};
        for (let header_key in args_headers) {
            headers.set(header_key, args_headers[header_key]);
        }

        let request = this.http
            .request(url_api, {
                method: args.method,
                headers: headers,
                body: args.data
            })
            .map(
                (response: Response) => {
                    let silent = response.headers.get('mk-request-silent') || false;

                    let data = response.json();
                    if (silent == 'yes') {
                        data.message = false;
                    }

                    return data;
                }
            )
            .share();

        this.subscribeInvalidToken(request);
        this.subscribeToNotify(request);
        this.subscribeToRunProgressBar(request);

        return request;
    }

    private subscribeInvalidToken(request: Observable<any>) {
        request
            .subscribe(
                () => {
                },
                error => {
                    if (error.status && error.status == 401) {
                        this.authSrv.$invalidToken.next();
                    }
                }
            );
    }

    private subscribeToRunProgressBar(request: Observable<any>) {
        this.progressService.start();

        request
            .subscribe(
                () => {
                    this.progressService.done();
                },
                () => {
                    this.progressService.done();
                }
            );
    }

    private subscribeToNotify(request: Observable<any>) {
        let self = this;

        request
            .subscribe(
                response => {
                    if (response.message) {
                        self.toasterService.pop('success', 'Success', response.message);
                    }
                },
                (response: Response) => {
                    try {
                        let error = response.json();
                        self.toasterService.pop('error', error.error, error.message);
                    } catch (e) {
                        self.toasterService.pop('error', 'Error', 'Internal server error! Please try again later :)');
                    }
                }
            );
    }

    public getUrl(path: string) {
        return this.BASE_URL + path;
    }

}
