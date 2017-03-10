import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'app-setting-campaign',
    templateUrl: 'setting-campaign.component.html',
    styleUrls: ['setting-campaign.component.scss']
})
export class SettingCampaignComponent implements OnInit, OnChanges {
    @Input() public settings: any = null;
    @Output() public updateSettings: EventEmitter<any> = new EventEmitter<any>();

    public defaults: any = {
        exitIntentEnabled: true,
        timeOnPageEnabled: false,
        timeOnPageValue: 10000,
        timeIdleEnabled: false,
        timeIdleValue: 10000,
        scrollEnabled: true,
        scrollValue: 50,
        pageViewEnabled: true,
        numberOfPage: 3,
        aggressiveMode: true,
        popupDelay: 0,
        cookieExpire: 0,
        device: 'all'
    };

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.settings = Object.assign(this.defaults, this.settings);
    }

    onUpdate() {
        this.save();
    }

    save() {
        this.updateSettings.next(this.settings);
    }
}
