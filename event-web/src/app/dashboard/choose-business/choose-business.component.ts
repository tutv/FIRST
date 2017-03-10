import {Component, OnInit, Input} from "@angular/core";
import {StorageService} from "../../services/storage.service";
import {BusinessService} from "../../services/business.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-choose-business',
    templateUrl: './choose-business.component.html',
    styleUrls: ['./choose-business.component.scss'],
    providers: [BusinessService]
})
export class ChooseBusinessComponent implements OnInit {
    @Input() businesses: Array<any> = [];
    public businessId: string = '';

    constructor(private storageSrv: StorageService,
                private router: Router,
                private businessSrv: BusinessService) {
    }

    ngOnInit() {
        this.fetchListBusinesses();
        this.initChoosingDefault();
        this.initCurrentBusiness();
        this.detectAutoSwitch();
    }

    detectAutoSwitch() {
        if (this.businesses.length == 1) {
            this.verify();
        }
    }

    onChooseBusiness() {
        this.verify();
    }

    fetchListBusinesses() {
        let profile = this.storageSrv.get('profile');
        this.businesses = profile.businesses || [];
    }

    initChoosingDefault() {
        if (!this.businesses.length) {
            return;
        }

        let first = this.businesses[0];
        this.businessId = first._id || '';
    }

    initCurrentBusiness() {
        let currentBusiness = this.storageSrv.get('business') || false;

        if (!currentBusiness) {
            return;
        }

        this.businessId = currentBusiness._id;
    }

    verify() {
        this.businessSrv
            .verify(this.businessId)
            .subscribe(
                response => {
                    let data = response.data;
                    this.storageSrv.set('business', data);
                    this.router.navigate(['/a']);
                }
            );

    }
}
