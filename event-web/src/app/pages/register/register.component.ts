import {Component, OnInit, ViewChild} from "@angular/core";
import {UserService} from "../../services/user.service";
import {ToasterService} from "angular2-toaster";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [UserService]
})
export class RegisterComponent implements OnInit {
    public user: any = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    @ViewChild('f') public f;
    @ViewChild('email') public email;
    @ViewChild('password') public password;
    @ViewChild('confirmPassword') public confirmPassword;

    public errors: any = {};

    constructor(private userService: UserService,
                private toasterSrv: ToasterService,
                private router: Router) {
    }

    ngOnInit() {
    }

    onSubmit(event: Event) {
        event.preventDefault();

        this.register();
    }

    public matchPassword() {
        return (this.user.password === this.user.confirmPassword);
    }

    public register() {
        this.userService
            .register(this.user.email, this.user.password)
            .subscribe(
                (response) => {
                    this.router.navigate(['/login']);
                    this.toasterSrv.pop('success', 'Success', 'Register successful!');
                }
            )
    }

}
