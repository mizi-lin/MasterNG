import { OnInit } from '@angular/core';
import { MnDatetimeServices } from './mn-datetime.services';
/**
 * 日历控件最小模块：日期块
 * 最小时间粒度，实现时间样式（max, min, start, end)
 *
 */
export declare class MnDateSingleComponent implements OnInit {
    private _mds;
    _date: any;
    date_: any;
    _maxDate: any;
    maxDate_: any;
    _minDate: any;
    minDate_: any;
    _startDate: any;
    startDate_: any;
    _endDate: any;
    endDate_: any;
    _hoverDate: any;
    hoverDate_: any;
    _view: string;
    _current: boolean;
    _prev: boolean;
    _next: boolean;
    _status: string;
    status_: any;
    _max: boolean;
    readonly classMax_: any;
    _min: boolean;
    readonly classMin_: any;
    readonly classStart_: any;
    readonly classEnd_: any;
    readonly classStartEndRange_: boolean;
    readonly classHover_: boolean;
    readonly classReHover_: boolean;
    readonly classPrev_: boolean;
    readonly classCurrent_: boolean;
    readonly classNext_: boolean;
    constructor(_mds: MnDatetimeServices);
    ngOnInit(): void;
    mndate(date: any): any;
}
