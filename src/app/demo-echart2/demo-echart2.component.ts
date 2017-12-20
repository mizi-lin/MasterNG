import {Component, OnInit} from '@angular/core';

declare const mu: any;

@Component({
    selector: 'mn-demo-echart2',
    templateUrl: './demo-echart2.component.html',
    styleUrls: ['./demo-echart2.component.scss']
})
export class DemoEchart2Component implements OnInit {

    constructor() {
    }

    height: number = 350;

    ngOnInit() {

        // setInterval(() => {
        //     this.height += 20;
        // }, 1000);
    }

    _abc(data) {
        return mu.map(data, (o, i) => {
            if (i) {
                return o;
            } else {
                return 'BREAK';
            }
        });

        // return $event.data;
    }
}
