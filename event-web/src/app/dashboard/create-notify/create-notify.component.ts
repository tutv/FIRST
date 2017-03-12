import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";

@Component({
    selector: 'mk-create-notify',
    templateUrl: './create-notify.component.html',
    styleUrls: ['./create-notify.component.scss']
})
export class CreateNotifyComponent implements OnInit {
    @ViewChild('modal') public modal: ModalDirective;

    public title: string;
    public content: string;

    constructor() {
    }

    ngOnInit() {
    }

    open() {
        this.modal.show();
    }

    onClickCreate() {

    }

}
