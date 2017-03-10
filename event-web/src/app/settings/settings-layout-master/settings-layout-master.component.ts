import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-settings-layout-master',
    templateUrl: './settings-layout-master.component.html',
    styleUrls: ['./settings-layout-master.component.scss']
})
export class SettingsLayoutMasterComponent implements OnInit {
    public status: {isopen: boolean} = {isopen: false};

    constructor() {
    }

    ngOnInit() {
    }

}
