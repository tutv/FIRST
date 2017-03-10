import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {HelperService} from "../../services/helper.service";
import {environment} from "../../../environments/environment";
import {LinkingService} from "../../services/linking.service";

@Component({
    selector: 'mk-linked-accounts',
    templateUrl: './linked-accounts.component.html',
    styleUrls: ['./linked-accounts.component.scss'],
    providers: [HelperService, LinkingService]
})
export class LinkedAccountsComponent implements OnInit {
    private baseApi = environment.api;

    private integrations: Array<any> = [
        {
            host: 'mailchimp',
            logo: 'mailchimp.svg',
            name: 'MailChimp',
            url: '/mailchimp/oauth',
        },
        {
            host: 'shopify',
            logo: 'shopify.svg',
            name: 'Shopify'
        }
    ];

    private accounts: Array<any> = [];

    private businessId: string;

    constructor(private storageSrv: StorageService,
                private linkingSrv: LinkingService,
                private helperSrv: HelperService) {
    }

    ngOnInit() {
        this.captureBusiness();
        this.fetchAccounts();
    }

    fetchAccounts() {
        this.linkingSrv.list(this.businessId)
            .subscribe(
                response => {
                    this.accounts = response.data;
                }
            );
    }

    captureBusiness() {
        let business = this.storageSrv.get('business');
        this.businessId = business._id;
    }

    onClickIntegrate(event: Event, host: string) {
        event.preventDefault();

        let integration = this.getIntegration(host);
        if (!integration) {
            return;
        }

        this.integrate(integration.url);
    }

    integrate(url: string) {
        let redirectUrl = this.baseApi + url + `?businessId=${this.businessId}`;
        this.helperSrv.redirect(redirectUrl);
    }

    getIntegration(host: string): any {
        host = host.toLowerCase();

        return this.integrations.find(
            (item) => {
                return (item.host === host);
            }
        );
    }

    getIntegrationsAvailable() {
        return this.integrations.filter(
            (integration) => {
                return (integration.host != 'shopify');
            }
        );
    }

    onClickRemoveAccount(event: Event, id: string) {
        event.preventDefault();
        this.removeAccount(id);
    }

    removeAccount(id: string) {
        this.linkingSrv.remove(id)
            .subscribe(
                () => {
                    this.fetchAccounts();
                }
            );
    }
}
