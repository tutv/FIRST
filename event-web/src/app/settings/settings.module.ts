import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SettingsRoutingModule} from "./settings-routing.module";
import {ProfileComponent} from "./profile/profile.component";
import {LinkedAccountsComponent} from "./linked-accounts/linked-accounts.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {EditBusinessComponent} from "./edit-business/edit-business.component";

@NgModule({
    imports: [
        CommonModule,
        SettingsRoutingModule,
    ],
    declarations: [
        ProfileComponent,
        LinkedAccountsComponent,
        ChangePasswordComponent,
        EditBusinessComponent
    ]
})
export class SettingsModule {
}
