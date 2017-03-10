import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";

@Injectable()
export class UserService {

    constructor(private api: ApiService) {
    }

    public register(email: string, password: string): Observable<any> {
        let args = {
            url: '/register',
            method: 'POST',
            data: {
                email,
                password
            }
        };

        return this.api.request(args);
    }

    public login(email: string, password: string): Observable<any> {
        let args = {
            url: '/login',
            method: 'POST',
            data: {
                email,
                password
            }
        };

        return this.api.request(args);
    }

    public forgotPassword(email: string): Observable<any> {
        let args = {
            url: '/forgot-password',
            method: 'POST',
            data: {
                email
            }
        };

        return this.api.request(args);
    }

    public resetPassword(token: string, password: string, verify: string): Observable<any> {
        let args = {
            url: `/reset-password`,
            method: 'POST',
            data: {
                token,
                password,
                verify,
            }
        };

        return this.api.request(args);
    }

    public logout(): Observable<any> {
        let args = {
            url: '/logout',
            method: 'GET',
        };

        return this.api.requestAuth(args);
    }

    public profile(): Observable<any> {
        let args = {
            url: '/profile',
            method: 'GET',
        };

        return this.api.requestAuth(args);
    }
}
