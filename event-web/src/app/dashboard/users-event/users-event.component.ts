import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {MkUser} from "../../classes/mk-user";
import {ModalDirective} from "ng2-bootstrap";

@Component({
    selector: 'mk-users-event',
    templateUrl: './users-event.component.html',
    styleUrls: ['./users-event.component.scss']
})
export class UsersEventComponent implements OnInit {
    @ViewChild('modal') public modal: ModalDirective;

    @Input() public users: Array<MkUser> = [];

    constructor() {
    }

    ngOnInit() {
    }

    open() {
        this.modal.show();
    }

    close() {
        this.modal.hide();
    }
}
