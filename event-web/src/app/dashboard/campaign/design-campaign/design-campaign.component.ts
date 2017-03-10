import {Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, OnDestroy} from "@angular/core";
import {EventService} from "../../services/event.service";
import {BeforeSignupComponent} from "../before-signup/before-signup.component";
import {AfterSignupComponent} from "../after-signup/after-signup.component";

@Component({
    selector: 'app-design-campaign',
    templateUrl: 'design-campaign.component.html',
    styleUrls: ['design-campaign.component.scss']
})
export class DesignCampaignComponent implements OnInit, OnChanges, OnDestroy {
    @ViewChild('beforeSignup') public beforeSignup: BeforeSignupComponent;
    @ViewChild('afterSignup') public afterSignup: AfterSignupComponent;

    @Input() public displays: any;
    @Input() public type: string;
    @Output() public displaysChange: EventEmitter<any> = new EventEmitter<any>();

    private screens: any = {
        before: null,
        after: null
    };

    constructor(private eventSrv: EventService) {
    }

    ngOnChanges() {
        this.render();
    }

    ngOnInit() {
        let sub = this.eventSrv.on('selectTemplate')
            .subscribe(
                (template) => {
                    let displays = {
                        cssUrl: template.cssUrl,
                        screens: template.screens
                    };

                    this.updateDisplays(displays);
                }
            );
        this.eventSrv.register('selectTemplate', sub);

        let sub2 = this.eventSrv.on('saveTemplate')
            .subscribe(
                (data) => {
                    let {id, template} = data;
                    if (id == 'before') {
                        this.onUpdateBeforeTemplate(template);
                    }
                    if (id == 'after') {
                        this.onUpdateAfterTemplate(template);
                    }
                }
            );
        this.eventSrv.register('saveTemplate', sub2);
    }

    ngOnDestroy() {
        this.eventSrv.deregister('selectTemplate');
        this.eventSrv.deregister('saveTemplate');
    }

    private render() {
        let cssUrl = this.displays.cssUrl;
        let screens = this.displays.screens;

        this.screens.before = {
            cssUrl,
            html: screens.before || ''
        };

        if (screens.after) {
            this.screens.after = {
                cssUrl,
                html: screens.after
            };
        } else {
            this.screens.after = false;
        }
    }

    private onOpenListTemplates() {
        this.eventSrv.emit('openListTemplates', true);
    }

    private updateDisplays(displays) {
        this.displays = displays;
        this.displaysChange.next(displays);
        this.render();
        this.reloadEditor();
    }

    private onUpdateBeforeTemplate(html) {
        this.displays.screens.before = html;
        this.displaysChange.next(this.displays);
    }

    private onUpdateAfterTemplate(html) {
        this.displays.screens.after = html;
        this.displaysChange.next(this.displays);
    }

    private reloadEditor() {
        if (this.afterSignup) {
            this.afterSignup.hide();
        }

        if (this.beforeSignup) {
            this.beforeSignup.reloadAndOpen();
        }
    }
}
