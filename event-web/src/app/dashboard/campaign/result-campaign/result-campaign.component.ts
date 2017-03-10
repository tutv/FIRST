import {Component, OnInit, Input} from "@angular/core";
import {CampaignService} from "../../services/campaign.service";

@Component({
    selector: 'mk-result-campaign',
    templateUrl: './result-campaign.component.html',
    styleUrls: ['./result-campaign.component.scss'],
    providers: [CampaignService]
})
export class ResultCampaignComponent implements OnInit {
    @Input() public campaignID: string;

    public results: Array<any> = [];

    constructor(private campaignSrv: CampaignService) {
    }

    ngOnInit() {
        this.fetchResults();
    }

    fetchResults() {
        this.campaignSrv.getResults(this.campaignID)
            .subscribe(
                response => {
                    this.results = response.data;
                }
            );
    }

    onClickDownloadCSV(event: MouseEvent) {
        event.preventDefault();

        this.campaignSrv.exportCSV(this.campaignID);
    }

}
