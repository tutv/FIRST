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

    private event: any = {
        name: '',
        status: 'Publish'
    };

    constructor(private campaignSrv: CampaignService,
                private storageSrv: StorageService,
                private router: Router) {
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
        this.event.name = '';
        this.modal.hide();
    }

    createCampaign() {
        let event_id = this.campaignSrv.create(this.event);
        this.router.navigate(['/a/events/' + event_id]);
    }

}
