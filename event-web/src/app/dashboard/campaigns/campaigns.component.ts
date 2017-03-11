import {Component, OnInit, ViewChild} from "@angular/core";
import {NewCampaignComponent} from "../new-campaign/new-campaign.component";
import {CampaignService} from "../services/campaign.service";
import {StorageService} from "../../services/storage.service";
import {Title} from "@angular/platform-browser";
import {MkCampaign} from "../../classes/mk-campaign";

@Component({
    selector: 'app-campaigns',
    templateUrl: './campaigns.component.html',
    styleUrls: ['./campaigns.component.scss'],
    providers: [CampaignService]
})
export class CampaignsComponent implements OnInit {
    @ViewChild('formCreate') public formCreate: NewCampaignComponent;

    private querySearch: string = '';
    private events: Array<MkCampaign> = [];

    constructor(private campaignSrv: CampaignService,
                private title: Title,
                private storageSrv: StorageService) {
    }

    ngOnInit() {
        this.title.setTitle('Events');

        this.campaignSrv.list()
            .subscribe(
                events => {
                    this.events = events;
                }
            );
    }

    onOpenCreateForm() {
        this.formCreate.modal.show();
    }

    campaignsFiltered() {
        if (!this.querySearch.length) {
            return this.events;
        }

        return this.events
            .filter(
                event => {
                    if (!event.name) {
                        return false;
                    }

                    let query = this.querySearch.toLowerCase();
                    let name = event.name.toLowerCase();

                    return name.indexOf(query) !== -1;
                }
            );
    }

}
