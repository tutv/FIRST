import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {StorageService} from "../../services/storage.service";
import {Router} from "@angular/router";
import {NavDropdownDirective} from "../../shared/nav-dropdown.directive";

@Component({
    selector: 'app-dropdown-account',
    templateUrl: './dropdown-account.component.html',
    styleUrls: ['./dropdown-account.component.scss'],
    providers: [UserService, NavDropdownDirective]
})
export class DropdownAccountComponent implements OnInit {
    constructor(private userSrv: UserService,
                private storageSrv: StorageService,
                private router: Router) {
    }

    ngOnInit() {
    }

    onClickLogout(event: Event) {
        event.preventDefault();
        this.logout();
    }

    logout() {
        this.router.navigate(['/']);

        this.userSrv
            .logout()
            .subscribe(
                data => {
                    this.storageSrv.deleteAll();
                },
                error => {
                    this.storageSrv.deleteAll();
                }
            );
    }

    public business() {
        return this.storageSrv.get('business');
    }

    public user() {
        return this.storageSrv.get('profile');
    }

    public name() {
        let user = this.user();
        if (!user) {
            return;
        }

        let email = user.email;
        email = email.replace(/@.+/ig, '');

        return email;
    }

    public canChangeBusiness(): boolean {
        let user = this.user();
        let businesses = user.businesses || [];

        return (businesses.length > 1);
    }
}
