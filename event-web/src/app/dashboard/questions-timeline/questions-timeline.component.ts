import {Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import {MkQuestionTimeLine} from "../../classes/mk-question-timeline";
import {ModalDirective} from "ng2-bootstrap";
import {CampaignService} from "../services/campaign.service";

@Component({
    selector: 'mk-questions-timeline',
    templateUrl: './questions-timeline.component.html',
    styleUrls: ['./questions-timeline.component.scss'],
    providers: [CampaignService]
})
export class QuestionsTimelineComponent implements OnInit {
    @ViewChild('modal') public modal: ModalDirective;
    @Input() index: number;
    @Input() eventId: string;

    @Output() resolve = new EventEmitter<any>();

    public lists: Array<MkQuestionTimeLine> = [];

    constructor(private campaignSrv: CampaignService) {
    }

    ngOnInit() {
        this.fetchQuestions()
    }

    fetchQuestions() {
        this.campaignSrv.getQuestionsTimeline(this.eventId, this.index)
            .subscribe(
                questions => {
                    this.lists = questions;
                }
            );
    }

    onClickResolve($event: Event, $key: string) {
        $event.preventDefault();

        this.resolveQuestion($key);
    }

    resolveQuestion($key: string) {
        if (!this.index) {
            return;
        }

        this.resolve.next({$key, index: this.index});
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
