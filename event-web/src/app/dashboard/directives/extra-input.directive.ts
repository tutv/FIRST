import {Directive, HostListener, EventEmitter, OnInit, Output, ElementRef} from "@angular/core";
import {NgModel} from "@angular/forms";

@Directive({
    selector: '[mkExtraInput]',
    host: {
        '(ngModelChange)': 'onInputChange($event)'
    }
})
export class ExtraInputDirective implements OnInit {
    @Output() private valueChange: EventEmitter<any> = new EventEmitter<any>();
    private value: any = null;
    private submitted: boolean = false;

    constructor(private el: ElementRef,
                private ngModel: NgModel) {
    }

    ngOnInit() {
        this.initValue();
    }

    private initValue() {
        this.value = this.ngModel.model;
    }

    onInputChange(value) {
        this.value = value;
        this.submitted = false;
    }

    @HostListener('focusout') onFocusOut() {
        this.submitChange();
    }

    @HostListener('keyup', ['$event']) onKeyUp(event: KeyboardEvent) {
        if (event.keyCode != 13) {
            return;
        }

        this.submitChange();
    }

    private submitChange() {
        let value = this.value;
        if (value === null || this.submitted) {
            return;
        }

        this.valueChange.next(value);
        this.submitted = true;
        this.focusOut();
    }

    private focusOut() {
        this.el.nativeElement.blur();
    }
}
