import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'app-input-switch',
    templateUrl: './input-switch.component.html',
    styleUrls: ['./input-switch.component.scss']
})
export class InputSwitchComponent implements OnInit {
    @Input() private value: boolean = false;
    @Output() private valueChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() private extraClass: string = 'switch-lg';

    constructor() {
    }

    ngOnInit() {
    }

    onChange() {
        this.valueChange.next(this.value);
    }
}
