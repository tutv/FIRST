import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [UserService]
})
export class LoginComponent implements OnInit {
    public user: any = {
        email: '',
        password: ''
    };



    constructor(private userSrv: UserService,
                private storage: StorageService,
                private authSrv: AuthService,
                private router: Router) {
        this.checkIsLoggedIn();
    }

    private checkIsLoggedIn() {
        if (this.authSrv.isLoggedIn()) {
            this.router.navigate(['/a']);
        }
    }

    ngOnInit() {
    }

    onSubmit(event: Event): void {
        event.preventDefault();

        this.login();
    }

    login() {
        this.userSrv
            .login(this.user.email, this.user.password)
            .subscribe(
                (response) => {
                    let data = response.data;

                    this.authSrv.$login.next(data);
                }
            );
    }
}
