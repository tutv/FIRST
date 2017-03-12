import {Component, OnInit, ViewChild} from '@angular/core';
import {CreateNotifyComponent} from "../create-notify/create-notify.component";

@Component({
    selector: 'mk-navigation-event',
    templateUrl: './navigation-event.component.html',
    styleUrls: ['./navigation-event.component.scss']
})
export class NavigationEventComponent implements OnInit {
    @ViewChild('notify') public notify: CreateNotifyComponent;

    constructor() {
    }

    ngOnInit() {
    }

    onClick(target) {
        this.scrollElement(target);
    }

    public scrollElement(target) {
        let element = document.getElementById(target);
        window.scrollTo(0, element.offsetTop);
    }

    onClickCreateNotify($event: Event) {
        $event.preventDefault();

        this.notify.open();
    }

}
