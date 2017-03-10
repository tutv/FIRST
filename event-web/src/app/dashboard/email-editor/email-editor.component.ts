import {Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy} from "@angular/core";
import {ModalDirective} from "ng2-bootstrap";
import {EventService} from "../services/event.service";
import {TemplateEditorComponent} from "../template-editor/template-editor.component";

@Component({
    selector: 'mk-email-editor',
    templateUrl: './email-editor.component.html',
    styleUrls: ['./email-editor.component.scss'],
})
export class EmailEditorComponent implements OnInit, OnDestroy {
    @ViewChild('modal') public modal: ModalDirective;
    @ViewChild('template_editor') public template_editor: TemplateEditorComponent;

    private subject: string;
    private body: string;
    private email: string;

    @Output() update: EventEmitter<any> = new EventEmitter<any>();
    @Output() sendEmail: EventEmitter<any> = new EventEmitter<any>();

    constructor(private eventSrv: EventService) {
    }

    ngOnInit() {
        let sub = this.eventSrv.on('selectEmailTemplate')
            .subscribe(
                template => {
                    this.body = template.body;
                    this.template_editor.reloadHtml(this.body);
                }
            );
        this.eventSrv.register('selectEmailTemplate', sub);
    }

    ngOnDestroy() {
        this.eventSrv.deregister('selectEmailTemplate');
    }

    onClickSaveChange() {
        this.update.next({
            subject: this.subject,
            body: this.body
        });

        this.hide();
    }

    onSendTestEmail() {
        this.sendEmail.next({
            email: this.email,
            subject: this.subject,
            body: this.body
        });
    }

    open(subject: string, body: string, email?: string) {
        this.subject = subject;
        this.body = body;
        this.email = email;
        this.show();
    }

    private show() {
        this.modal.show();
    }

    hide() {
        this.modal.hide();
    }
}
