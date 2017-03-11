import {
    Component,
    OnInit,
    SimpleChanges,
    Input,
    Output,
    OnDestroy,
    EventEmitter,
    OnChanges,
    AfterViewInit
} from "@angular/core";

@Component({
    selector: 'app-html-control',
    templateUrl: 'html-control.component.html',
    styleUrls: ['html-control.component.scss']
})
export class HtmlControlComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    @Input() private elementId: String = 'ob-html-control';
    @Output() public onUpdate = new EventEmitter<any>();
    @Input() public content: string = '';
    @Output() public contentChange = new EventEmitter<any>();
    @Input() private enable = true;
    public editor;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.content = this.content || '';
        this.setContent();
    }

    ngAfterViewInit() {
        this.initTinyMCE();
    }

    public updateContent() {
        this.content = this.editor.getContent();
        if (this.enable) {
            this.onUpdate.next(this.content);
            this.contentChange.next(this.content);
        }
    }

    private initTinyMCE() {
        let self = this;

        tinymce.init({
            selector: '#' + this.elementId,
            plugins: ['link', 'textcolor', 'colorpicker', 'autoresize'],
            skin_url: '/assets/skins/lightgray',
            toolbar: [
                'formatselect | alignleft aligncenter alignright | link | forecolor backcolor | removeformat',
            ],
            menubar: false,
            forced_root_block: 'div',
            setup: editor => {
                self.editor = editor;

                editor.on('keyup change', () => {
                    self.updateContent();
                });
            },
        });

        this.setContent();
    }

    setContent() {
        if (!this.editor) {
            return;
        }

        this.editor.setContent(this.content);
    }

    removeTinyMCE() {
        this.enable = false;
        tinymce.remove(this.editor);
    }

    ngOnDestroy() {
        this.removeTinyMCE();
    }

}