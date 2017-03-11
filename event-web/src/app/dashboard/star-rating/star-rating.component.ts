import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'mk-star-rating',
    templateUrl: './star-rating.component.html',
    styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
    @Input() public number: number = 0;

    private numbers = [0, 1, 2, 3, 4, 5];

    constructor() {
    }

    ngOnInit() {
    }

}
