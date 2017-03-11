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

    onUpdateName(index: number, name: string) {
        this.timelines[index].name = name;
        this.onUpdate();
    }

    onUpdatePlace(index: number, place: string) {
        this.timelines[index].place = place;
        this.onUpdate();
    }

    onToggleEnable(index: number) {
        this.timelines[index].enabled = !this.timelines[index].enabled;
        this.onUpdate();
    }

    onClickUpdate($event: Event) {
        $event.preventDefault();
        this.onUpdate();
    }

    onUpdate() {
        this.update.next(this.timelines);
    }
}
