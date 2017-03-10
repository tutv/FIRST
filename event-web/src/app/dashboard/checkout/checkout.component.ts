import {Component, OnInit, ViewChild} from "@angular/core";
import {ModalDirective} from "ng2-bootstrap";
import {AppService} from "../../services/app.service";
import {HelperService} from "../../services/helper.service";

@Component({
    selector: 'mk-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
    providers: [HelperService]
})
export class CheckoutComponent implements OnInit {
    @ViewChild('modal') public modal: ModalDirective;

    private plan: any;
    private businessId: string;

    private processing: boolean = false;

    constructor(private appSrv: AppService,
                private helperSrv: HelperService) {
    }

    ngOnInit() {
    }

    select(plan: any, businessId: string): void {
        this.plan = plan;
        this.businessId = businessId;
        this.show();
    }

    onClickConfirm(event: MouseEvent) {
        this.createBill();
    }

    private createBill() {
        this.processing = true;
        this.appSrv.createBill(this.plan._id, this.businessId)
            .subscribe(
                response => {
                    this.helperSrv.redirect(response.data);
                },
                error => {
                    console.log(error);
                    this.processing = false;
                }
            );
    }

    private hide() {
        this.modal.hide();
    }

    private show() {
        this.modal.show();
    }
}
