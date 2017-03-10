import {Component, OnInit, Input} from "@angular/core";
import {EmailSyncService} from "../../services/email-sync.service";

@Component({
    selector: 'mk-list-email-sync',
    templateUrl: 'list-email-sync.component.html',
    styleUrls: ['list-email-sync.component.scss'],
    providers: [EmailSyncService]
})
export class ListEmailSyncComponent implements OnInit {
    @Input() public campaignId: string;

    private lists: Array<any> = [];

    constructor(private emailSyncSrv: EmailSyncService) {
    }

    ngOnInit() {
        this.fetchList();
    }

    fetchList() {
        this.emailSyncSrv.lists(this.campaignId)
            .subscribe(
                response => {
                    this.lists = response.data;
                }
            );
    }

    onClickDelete(id) {
        this.emailSyncSrv
            .remove(id)
            .subscribe(
                () => {
                    this.fetchList();
                }
            );
    }
}
