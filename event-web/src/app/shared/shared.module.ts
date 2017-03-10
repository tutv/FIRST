import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from "./loading/loading.component";
import {ButtonFullscreenComponent} from "./button-fullscreen/button-fullscreen.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoadingComponent,
        ButtonFullscreenComponent
    ],
    exports: [
        LoadingComponent,
        ButtonFullscreenComponent
    ]
})
export class SharedModule {
}
