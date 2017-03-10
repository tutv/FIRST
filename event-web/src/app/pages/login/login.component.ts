import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ApiService} from "../../services/api.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public facebook: string = '';

    constructor(private authSrv: AuthService,
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
