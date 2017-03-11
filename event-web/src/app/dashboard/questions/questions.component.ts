import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'mk-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
    @Input() public eventId: string;

    constructor() {
    }

    ngOnInit() {
    }

}
