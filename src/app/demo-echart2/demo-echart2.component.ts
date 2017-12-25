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

    req: any = {url: './assets/store/echart-map.json'};

    ngOnInit() {

        setTimeout(() => {
            this.req = {url: './assets/store/echart-map2.json'};

            setTimeout(() => {
                this.req = {url: './assets/store/echart-map.json'};
            }, 3000);

        }, 3000);
    }

    _abc(data) {
        data = data.data;
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
