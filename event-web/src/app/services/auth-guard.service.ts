import {Injectable} from "@angular/core";
import {CanLoad, Route, Router, NavigationCancel} from "@angular/router";
import {AuthService} from "./auth.service";
import {StorageService} from "./storage.service";

@Injectable()
export class AuthGuardService implements CanLoad {
    constructor(private authSrv: AuthService,
                private router: Router,
                private storageSrv: StorageService) {
    }

    canLoad(route: Route): boolean {
        let isLoggedIn = this.authSrv.isLoggedIn();
        if (!isLoggedIn) {
            this.router.events
                .subscribe(
                    event => {
                        if (event instanceof NavigationCancel) {
                            this.storageSrv.set('returnUrl', event.url);
                        }
                    }
                );

            this.router.navigate(['/login']);
        }

        return isLoggedIn;
    }
}
