import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
import {AppComponent} from "./app.component";
import {NAV_DROPDOWN_DIRECTIVES} from "./shared/nav-dropdown.directive";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "./shared/sidebar.directive";
import {AsideToggleDirective} from "./shared/aside.directive";
import {BreadcrumbsComponent} from "./shared/breadcrumb.component";
import {SmartResizeDirective} from "./shared/smart-resize.directive";
import {NgProgressModule} from "ng2-progressbar";
// Routing Module
import {AppRoutingModule} from "./app.routing";
//Layouts
import {FullLayoutComponent} from "./dashboard/layouts/full-layout.component";
import {PagesLayoutMasterComponent} from "./pages/pages-layout-master/pages-layout-master.component";
import {SettingsLayoutMasterComponent} from "./settings/settings-layout-master/settings-layout-master.component";
import {ListNavsDashboardComponent} from "./dashboard/list-navs-dashboard/list-navs-dashboard.component";
import {DropdownAccountComponent} from "./settings/dropdown-account/dropdown-account.component";
import {ApiService} from "./services/api.service";
import {HttpModule} from "@angular/http";
import {NotifyService} from "./services/notify.service";
import {ToasterModule, ToasterService} from "angular2-toaster";
import {StorageService} from "./services/storage.service";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {DropdownModule} from "ng2-bootstrap/dropdown";
import {FooterComponent} from "./shared/footer/footer.component";
import {AppService} from "./services/app.service";
import {SidebarSettingsComponent} from "./settings/sidebar-settings/sidebar-settings.component";
import {SharedModule} from "./shared/shared.module";

import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';

const myFirebaseConfig = {
    apiKey: "AIzaSyARwPaIyEUEfckXV1Ijmp3GDR3aal5AFog",
    authDomain: "event-f2831.firebaseapp.com",
    databaseURL: "https://event-f2831.firebaseio.com",
    storageBucket: "event-f2831.appspot.com",
    messagingSenderId: "237982710017"
};

const myFirebaseAuthConfig = {
    provider: AuthProviders.Facebook,
    method: AuthMethods.Redirect
};

@NgModule({
    imports: [
        AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig),
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        ToasterModule,
        NgProgressModule,
        SharedModule,
        DropdownModule.forRoot()
    ],
    declarations: [
        AppComponent,
        ListNavsDashboardComponent,
        DropdownAccountComponent,
        FullLayoutComponent,
        PagesLayoutMasterComponent,
        SettingsLayoutMasterComponent,
        NAV_DROPDOWN_DIRECTIVES,
        BreadcrumbsComponent,
        SIDEBAR_TOGGLE_DIRECTIVES,
        AsideToggleDirective,
        SmartResizeDirective,
        FooterComponent,
        SidebarSettingsComponent
    ],
    providers: [
        CookieService,
        StorageService,
        ApiService,
        AppService,
        ToasterService,
        NotifyService,
        AuthService,
        AuthGuardService,
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
