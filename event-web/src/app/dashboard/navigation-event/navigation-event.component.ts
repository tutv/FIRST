import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'mk-navigation-event',
    templateUrl: './navigation-event.component.html',
    styleUrls: ['./navigation-event.component.scss']
})
export class NavigationEventComponent implements OnInit {

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

}
