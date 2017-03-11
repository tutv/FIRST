import {Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'mk-qr-code',
    templateUrl: './qr-code.component.html',
    styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit, OnChanges {
    private url = '';

    @Input() public data: any = null;
    @Input() public size: string = '512x512';

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.url = `https://api.qrserver.com/v1/create-qr-code/?size=${this.size}&data=${this.data}`;
    }
}
