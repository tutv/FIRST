import {Component} from "@angular/core";
import {NotifyService} from "./services/notify.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'body',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(public notifySrv: NotifyService,
                private titleSrv: Title) {
        this.titleSrv.setTitle('Event - FRIES - UET Hackathon 2017');
    }
}
