import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CampaignService} from "../services/campaign.service";
import {MkTimeLine} from "../../classes/mk-timeline";

@Component({
    selector: 'mk-edit-timeline',
    templateUrl: './edit-timeline.component.html',
    styleUrls: ['./edit-timeline.component.scss'],
    providers: [CampaignService]
})
export class EditTimelineComponent implements OnInit {
    @Input() public eventId: string;
    @Output() public update = new EventEmitter<any>();

    public timelines: Array<MkTimeLine> = [];

    constructor(private campaignSrv: CampaignService) {
    }

    ngOnInit() {
        this.fetch();
    }

    fetch() {
        this.campaignSrv.getTimelines(this.eventId)
            .subscribe(
                data => {
                    this.timelines = data;
                }
            );
    }

    onResolveQuestion(args: any) {
        let {$key, index} = args;

        this.onUpdate(index, 'questions/' + $key + '/resolve', true);
    }

    onUpdateName(index: number, name: string) {
        this.onUpdate(index, 'name', name);
    }

    onUpdatePlace(index: number, place: string) {
        this.onUpdate(index, 'place', place);
    }

    onUpdateDescription(index: number, description: string) {
        this.onUpdate(index, 'description', description);
    }

    onToggleEnable(index: number) {
        this.onUpdate(index, 'enabled', !this.timelines[index].enabled);
    }

    onUpdate(index: number, key: string, value: any) {
        let data = this.timelines;

        let temp = [];
        for (let i = 0; i < data.length; i++) {
            temp.push(data[i]);
        }

        this.update.next({index, key, value});
    }
}
