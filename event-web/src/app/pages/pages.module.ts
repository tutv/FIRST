import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeRoutingModule} from "./pages-routing.module";
import {LoginComponent} from "./login/login.component";
import {FeaturesComponent} from "./features/features.component";
import {PricingComponent} from "./pricing/pricing.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {Page404Component} from "./page-404/page-404.component";
import {RegisterComponent} from "./register/register.component";
import {FormsModule} from "@angular/forms";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {LoginTokenComponent} from "./login-token/login-token.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        HomePageComponent,
        FeaturesComponent,
        PricingComponent,
        LoginComponent,
        RegisterComponent,
        Page404Component,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        LoginTokenComponent
    ]
})
export class PagesModule {
}
