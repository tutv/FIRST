import {Component, OnInit, Input, ViewChild, OnDestroy} from "@angular/core";
import {TemplateService} from "../services/template.service";
import {EventService} from "../services/event.service";
import {ModalDirective} from "ng2-bootstrap";

@Component({
    selector: 'mk-list-templates',
    templateUrl: './list-templates.component.html',
    styleUrls: ['./list-templates.component.scss'],
    providers: [TemplateService]
})
export class ListTemplatesComponent implements OnInit, OnDestroy {
    @Input() public type: string = 'collect';
    @ViewChild('modal') public modal: ModalDirective;

    private templates: Array<any> = [];
    private loading: boolean = false;

    constructor(private templateSrv: TemplateService,
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
        this.templateSrv.detail(id)
            .subscribe(
                response => {
                    this.loading = false;
                    this.eventSrv.emit('selectTemplate', response.data);
                    this.modal.hide();
                },
                () => {
                    this.loading = false;
                }
            );
    }

    private fetchLists() {
        this.templateSrv.lists(this.type)
            .subscribe(
                response => {
                    this.templates = response.data;
                }
            );
    }

}
