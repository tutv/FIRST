import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'app-text-editable',
    templateUrl: 'text-editable.component.html',
    styleUrls: ['text-editable.component.scss']
})
export class TextEditableComponent implements OnInit {
    @Input() public content: string = '';
    @Output() public update: EventEmitter<any> = new EventEmitter();
    private isEditing: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    onKeyPress(event: KeyboardEvent) {
        if (event.keyCode != 13) {
            return;
        }

        this.toggle();
    }

    toggle() {
        if (this.isEditing) {
            this.emit();
        }

        this.isEditing = !this.isEditing;
    }

    emit() {
        this.update.next(this.content);
    }
}
