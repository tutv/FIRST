import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from "@angular/core";
import {ModalDirective} from "ng2-bootstrap";
import {EmailSyncService} from "../../services/email-sync.service";
import {LinkingService} from "../../../services/linking.service";
import {StorageService} from "../../../services/storage.service";

@Component({
    selector: 'mk-new-email-sync',
    templateUrl: './new-email-sync.component.html',
    styleUrls: ['./new-email-sync.component.scss'],
    providers: [EmailSyncService, LinkingService]
})
export class NewEmailSyncComponent implements OnInit {
    @ViewChild('modal') public modal: ModalDirective;

    @Input() public campaignId: string;
    @Output() public done: EventEmitter<any> = new EventEmitter<any>();

    private emailSync: any = {
        account: '',
        list: ''
    };

    private businessId: any = null;

    private accounts: Array<any> = [];
    private lists: Array<any> = [];

    private disabled: boolean = true;

    private loading: boolean = false;

    constructor(private emailSyncSrv: EmailSyncService,
                private storageSrv: StorageService,
                private linkingSrv: LinkingService) {
    }

    ngOnInit() {
        this.businessId = this.storageSrv.getBusinessId();
    }

    onChangeList() {
        this.validate();
    }

    private validate() {
        if (!this.emailSync.account || !this.emailSync.list) {
            this.disabled = true;
        } else {
            this.disabled = false;
        }
    }

    public show() {
        this.modal.show();
        this.fetchAccounts();
    }

    public hide() {
        this.modal.hide();
        this.reset();
    }

    private reset() {
        this.emailSync = {
            account: '',
            list: ''
        };
    }

    onClickCreate() {
        this.create();
    }

    onChangeAccount() {
        this.emailSync.list = '';
        this.validate();
        if (!this.emailSync.account) {
            return;
        }

        this.fetchDetailAccount();
    }

    fetchAccounts() {
        this.loading = true;
        this.linkingSrv.list(this.businessId)
            .subscribe(
                response => {
                    this.accounts = response.data;
                    this.loading = false;
                },
                () => {
                    this.loading = false;
                }
            );
    }

    fetchDetailAccount() {
        this.loading = true;

        this.linkingSrv.detail(this.businessId, this.emailSync.account)
            .subscribe(
                response => {
                    let account = response.data;
                    this.lists = account.lists || [];
                    this.loading = false;
                },
                () => {
                    this.loading = false;
                }
            );
    }

    create() {
        this.emailSyncSrv
            .create(
                this.campaignId, this.emailSync.account, this.emailSync.list
            )
            .subscribe(
                (response) => {
                    this.done.next(response.data);
                    this.hide();
                }
            );
    }
}
