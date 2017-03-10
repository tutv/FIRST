import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {SafeResourceUrl, DomSanitizer} from "@angular/platform-browser";
import {Subject} from "rxjs";
import {ControlEventService} from "./control-event.service";

@Injectable()
export class PreviewService {
    private host: string = environment.host;
    private previewHost: string = environment.preview;
    public previewID: string = 'mk-template-editor';
    private previewSrc: SafeResourceUrl = null;
    private windowPreview: any;

    private preview = new Subject();
    public onPreview$ = this.preview.asObservable();

    constructor(private sanitizer: DomSanitizer,
                private controlEventSrv: ControlEventService) {
        this.events();
    }

    private events() {
        window.addEventListener('message', this.onMessageIframe.bind(this));
        this.controlEventSrv.update.subscribe(this.onControlUpdate.bind(this));
    }

    public setPreviewID(id: string): void {
        this.previewID = id;
        this.setSourcePreview();
        this.updateWindowPreview();
    }

    public getSourcePreview() {
        return this.previewSrc;
    }

    public send(type, extend) {
        this.updateWindowPreview();

        if (!this.windowPreview) {
            console.warn('Send failed');
            return;
        }

        this.windowPreview.postMessage(
            {
                mk_type: type,
                extend
            },
            this.previewHost
        );
    }

    private updateWindowPreview() {
        let iframeTag = document.getElementById(this.previewID);

        if (!iframeTag) {
            this.windowPreview = false;
        } else {
            this.windowPreview = iframeTag['contentWindow'];
        }
    }

    private setSourcePreview() {
        let url = this.previewHost + '?host=' + this.host + '&time=' + new Date().getTime();
        this.previewSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    private onMessageIframe(e: MessageEvent) {
        if (!e.data) {
            return;
        }

        let data = e.data;
        let type = data.mk_type || false;
        let extend = data.extend || null;

        this.preview.next({
            type,
            extra: extend
        });
    }

    private onControlUpdate(args: any) {
        this.send('edit', args);
    }
}
