import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {AngularFireAuth, FirebaseAuthState} from "angularfire2";
import {StorageService} from "../../services/storage.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    private loading: boolean = true;

    constructor(private authSrv: AuthService,
                private fireAuth: AngularFireAuth,
                private storageSrv: StorageService,
                private router: Router) {
    }

    private checkIsLoggedIn() {
        if (this.authSrv.isLoggedIn()) {
            this.router.navigate(['/a']);
        }
    }

    ngOnInit() {
        this.checkIsLoggedIn();

        this.fireAuth.subscribe(
            (auth: FirebaseAuthState) => {
                if (!auth) {
                    this.loading = false;
                    return;
                }

                let user = auth.auth;
                let {email, displayName, photoURL, refreshToken} = user;

                let profile = {email, displayName, photoURL};
                this.storageSrv.setToken(refreshToken);
                this.storageSrv.setCurrentUser(profile);
                this.router.navigate(['/a']);
            }
        )
    }

    onClickLogin() {
        this.fireAuth.login();
    }
}
