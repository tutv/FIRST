import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";
import {AuthService} from "../../services/auth.service";
import {ApiService} from "../../services/api.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [UserService]
})
export class LoginComponent implements OnInit {
    public facebook: string = '';

    constructor(private userSrv: UserService,
                private storage: StorageService,
                private authSrv: AuthService,
                private apiSrv: ApiService,
                private router: Router) {
    }

    private checkIsLoggedIn() {
        if (this.authSrv.isLoggedIn()) {
            this.router.navigate(['/a']);
        }
    }

    ngOnInit() {
        this.checkIsLoggedIn();
        this.facebook = this.apiSrv.getUrl('/auth/fb');
    }
}
