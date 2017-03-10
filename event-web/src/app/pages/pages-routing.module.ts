import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {FeaturesComponent} from "./features/features.component";
import {PricingComponent} from "./pricing/pricing.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {Page404Component} from "./page-404/page-404.component";
import {RegisterComponent} from "./register/register.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {LoginTokenComponent} from "./login-token/login-token.component";

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'features',
        component: FeaturesComponent
    },
    {
        path: 'pricing',
        component: PricingComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'reset-password/:token',
        component: ResetPasswordComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'auth/:token',
        component: LoginTokenComponent
    },
    {
        path: '**',
        component: Page404Component
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
