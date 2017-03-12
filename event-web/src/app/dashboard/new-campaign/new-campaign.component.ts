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
        status: 'publish',
        place: 'Địa điểm tham dự',
        overview: 'Thông tin tổng quan về sự kiện.',
        banner: 'https://i.imgur.com/7N1CEvL.jpg',
        map: 'https://i.imgur.com/270sxnX.jpg',
        timelines: [
            {
                description: "Với sự tham gia của nhiều nhà tổ chức lớn như V...",
                enabled: true,
                end_time: 1489194000000,
                is_online: true,
                name: "Lễ khai mạc và đăng kí xác nhận đội thi",
                place: "210 E3",
                related: "",
                start_time: 1489183200000
            }
        ]
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
