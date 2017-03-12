import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {MkQuestionTimeLine} from "../../classes/mk-question-timeline";
import {ModalDirective} from "ng2-bootstrap";

@Component({
    selector: 'mk-questions-timeline',
    templateUrl: './questions-timeline.component.html',
    styleUrls: ['./questions-timeline.component.scss']
})
export class QuestionsTimelineComponent implements OnInit {
    @ViewChild('modal') public modal: ModalDirective;

    @Input() questions: Array<any>;

    public lists: Array<MkQuestionTimeLine> = [];

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.convertToArray();
    }

    convertToArray() {
        if (!this.questions) {
            return;
        }

        let keys = Object.keys(this.questions);

        for (let i = 0; i < keys.length; i++) {
            let $key = keys[i];
            let q = this.questions[$key];
            q.$key = $key;

            this.lists.push(q);
        }
    }

    close() {
        this.modal.hide();
    }

    open() {
        if (!this.lists.length) {
            return;
        }
        this.modal.show();
    }

}
