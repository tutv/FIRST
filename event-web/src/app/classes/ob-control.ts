import {ControlEventService} from "../dashboard/services/control-event.service";
import {Input, Output, EventEmitter} from "@angular/core";

export class ObControl {
    @Input() public name;
    @Input() public value: any = 0;
    @Output() public onChange: EventEmitter<any> = new EventEmitter<any>();

    private controlEvent: ControlEventService;

    constructor(controlEvent: ControlEventService) {
        this.controlEvent = controlEvent;
    }

    public onChangeValue(event: Event) {
        this.onChange.next({
            key: this.name,
            value: this.value
        });
    }
}
