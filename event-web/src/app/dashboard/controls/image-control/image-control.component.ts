import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-image-control',
    templateUrl: './image-control.component.html',
    styleUrls: ['./image-control.component.scss'],
})
export class ImageControlComponent implements OnInit {
    @Input() url: string = null;
    @Output() urlChange: EventEmitter<any> = new EventEmitter<any>();

    public urlUpload: string = environment.api + '/upload';
    public pending: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    onUploadFinish(file: any) {
        let response = file.serverResponse || false;
        if (!response) {
            console.error(file);
        }

        try {
            let res = JSON.parse(response);
            let imageUrl = res.data;
            this.changeUrl(imageUrl);
        } catch (e) {
            console.error(e);
        }
    }

    onPending(pending: boolean) {
        this.pending = pending;
    }

    changeUrl(url: string) {
        this.url = url;
        this.urlChange.next(url);
    }

}
