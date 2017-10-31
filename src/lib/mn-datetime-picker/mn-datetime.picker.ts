import {Component, EventEmitter, Input, OnInit} from '@angular/core';

@Component({
    selector: 'mn-datetimepicker',
    template: ``
})
export class FeatureComponent implements OnInit {

    /**
     * 单日历视图 single
     * 多日历视图 multiple
     */
    @Input() mode: string;

    /**
     * string: 标准的日期格式 '2017-12-08 11:05:28'
     * number: 时间戳
     * any: mndate 对象
     */
    @Input() startDate: string | number | any;
    @Input() endDate: string | number | any;
    @Input() minDate: string | number | any;
    @Input() maxDate: string | number | any;

    /**
     * boolean: def true, 是否打开快速选择区
     * any: exist true, 快速选择区配置 {relatively, absolute}
     */
    @Input() quicks: boolean | any;

    @Input() result: any = new EventEmitter<any>();
    @Input() selected: any = new EventEmitter<any>();


    constructor() {
    }

    ngOnInit() {
    }
}

