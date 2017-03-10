import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {CampaignComponent} from "./campaign/campaign.component";
import {CampaignsComponent} from "./campaigns/campaigns.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'events',
        pathMatch: 'full'
    },
    {
        path: 'events/:id',
        component: CampaignComponent,
    },
    {
        path: 'events',
        component: CampaignsComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
