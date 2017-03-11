import {Component, OnInit} from "@angular/core";
import {CampaignService} from "../services/campaign.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MkCampaign} from "../../classes/mk-campaign";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-campaign',
    templateUrl: 'campaign.component.html',
    styleUrls: ['campaign.component.scss'],
    providers: [CampaignService]
})
export class CampaignComponent implements OnInit {
    public id: string = '';
    public event: MkCampaign = null;

    public tab: string = 'design';

    private loading: boolean = true;

    constructor(private campaignSrv: CampaignService,
                private activatedRoute: ActivatedRoute,
                private title: Title,
                private router: Router) {
    }

    ngOnInit() {
        this.captureParams();
    }

    onClickChangeTab(tab: string) {
        this.tab = tab;
    }

    onClickActivate() {
        this.campaignSrv
            .activate(this.id)
            .subscribe(
                (response) => {
                    this.event = response.data;
                }
            );
    }

    onClickDeactivate() {
        this.campaignSrv
            .deactivate(this.id)
            .subscribe(
                (event) => {
                    this.event = event;
                }
            );
    }

    onUpdateName(name) {
        this.update({name});
    }

    onUpdateDisplays(displays) {
        this.update({displays});
    }

    onUpdateFormSettings(settings: any) {
        this.campaignSrv.updateFormSettings(this.id, settings);
    }

    onUpdateConfigs(configs: any) {
        this.campaignSrv.updateSettings(this.id, configs);
    }

    onUpdateAutoResponseEmail(autoResponseEmail: any) {
        this.event.autoResponseEmail = autoResponseEmail;
    }

    update(data) {
        this.campaignSrv.update(this.id, data)
            .subscribe(
                event => {
                    this.event = event;
                    this.updateTitle();
                }
            );
    }

    captureParams() {
        this.activatedRoute.params
            .map(
                params => {
                    return params['id'] || '';
                }
            )
            .subscribe(
                id => {
                    this.id = id;
                    this.fetchDetail();
                }
            );
    }

    fetchDetail() {
        this.campaignSrv
            .detail(this.id)
            .subscribe(
                event => {
                    this.loading = false;
                    this.event = event;
                    this.updateTitle();
                }
            );
    }

    onClickDelete() {
        let confirm = window.confirm('Are you sure want to delete this campaign!');
        if (!confirm) {
            return;
        }

        this.deleteC();
    }

    deleteC() {
        this.campaignSrv
            .deleteC(this.id)
            .subscribe(
                response => {
                    this.router.navigate(['/a/campaigns']);
                }
            );
    }

    private updateTitle() {
        this.title.setTitle(this.event.name);
    }
}
