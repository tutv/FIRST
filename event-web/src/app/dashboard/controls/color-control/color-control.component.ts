import {Component, OnInit, OnChanges} from "@angular/core";
import {ObControl} from "../../../classes/ob-control";
import {ControlEventService} from "../../services/control-event.service";

@Component({
    selector: 'app-color-control',
    templateUrl: 'color-control.component.html',
    styleUrls: ['color-control.component.scss']
})
export class ColorControlComponent extends ObControl implements OnInit, OnChanges {
    constructor(private controlEventSrv: ControlEventService) {
        super(controlEventSrv);
    }

    ngOnInit() {
    }

    ngOnChanges() {
    }

    public invertColor() {
        let color = this.value;
        if (color.length == 4) {
            color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
        }

        color = color.substring(1);
        let x = parseInt(color, 16);
        x = 0xFFFFFF ^ x;
        color = x.toString(16);
        color = ("000000" + color).slice(-6);
        color = "#" + color;

        return color;
    }

}
