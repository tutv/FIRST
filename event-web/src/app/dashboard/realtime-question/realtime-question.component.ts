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
        responsive: false
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
        this.barChartLabels = [this.question.as1, this.question.as2, this.question.as3, this.question.as4];

        let stats = this.question.stats;
        let data = [0, 0, 0, 0];
        if (stats) {
            data[0] = stats.as1 || 0;
            data[1] = stats.as2 || 0;
            data[2] = stats.as3 || 0;
            data[3] = stats.as4 || 0;
        }

        this.barChartData = [
            {data: data, label: this.question.content}
        ];
    }
}
