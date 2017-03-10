import {Component, OnInit, ViewChild} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    providers: [UserService]
})
export class ForgotPasswordComponent implements OnInit {
    @ViewChild('f') public f;
    @ViewChild('email') public email;

    public user: any = {
        email: ''
    };

    constructor(private userSrv: UserService,
                private router: Router) {
    }

    ngOnInit() {
    }

    onSubmit(e: Event) {
        e.preventDefault();

        this.request();
    }

    request() {
        this.userSrv.forgotPassword(this.user.email)
            .subscribe(
                response => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.user.email = '';
                }
            );
    }

}
