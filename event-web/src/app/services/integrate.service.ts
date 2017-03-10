import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable()
export class IntegrateService {

    constructor(private apiSrv: ApiService) {
    }

    shopify(shop: string, token: string) {
        let data = {
            shop,
            token
        };

        return this.apiSrv.request({
            method: 'POST',
            url: '/integrate/shopify',
            data,
        });
    }
}
