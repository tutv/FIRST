import {Component, OnInit, ViewChild} from "@angular/core";
import {ModalDirective} from "ng2-bootstrap";
import {EventService} from "../services/event.service";
import {EmailTemplateService} from "../services/email-template.service";

@Component({
    selector: 'mk-list-email-templates',
    templateUrl: './list-email-templates.component.html',
    styleUrls: ['./list-email-templates.component.scss'],
    providers: [EmailTemplateService]
})
export class ListEmailTemplatesComponent implements OnInit {
    @ViewChild('modal') public modal: ModalDirective;

    private templates: Array<any> = [];
    private loading: boolean = false;

    constructor(private emailTemplateSrv: EmailTemplateService,
                private eventSrv: EventService) {
    }

    ngOnInit() {
        let sub = this.eventSrv.on('openListTemplates')
            .subscribe(
                () => {
                    this.openLists();
                }
            );

        this.eventSrv.register('openListTemplates', sub);
    }

    ngOnDestroy() {
        this.eventSrv.deregister('openListTemplates');
    }

    private openLists() {
        this.modal.show();
        this.fetchLists();
    }

    onClickChooseTemplate(id: any) {
        this.loading = true;
        this.emailTemplateSrv.detail(id)
            .subscribe(
                response => {
                    this.loading = false;
                    this.eventSrv.emit('selectEmailTemplate', response.data);
                    this.modal.hide();
                },
                () => {
                    this.loading = false;
                }
            );
    }

    private fetchLists() {
        this.emailTemplateSrv.list()
            .subscribe(
                response => {
                    this.templates = response.data;
                }
            );
    }

}
