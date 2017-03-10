import {Injectable} from "@angular/core";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {MkUser} from "../classes/mk-user";

@Injectable()
export class StorageService {
    private namespace = 'marketify_co';

    constructor(private cookieSrv: CookieService) {
    }

    isLocalStorageSupport() {
        return (typeof (Storage) !== 'undefined');
    }

    private setData(data): void {
        if (!this.isLocalStorageSupport()) {
            this.cookieSrv.putObject(this.namespace, data);
        } else {
            localStorage.setItem(this.namespace, JSON.stringify(data));
        }
    }

    private getData(): any {
        if (!this.isLocalStorageSupport()) {
            return this.cookieSrv.getObject(this.namespace) || {};
        }

        try {
            return JSON.parse(localStorage.getItem(this.namespace)) || {};
        }
        catch (e) {
            return {};
        }
    }

    public set(key: string, value: any) {
        let data = this.getData();
        data[key] = value;

        this.setData(data);
    }

    public get(key) {
        let data = this.getData();

        return data[key];
    }

    setToken(token: any): void {
        this.set('token', token);
    }

    getToken(): any {
        return this.get('token');
    }

    deleteAll(): void {
        this.setData(false);
    }

    getBusinessId() {
        let business = this.get('business');

        if (!business || !business._id) {
            return false;
        }

        return business._id;
    }

    getCurrentUser(): MkUser {
        return this.get('profile') || false;
    }

    setCurrentUser(data: any): void {
        this.set('profile', data);
    }
}
