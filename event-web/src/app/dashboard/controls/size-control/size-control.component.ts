import {Component, OnInit, OnChanges, SimpleChanges} from "@angular/core";
import {ObControl} from "../../../classes/ob-control";
import {ControlEventService} from "../../services/control-event.service";

@Component({
    selector: 'app-size-control',
    templateUrl: 'size-control.component.html',
    styleUrls: ['size-control.component.scss']
})
export class SizeControlComponent extends ObControl implements OnInit, OnChanges {
    constructor(private controlEventSrv: ControlEventService) {
        super(controlEventSrv);
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (isNaN(this.value)) {
            if (this.value.indexOf('px') != -1) {
                this.value = this.value.replace('px', '');
            }
        }
    }

}
