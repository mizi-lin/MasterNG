import { OnInit } from '@angular/core';
export declare class MnDatetimePickerComponent implements OnInit {
    /**
     * 单日历视图 single
     * 多日历视图 multiple
     */
    mode: string;
    /**
     * string: 标准的日期格式 '2017-12-08 11:05:28'
     * number: 时间戳
     * any: mndate 对象
     */
    startDate: any;
    endDate: any;
    minDate: any;
    maxDate: any;
    views: any;
    /**
     * boolean: def true, 是否打开快速选择区
     * any: exist true, 快速选择区配置 {relatively, absolute}
     */
    quicks: boolean | any;
    result: any;
    selected: any;
    _startDate: any;
    _endDate: any;
    _maxDate: any;
    _minDate: any;
    _selected: any;
    _viewed: any;
    _hasChange: boolean;
    _view: string;
    _views: any[];
    _viewsMap: any;
    _rangeResult(rst: any): void;
    _dropDownResult: any;
    constructor();
    ngOnInit(): void;
    _mcmResult($event: any): void;
    _confirmDate(): void;
    _format(date: any): string;
    _rst(rst: any): any;
}
