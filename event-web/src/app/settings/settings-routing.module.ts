import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {EditBusinessComponent} from "./edit-business/edit-business.component";
import {LinkedAccountsComponent} from "./linked-accounts/linked-accounts.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'password',
        component: ChangePasswordComponent
    },
    {
        path: 'edit-business',
        component: EditBusinessComponent
    },
    {
        path: 'linked-accounts',
        component: LinkedAccountsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {
}
