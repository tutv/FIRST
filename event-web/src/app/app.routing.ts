import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
//Layouts
import {FullLayoutComponent} from "./dashboard/layouts/full-layout.component";
import {PagesLayoutMasterComponent} from "./pages/pages-layout-master/pages-layout-master.component";
import {SettingsLayoutMasterComponent} from "./settings/settings-layout-master/settings-layout-master.component";
import {AuthGuardService} from "./services/auth-guard.service";

export const routes: Routes = [
    {
        path: 'a',
        component: FullLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
                canLoad: [AuthGuardService]
            }
        ]
    },
    {
        path: 'settings',
        component: SettingsLayoutMasterComponent,
        children: [
            {
                path: '',
                loadChildren: 'app/settings/settings.module#SettingsModule',
                canLoad: [AuthGuardService]
            }
        ]
    },
    {
        path: '',
        component: PagesLayoutMasterComponent,
        children: [
            {
                path: '',
                loadChildren: 'app/pages/pages.module#PagesModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
