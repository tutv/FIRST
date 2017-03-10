import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {StorageService} from "../../services/storage.service";

@Component({
    selector: 'mk-login-token',
    templateUrl: './login-token.component.html',
    styleUrls: ['./login-token.component.scss'],
    providers: [UserService]
})
export class LoginTokenComponent implements OnInit {
    private loading: boolean = false;

    private token: string;


    constructor(private activatedRoute: ActivatedRoute,
                private userSrv: UserService,
                private storageSrv: StorageService,
                private router: Router) {
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
                    this.storageSrv.setToken(token);
                    this.fetch();
                }
            );
    }

    private fetch() {
        this.loading = true;
        this.userSrv.profile()
            .subscribe(
                response => {
                    this.loading = false;
                    console.log(response);
                },
                error => {
                    console.log(error);
                    this.loading = false;
                }
            );

    }
}
