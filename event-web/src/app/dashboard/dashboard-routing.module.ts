import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ReportsComponent} from "./reports/reports.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {CampaignComponent} from "./campaign/campaign.component";
import {CampaignsComponent} from "./campaigns/campaigns.component";
import {ChooseBusinessComponent} from "./choose-business/choose-business.component";
import {BusinessGuardService} from "./services/business-guard.service";
import {PlansComponent} from "./plans/plans.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'campaigns',
        pathMatch: 'full'
    },
    {
        path: 'business',
        component: ChooseBusinessComponent
    },
    {
        path: 'campaigns/:id',
        component: CampaignComponent,
        canActivate: [BusinessGuardService]
    },
    {
        path: 'campaigns',
        component: CampaignsComponent,
        canActivate: [BusinessGuardService]
    },
    {
        path: 'contacts',
        component: ContactsComponent,
        canActivate: [BusinessGuardService]
    },
    {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [BusinessGuardService]
    },
    {
        path: 'plans',
        component: PlansComponent,
        canActivate: [BusinessGuardService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
