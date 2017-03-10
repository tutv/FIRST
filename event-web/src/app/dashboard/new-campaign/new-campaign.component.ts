import {Component, OnInit, ViewChild, Input, OnChanges} from "@angular/core";
import {ModalDirective} from "ng2-bootstrap";
import {CampaignService} from "../services/campaign.service";
import {StorageService} from "../../services/storage.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-new-campaign',
    templateUrl: './new-campaign.component.html',
    styleUrls: ['./new-campaign.component.scss'],
    providers: [CampaignService]
})
export class NewCampaignComponent implements OnInit, OnChanges {
    @Input() public toggle: boolean = false;
    @ViewChild('modal') public modal: ModalDirective;

    private campaign: any = {
        name: '',
        business: '',
        type: 'collect'
    };

    constructor(private campaignSrv: CampaignService,
                private storageSrv: StorageService,
                private router: Router) {
        let business = this.storageSrv.get('business');
        this.campaign.business = business._id || false;
    }

    onSubmit() {
        this.createCampaign();
    }

    ngOnChanges(): void {
        this.toggleModal();
    }

    toggleModal() {
        if (this.toggle) {
            this.modal.show();
        } else {
            this.modal.hide();
        }
    }

    ngOnInit() {
    }

    returnDefault() {
        this.campaign.name = '';
        this.modal.hide();
    }

    createCampaign() {
        this.campaignSrv.create(this.campaign)
            .subscribe(
                response => {
                    this.returnDefault();

                    let campaign = response.data;
                    this.router.navigate(['/a/campaigns/', campaign._id]);
                }
            );
    }

}
