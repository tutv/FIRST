import {Component, OnInit, OnDestroy} from "@angular/core";
import {UserService} from "../../services/user.service";
import {StorageService} from "../../services/storage.service";
import {Router} from "@angular/router";
import {NavDropdownDirective} from "../../shared/nav-dropdown.directive";
import {AngularFireAuth} from "angularfire2";
import {EventService} from "../../dashboard/services/event.service";

@Component({
    selector: 'app-dropdown-account',
    templateUrl: './dropdown-account.component.html',
    styleUrls: ['./dropdown-account.component.scss'],
    providers: [UserService, NavDropdownDirective]
})
export class DropdownAccountComponent implements OnInit {
    constructor(private eventSrv: EventService,
                private fireAuth: AngularFireAuth,
                private storageSrv: StorageService) {
    }

    ngOnInit() {
    }

    onClickLogout(event: Event) {
        event.preventDefault();
        this.logout();
    }

    logout() {
        this.fireAuth.logout()
            .then(
                () => {
                    this.eventSrv.emit('logout');
                }
            );
    }

    public user() {
        return this.storageSrv.get('profile');
    }

    public name() {
        let user = this.user();
        if (!user) {
            return;
        }

        if (user.displayName) {
            return user.displayName;
        }

        let email = user.email;
        email = email.replace(/@.+/ig, '');

        return email;
    }
}
