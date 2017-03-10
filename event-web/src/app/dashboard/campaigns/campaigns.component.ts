import {Component, OnInit, ViewChild} from "@angular/core";
import {NewCampaignComponent} from "../new-campaign/new-campaign.component";
import {CampaignService} from "../services/campaign.service";
import {StorageService} from "../../services/storage.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-campaigns',
    templateUrl: './campaigns.component.html',
    styleUrls: ['./campaigns.component.scss'],
    providers: [CampaignService]
})
export class CampaignsComponent implements OnInit {
    @ViewChild('formCreate') public formCreate: NewCampaignComponent;


    constructor(private campaignSrv: CampaignService,
                private title: Title,
                private storageSrv: StorageService) {
    }

    ngOnInit() {
        this.title.setTitle('Events');
    }

}
