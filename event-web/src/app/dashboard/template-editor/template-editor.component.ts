import {Component, OnInit, Input, OnDestroy, OnChanges, Output, EventEmitter} from "@angular/core";
import {PreviewService} from "../services/preview.service";
import {HelperService} from "../../services/helper.service";
import {EventService} from "../services/event.service";

@Component({
    selector: 'mk-template-editor',
    templateUrl: './template-editor.component.html',
    styleUrls: ['./template-editor.component.scss'],
    providers: [PreviewService]
})
export class TemplateEditorComponent implements OnInit, OnDestroy, OnChanges {
    @Input() private html: string;
    @Output() private htmlChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() private cssUrl: string;
    @Input('id') private previewID: string;

    @Input() private label: string;

    private element: any = false;

    constructor(private previewSrv: PreviewService,
                private eventSrv: EventService) {
    }

    ngOnInit() {
        this.previewSrv.setPreviewID(this.previewID);

        let sub = this.eventSrv.on('renderTemplate')
            .subscribe(
                (id) => {
                    this.eventSrv.emit('saveTemplate', {
                        id,
                        template: this.html
                    });
                }
            );
        this.eventSrv.register('renderTemplate', sub);

        let sub2 = this.previewSrv.onPreview$
            .subscribe(
                args => {
                    this.onPreview(args);
                }
            );
        this.eventSrv.register('onPreview', sub2);
    }

    ngOnChanges() {
    }

    ngOnDestroy() {
        this.clean();
    }

    private clean() {
        this.eventSrv.deregister('renderTemplate');
        this.eventSrv.deregister('onPreview');
    }

    public onChooseTemplate() {
        this.eventSrv.emit('openListTemplates', true);
    }

    private onPreview(args: any) {
        let type = args.type || false;
        let extra = args.extra || null;

        switch (type) {
            case 'ready':
                this.onPreviewReady();
                break;

            case 'render':
                this.onUpdateTemplate(extra);
                break;

            case 'open-element':
                this.onOpenEdit(extra);
                break;

            case 'edit-content-element':
                this.onEditContentElement(extra);
                break;
        }
    }

    private onPreviewReady() {
        this.initPreview();
    }

    reloadHtml(html: string) {
        this.html = html;
        this.initPreview();
    }

    private initPreview() {
        this.element = false;

        this.previewSrv.send('init', {
            html: this.html,
            cssUrl: this.cssUrl
        });
    }

    private onUpdateTemplate(content) {
        this.html = content;
        this.htmlChange.next(content);
    }

    private onOpenEdit(args) {
        console.log(args);

        this.element = args;
    }

    private onEditContentElement(args) {
        this.element = args;
    }
}
