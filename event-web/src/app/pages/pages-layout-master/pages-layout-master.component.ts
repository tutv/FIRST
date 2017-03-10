import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-home-layout-master',
    templateUrl: 'pages-layout-master.component.html',
    styleUrls: ['pages-layout-master.component.scss']
})
export class PagesLayoutMasterComponent implements OnInit {

    constructor(public authSrv: AuthService) {
    }

    ngOnInit() {
    }

}
