import {Injectable} from "@angular/core";
import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";

@Injectable()
export class BusinessGuardService implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let isSelected = this.isSelectedBusiness();

        if (!isSelected) {
            this.router.navigate(['/a/business']);
        }

        return isSelected;
    }

    constructor(private storageSrv: StorageService,
                private router: Router) {
    }

    isSelectedBusiness() {
        let business = this.storageSrv.get('business') || false;

        return Boolean(business);
    }

}
