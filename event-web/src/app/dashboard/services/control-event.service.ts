import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ControlEventService {
    public style = new Subject<any>();
    public content = new Subject<any>();

    public update: Subject<any> = new Subject<any>();

    constructor() {
    }

    public updateStyle(id: string, data: any):void {
        this.update.next({
            id,
            type: 'properties',
            data
        });
    }

    public updateContent(id: string, content: string):void {
        this.update.next({
            id,
            type: 'content',
            data: content
        });
    }

    public updateAttribute(id: string, data):void {
        this.update.next({
            id,
            type: 'attributes',
            data
        });
    }

    public resetElement(id: string):void {
        this.update.next({
            id,
            type: 'reset'
        })
    }
}
