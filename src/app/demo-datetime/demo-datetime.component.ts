import {Component, OnInit} from '@angular/core';

declare const mu: any;

@Component({
    selector: 'mn-demo-datetime',
    templateUrl: './demo-datetime.component.html',
    styleUrls: ['./demo-datetime.component.scss']
})
export class DemoDatetimeComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    result(e) {
        console.debug(
            e,
            mu.format(new Date(e.startDate.range.start), 'yyyy-MM-dd'),
            e.endDate && mu.format(new Date(e.endDate.range.start), 'yyyy-MM-dd')
        );
    }

}
