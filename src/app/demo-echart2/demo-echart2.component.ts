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
    req2: any = {url: './assets/store/nodata.json'};

    _data: any;

    setting: any = {
        // tooltip: (e) => {
        //     console.debug(e);
        //     return `${e.name} \n ${e.value}`;
        // }
    };

    ngOnInit() {

        setTimeout(() => {
            // this.req = {url: './assets/store/echart-map2.json'};
            //
            // setTimeout(() => {
            //     this.req = {url: './assets/store/echart-map.json'};
            // }, 3000);

            this.setting.tooltip = (e) => {
                return `${e.name} \n ${e.value}`;
            };

        }, 3000);
    }

    _abc(data) {

        setTimeout(() => {
            data = data.data;
            this._data = mu.map(data, (o, i) => {
                if (i) {
                    return o;
                } else {
                    return 'BREAK';
                }
            });
        }, 3000);



        // return $event.data;
    }
}
