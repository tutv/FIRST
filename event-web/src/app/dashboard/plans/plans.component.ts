import {Component, OnInit, ViewChild} from "@angular/core";
import {AppService} from "../../services/app.service";
import {StorageService} from "../../services/storage.service";
import {CheckoutComponent} from "../checkout/checkout.component";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'mk-plans',
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
    @ViewChild('checkout') public modalCheckout: CheckoutComponent;

    private slug: string = 'pu';
    private app: any = {};
    private businessId: string;

    constructor(private appService: AppService,
                private title: Title,
                private storageSrv: StorageService) {
    }

    ngOnInit() {
        this.captureBusiness();
        this.fetch();
        this.title.setTitle('Plans');
    }

    captureBusiness() {
        let business = this.storageSrv.get('business');
        this.businessId = business._id;
    }

    fetch() {
        this.appService.plans(this.slug)
            .subscribe(
                response => {
                    this.app = response.data;
                }
            );
    }

    onSelectPlan(plan: any) {
        this.openCheckout(plan);
    }

    openCheckout(plan: any) {
        this.modalCheckout.select(plan, this.businessId);
    }

}
