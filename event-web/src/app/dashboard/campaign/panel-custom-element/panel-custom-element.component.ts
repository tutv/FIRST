import {Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges} from "@angular/core";
import {ControlEventService} from "../../services/control-event.service";
import {MkElement} from "../../../classes/mk-element";

@Component({
    selector: 'app-panel-custom-element',
    templateUrl: 'panel-custom-element.component.html',
    styleUrls: ['panel-custom-element.component.scss']
})
export class PanelCustomElementComponent implements OnInit, OnChanges {
    @Input() public element: MkElement;

    public styleControls: Array<any> = [];
    public attributeControls: Array<any> = [];

    constructor(private controlEventSrv: ControlEventService) {

    }

    ngOnInit() {

    }

    ngOnChanges(change: SimpleChanges) {
        this.renderControls();
    }

    public isHtmlEditor() {
        return (this.element.type == 'html');
    }

    public onUpdateContent(content) {
        this.controlEventSrv.updateContent(this.element.id, content);
    }

    public onUpdateStyle(data) {
        this.controlEventSrv.updateStyle(this.element.id, data);
    }

    public onUpdateAttribute(key, value) {
        this.controlEventSrv.updateAttribute(this.element.id, {key, value});
    }

    public onReset() {
        this.controlEventSrv.resetElement(this.element.id);
    }

    public renderControls() {
        this.styleControls = this.getStyleControls();
        this.attributeControls = this.getAttributeControls();
    }

    private getStyleControls(): Array<any> {
        if (!this.element.properties) {
            return [];
        }

        return this.element.properties;
    }

    private getAttributeControls(): Array<any> {
        if (!this.element.attributes) {
            return [];
        }

        return this.element.attributes;
    }
}
