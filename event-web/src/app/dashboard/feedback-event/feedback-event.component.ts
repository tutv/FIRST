import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {MkFeedback} from "../../classes/mk-feedback";

@Component({
    selector: 'mk-feedback-event',
    templateUrl: './feedback-event.component.html',
    styleUrls: ['./feedback-event.component.scss']
})
export class FeedbackEventComponent implements OnInit, OnChanges {
    @Input() public feedback;

    private feedbacks: Array<MkFeedback> = [];

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.convertToArray();
    }

    convertToArray() {
        if (!this.feedback) {
            return;
        }

        let keys = Object.keys(this.feedback);

        for (let i = 0; i < keys.length; i++) {
            let $key = keys[i];
            let feedback = this.feedback[$key];
            feedback.$key = $key;

            this.feedbacks.push(feedback);
        }
    }

}
