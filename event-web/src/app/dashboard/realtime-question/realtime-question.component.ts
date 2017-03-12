import {Component, OnInit, Input, ViewChild, OnDestroy} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {CampaignService} from "../services/campaign.service";
import {EventService} from "../services/event.service";
import {HelperService} from "../../services/helper.service";

@Component({
    selector: 'mk-realtime-question',
    templateUrl: './realtime-question.component.html',
    styleUrls: ['./realtime-question.component.scss'],
    providers: [CampaignService, HelperService]
})
export class RealtimeQuestionComponent implements OnInit, OnDestroy {
    public barChartOptions: any = {
        responsive: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    public barChartLabels: string[] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public barChartData: any[] = [];

    @ViewChild('modal') public modal: ModalDirective;

    private path: string;

    private question: any = {
        content: '',
        as1: '',
        as2: '',
        as3: '',
        as4: '',
    };

    private viewChart: boolean = false;

    private numberAnswers: number = 0;

    constructor(private campaignSrv: CampaignService,
                private helperSrv: HelperService,
                private eventSrv: EventService) {
    }

    ngOnInit() {
        let sub = this.modal.onShown.subscribe(
            () => {
                this.viewChart = true;
            }
        );

        let sub2 = this.modal.onHidden.subscribe(
            () => {
                this.viewChart = false;
            }
        );

        this.eventSrv.register('modal1', sub);
        this.eventSrv.register('modal2', sub2);
    }

    ngOnDestroy() {
        this.eventSrv.deregister('modal1');
        this.eventSrv.deregister('modal2');
    }

    open(path: string) {
        this.path = path;
        this.fetchQuestion();
        this.modal.show();
        this.helperSrv.openFullScreen();
    }

    close() {
        this.modal.hide();
    }

    fetchQuestion() {
        this.campaignSrv.object(this.path)
            .subscribe(
                question => {
                    this.question = question;

                    this.renderChart();
                }
            );
    }

    renderChart() {
        let stats = this.question.stats;
        let data = [0, 0, 0, 0];
        if (stats) {
            let as1 = stats.as1 || {};
            let as2 = stats.as2 || {};
            let as3 = stats.as3 || {};
            let as4 = stats.as4 || {};
            data[0] = Object.keys(as1).length;
            data[1] = Object.keys(as2).length;
            data[2] = Object.keys(as3).length;
            data[3] = Object.keys(as4).length;
        }

        this.barChartData = [
            {data: data, label: this.question.content}
        ];

        this.barChartLabels = [
            this.question.as1,
            this.question.as2,
            this.question.as3,
            this.question.as4
        ];

        this.count(data);
    }

    count(data: Array<number>) {
        this.numberAnswers = 0;
        for (let i = 0; i < data.length; i++) {
            this.numberAnswers += data[i];
        }
    }
}
