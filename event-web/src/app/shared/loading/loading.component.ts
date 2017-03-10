import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'mk-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
    @Input() toggle: boolean = false;
    @Input() title: string = '';

    constructor() {
    }

    ngOnInit() {
    }

}
