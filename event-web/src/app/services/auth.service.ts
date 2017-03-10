import {Injectable} from "@angular/core";
import {StorageService} from "./storage.service";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {EventService} from "../dashboard/services/event.service";

@Injectable()
export class AuthService {
    public $invalidToken = new Subject<any>();
    public $login = new Subject<any>();

    public onInvalidToken = this.$invalidToken.asObservable();
    public onLogin = this.$login.asObservable();

    constructor(private storageSrv: StorageService,
                private eventSrv: EventService,
                private router: Router) {
        this.onInvalidToken
            .subscribe(
                () => {
                    this.reLogin();
                }
            );

        this.onLogin
            .subscribe(
                data => {
                    this.storageSrv.set('profile', data.profile);
                    this.storageSrv.set('token', data.token);

                    if (data.business) {
                        this.storageSrv.set('business', data.business);
                    }

                    let redirectUrl = '/a/campaigns';
                    if (this.storageSrv.get('returnUrl')) {
                        redirectUrl = this.storageSrv.get('returnUrl');
                    }

                    this.redirectTo(redirectUrl);
                    this.storageSrv.set('returnUrl', false);
                }
            );

        this.eventSrv.on('logout')
            .subscribe(
                () => {
                    this.logoutDone();
                }
            );
    }

    logoutDone() {
        this.storageSrv.deleteAll();
        this.router.navigate(['/login']);
    }

    reLogin() {
        this.storageSrv.set('token', false);
        let returnUrl = this.router.url;
        this.storageSrv.set('returnUrl', returnUrl);
        this.router.navigate(['/login']);
    }

    isLoggedIn() {
        return Boolean(this.storageSrv.getToken() || false);
    }

    private redirectTo(url: string) {
        console.log(`Navigate to ${url}`);

        this.router.navigate([url]);
    }
}