import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from "@angular/core";
import {NewEmailSyncComponent} from "../new-email-sync/new-email-sync.component";

@Component({
    selector: 'app-form-campaign',
    templateUrl: 'form-campaign.component.html',
    styleUrls: ['form-campaign.component.scss']
})
export class FormCampaignComponent implements OnInit {
    @ViewChild('new_email_sync') public new_email_sync: NewEmailSyncComponent;

    @Input() public campaignId: string;
    @Input() public settings: any;
    @Output() public settingsChange: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    onUpdate() {
        this.settingsChange.next(this.settings);
    }

}
