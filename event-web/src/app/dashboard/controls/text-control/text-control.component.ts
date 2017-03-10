import {Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges} from "@angular/core";

@Component({
    selector: 'app-text-control',
    templateUrl: 'text-control.component.html',
    styleUrls: ['text-control.component.scss']
})
export class TextControlComponent implements OnInit, OnChanges {
    @Input() private label: string = null;
    @Input() public elementId: String = 'ob-text-control';
    @Input() public content: string = '';
    @Output() public onUpdate = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.content = this.content || '';
    }

    public onChangeContent(content) {
        this.onUpdate.emit(content);
    }

}
