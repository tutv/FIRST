import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {CampaignService} from "../services/campaign.service";
import {MkQuestion} from "../../classes/mk-question";
import {ModalDirective} from "ng2-bootstrap";
import {RealtimeQuestionComponent} from "../realtime-question/realtime-question.component";

@Component({
    selector: 'mk-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
    providers: [CampaignService]
})
export class QuestionsComponent implements OnInit {
    @ViewChild('modal') public modal: ModalDirective;
    @ViewChild('realtimeQuestion') public realtimeQuestion: RealtimeQuestionComponent;

    @Input() public eventId: string;

    public questions: Array<MkQuestion> = [];

    public newQuestion = {
        content: '',
        as1: 'Lựa chọn 1',
        as2: 'Lựa chọn 2',
        as3: 'Lựa chọn 3',
        as4: 'Lựa chọn 4',
    };

    constructor(private campaignSrv: CampaignService) {
    }

    ngOnInit() {
        this.fetchQuestions();
    }

    onClickPushQuestion($event: Event, question: MkQuestion) {
        this.viewQuestion(question);
        this.pushQuestion(question);
    }

    onClickViewResult($event: Event, question: MkQuestion) {
        this.viewQuestion(question);
    }

    viewQuestion(question: MkQuestion) {
        let path = 'events/' + this.eventId + '/questions/' + question.$key;
        this.realtimeQuestion.open(path);
    }

    pushQuestion(question: MkQuestion) {
        let path = 'events/' + this.eventId + '/questions/' + question.$key;

        let question_id = question.$key;
        let event_id = this.eventId;
        let as1 = question.as1;
        let as2 = question.as2;
        let as3 = question.as3;
        let as4 = question.as4;

        let title = 'Câu hỏi nhanh';
        let content = question.content;

        this.campaignSrv.pushQuestion({event_id, question_id, title, content, as1, as2, as3, as4})
            .subscribe(
                (response) => {
                    console.log(response);
                }
            );
    }

    fetchQuestions() {
        this.campaignSrv.getQuestions(this.eventId)
            .subscribe(
                questions => {
                    this.questions = questions;
                }
            );
    }

    onClickCreate($event: Event) {
        $event.preventDefault();

        this.campaignSrv.createQuestion(this.eventId, this.newQuestion)
            .subscribe(
                question => {
                    this.modal.hide();
                }
            );
    }

    open() {
        this.newQuestion = {
            content: '',
            as1: 'Lựa chọn 1',
            as2: 'Lựa chọn 2',
            as3: 'Lựa chọn 3',
            as4: 'Lựa chọn 4',
        };
        this.modal.show();
    }
}
