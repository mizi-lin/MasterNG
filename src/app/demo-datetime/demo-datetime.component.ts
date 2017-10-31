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

    a: any = {};

    result(e) {
        console.debug(
            e,
            mu.format(new Date(e.startDate.range.start), 'yyyy-MM-dd'),
            e.endDate && mu.format(new Date(e.endDate.range.start), 'yyyy-MM-dd')
        );
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
