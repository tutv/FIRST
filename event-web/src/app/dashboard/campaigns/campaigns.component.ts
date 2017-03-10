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

    private businessId: string = '';
    private listCampaigns: Array<any> = [];
    private querySearch: string = '';

    constructor(private campaignSrv: CampaignService,
                private title: Title,
                private storageSrv: StorageService) {
    }

    onOpenCreateForm() {
        this.formCreate.modal.show();
    }

    ngOnInit() {
        this.fetchCurrentBusiness();
        this.fetchListCampaigns();
        this.title.setTitle('Campaigns');
    }

    fetchCurrentBusiness() {
        let business = this.storageSrv.get('business');
        this.businessId = business._id || false;
    }

    fetchListCampaigns() {
        this.campaignSrv
            .list(this.businessId)
            .subscribe(
                response => {
                    this.listCampaigns = response.data;
                }
            );
    }

    campaignsFiltered() {
        if (!this.querySearch.length) {
            return this.listCampaigns;
        }

        return this.listCampaigns
            .filter(
                campaign => {
                    if (!campaign.name) {
                        return false;
                    }

                    let query = this.querySearch.toLowerCase();
                    let name = campaign.name.toLowerCase();

                    return name.indexOf(query) !== -1;
                }
            )
    }

}
