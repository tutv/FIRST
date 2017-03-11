import {Component, OnInit, Input, OnChanges, ViewChild} from '@angular/core';
import {MkFeedback} from "../../classes/mk-feedback";
import {ModalDirective} from "ng2-bootstrap";

@Component({
    selector: 'mk-feedback-event',
    templateUrl: './feedback-event.component.html',
    styleUrls: ['./feedback-event.component.scss']
})
export class FeedbackEventComponent implements OnInit, OnChanges {
    @ViewChild('modal') public modal: ModalDirective;

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

    close() {
        this.modal.hide();
    }

    open() {
        if (!this.feedbacks.length) {
            return;
        }
        this.modal.show();
    }

}
