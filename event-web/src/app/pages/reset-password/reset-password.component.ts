import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    providers: [UserService]
})
export class ResetPasswordComponent implements OnInit {
    @ViewChild('f') public f;
    @ViewChild('password') public password;
    @ViewChild('confirmPassword') public confirmPassword;

    private token: string;

    public data: any = {
        password: '',
        confirmPassword: ''
    };

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private userSrv: UserService) {
    }

    ngOnInit() {
        this.captureParams();
    }

    captureParams() {
        this.activatedRoute
            .params
            .map(
                params => {
                    return params['token'];
                }
            )
            .subscribe(
                token => {
                    this.token = token;
                }
            );
    }

    public matchPassword() {
        return (this.data.password === this.data.confirmPassword);
    }

    onSubmit() {
        this.userSrv
            .resetPassword(this.token, this.data.password, this.data.confirmPassword)
            .subscribe(
                response => {
                    this.router.navigate(['/login']);
                }
            );
    }
}
