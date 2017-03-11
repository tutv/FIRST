import {Component, OnInit} from "@angular/core";
import {CampaignService} from "../services/campaign.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MkCampaign} from "../../classes/mk-campaign";
import {Title} from "@angular/platform-browser";
import {MkUser} from "../../classes/mk-user";

@Component({
    selector: 'app-campaign',
    templateUrl: 'campaign.component.html',
    styleUrls: ['campaign.component.scss'],
    providers: [CampaignService]
})
export class CampaignComponent implements OnInit {
    public id: string = '';
    public event: MkCampaign = null;

    public users: Array<MkUser> = [];

    private loading: boolean = true;

    private editingOverview: boolean = false;

    constructor(private campaignSrv: CampaignService,
                private activatedRoute: ActivatedRoute,
                private title: Title,
                private router: Router) {
    }

    ngOnInit() {
        this.captureParams();
    }

    onUpdateTimelines(timelines: any) {
        this.campaignSrv.updateTimelines(this.id, timelines)
            .then();
    }

    onUpdateName(name) {
        this.update({name});
    }

    onUpdatePlace(place) {
        this.update({place});
    }

    onClickSaveOverview() {
        this.editingOverview = false;

        this.update({
            overview: this.event.overview
        });
    }

    onClickEditOverview() {
        this.editingOverview = true;
    }

    update(data) {
        this.campaignSrv.update(this.id, data)
            .then(
                () => {
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

        this.campaignSrv.getUsers(this.id)
            .subscribe(
                (users) => {
                    this.users = users;
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
