import {Component, OnInit, ViewChild, Input} from "@angular/core";
import {ModalDirective} from "ng2-bootstrap";
import {EventService} from "../../services/event.service";

@Component({
    selector: 'app-after-signup',
    templateUrl: 'after-signup.component.html',
    styleUrls: ['after-signup.component.scss']
})
export class AfterSignupComponent implements OnInit {
    @ViewChild('modal') public modal: ModalDirective;

    @Input() public template: any = {
        html: '',
        cssUrl: ''
    };

    private open: boolean = false;

    constructor(private eventSrv: EventService) {
    }

    ngOnInit() {
    }

    public onClickSaveChanges() {
        this.eventSrv.emit('renderTemplate', 'after');
        this.hide();
    }

    public show(): void {
        this.open = true;
        this.modal.show();
    }

    public hide(): void {
        this.open = false;
        this.modal.hide();
    }
}
