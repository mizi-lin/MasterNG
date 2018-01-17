import {Component, OnInit} from '@angular/core';
import {MnDate} from '../../lib/mn-datetime-picker/mn-date.class';
import {HttpClient} from '@angular/common/http';

declare const mu: any;

@Component({
    selector: 'mn-demo-datetime',
    templateUrl: './demo-datetime.component.html',
    styleUrls: ['./demo-datetime.component.scss']
})
export class DemoDatetimeComponent implements OnInit {

    minDate: string = '2017-12-10';
    startDate: string = '2017-12-01';

    constructor(private _http: HttpClient) {
    }

    ngOnInit() {

        setTimeout(() => {
            this.minDate = '2018-01-17';
        }, 3000);

    }

    a: any = {};

    result(e) {
        console.debug(':::::result', e);
    }

    getView(e) {
        console.debug(e);
    }

    _result(e) {
        console.debug(':::::selected', e);
    }

    quicks: any = {
        relatively: [
            {
                name: '一天前',
                value: '-1d'
            }, {
                name: '前2-5月',
                value: '-2M,-5M'
            }, {
                name: '最近一月',
                value: '-1M'
            },
            {
                name: '上个月',
                value: '-1:M'
            }, {
                name: '去年',
                value: '-1:y'
            }, {
                name: '下周',
                value: '1:w'
            }, {
                name: '下个月',
                value: '1:M'
            }
        ],
        absolute: [
            {
                name: '第一季度',
                start: '2017-01-01',
                end: '2017-02-29'
            }
        ],
        status: 'relatively'
    };

}
