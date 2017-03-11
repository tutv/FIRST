import {Component, OnInit, Input} from '@angular/core';
import {CampaignService} from "../services/campaign.service";

@Component({
    selector: 'mk-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
    providers: [CampaignService]
})
export class QuestionsComponent implements OnInit {
    @Input() public eventId: string;

    public questions: Array<MkQuestion> = [];

    constructor(private campaignSrv: CampaignService) {
    }

    ngOnInit() {
        this.fetchQuestions();
    }

    fetchQuestions() {
        this.campaignSrv.getQuestions(this.eventId)
            .subscribe(
                questions => {
                    this.questions = questions;
                }
            );
    }

}
