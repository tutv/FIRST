import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {CampaignService} from "../services/campaign.service";

@Component({
    selector: 'mk-create-notify',
    templateUrl: './create-notify.component.html',
    styleUrls: ['./create-notify.component.scss'],
    providers: [CampaignService]
})
export class CreateNotifyComponent implements OnInit {
    @ViewChild('modal') public modal: ModalDirective;

    @Input() public event_id: string;

    public title: string;
    public content: string;

    constructor(private campaignSrv: CampaignService) {
    }

    ngOnInit() {
    }

    open() {
        this.modal.show();
    }

    onClickCreate($event: Event) {
        $event.preventDefault();

        this.send();
    }

    send() {
        this.campaignSrv.sendNotification(this.event_id, this.title, this.content)
            .subscribe(
                data => {
                    this.reset();
                }
            );

        this.modal.hide();
    }

    reset() {
        this.title = '';
        this.content = '';
    }

}
