import {Component, OnInit, ViewChild, Input, OnDestroy} from "@angular/core";
import {ModalDirective} from "ng2-bootstrap";
import {EventService} from "../../services/event.service";

@Component({
    selector: 'app-before-signup',
    templateUrl: 'before-signup.component.html',
    styleUrls: ['before-signup.component.scss'],
})
export class BeforeSignupComponent implements OnInit, OnDestroy {
    @ViewChild('modal') public modal: ModalDirective;

    @Input() public template: any = {
        html: '',
        cssUrl: ''
    };

    private open: boolean = false;
    private reload: boolean = false;

    constructor(private eventSrv: EventService) {
    }

    ngOnInit() {
        let sub = this.modal.onHidden
            .subscribe(
                () => {
                    if (this.reload) {
                        this.show();
                    }
                }
            );

        this.eventSrv.register('beforeSignupHidden', sub);
    }

    ngOnDestroy() {
        this.eventSrv.deregister('beforeSignupHidden');
    }

    public onClickSaveChanges() {
        this.eventSrv.emit('renderTemplate', 'before');
        this.hide();
    }

    public show(): void {
        this.open = true;
        this.modal.show();
        this.reload = false;
    }

    public hide(): void {
        this.open = false;
        this.modal.hide();
    }

    public reloadAndOpen() {
        if (!this.modal.isShown) {
            this.show();
            return;
        }

        this.reload = true;
        this.hide();
    }
}
