import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AutoResponseEmail} from "../../../classes/auto-response-email";
import {StorageService} from "../../../services/storage.service";
import {CampaignService} from "../../services/campaign.service";
import {MkUser} from "../../../classes/mk-user";

@Component({
    selector: 'mk-email-campaign',
    templateUrl: './email-campaign.component.html',
    styleUrls: ['./email-campaign.component.scss'],
    providers: [CampaignService]
})
export class EmailCampaignComponent implements OnInit {
    @Input() autoResponse: AutoResponseEmail;
    @Input() campaignId: string;
    @Output() autoResponseChange: EventEmitter<any> = new EventEmitter<any>();

    private user: MkUser = null;

    private loading: boolean = false;

    constructor(private storageSrv: StorageService,
                private campaignSrv: CampaignService) {
    }

    ngOnInit() {
        this.user = this.storageSrv.getCurrentUser();
    }

    onSendTestEmail(data: any) {
        this.campaignSrv.sendTestEmail(this.campaignId, data);
    }

    onSaveChanges(email: any) {
        let {subject, body} = email;
        this.autoResponse.subject = subject;
        this.autoResponse.body = body;

        this.confirmUpdate();
    }

    onToggle() {
        this.confirmUpdate();
    }

    confirmUpdate() {
        this.loading = true;
        this.campaignSrv
            .update(this.campaignId, {
                autoResponseEmail: this.autoResponse
            })
            .subscribe(
                () => {
                    this.loading = false;
                    this.autoResponseChange.next(this.autoResponse);
                },
                () => {
                    this.loading = false;
                }
            );
    }
}
