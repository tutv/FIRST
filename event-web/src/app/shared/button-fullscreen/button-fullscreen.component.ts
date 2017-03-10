import {Component, OnInit} from '@angular/core';
import {HelperService} from "../../services/helper.service";

@Component({
    selector: 'mk-button-fullscreen',
    templateUrl: 'button-fullscreen.component.html',
    styleUrls: ['button-fullscreen.component.scss'],
    providers: [HelperService]
})
export class ButtonFullscreenComponent implements OnInit {
    private fullScreen: boolean = false;

    constructor(private helperSrv: HelperService) {
    }

    ngOnInit() {
    }

    public onClick() {
        this.helperSrv.toggleFullScreen();
        this.fullScreen = this.helperSrv.isFullScreen();
    }
}
