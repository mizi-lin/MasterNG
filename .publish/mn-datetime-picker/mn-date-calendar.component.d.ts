import { EventEmitter, OnInit } from '@angular/core';
import { MnDatetimeServices } from './mn-datetime.services';
/**
 * 构建日期视图
 */
export declare class MnDateCalendarComponent implements OnInit {
    private _mds;
    _result: EventEmitter<any>;
    _startEnd: EventEmitter<any>;
    _hover: EventEmitter<any>;
    _maxDate: any;
    maxDate_: any;
    _minDate: any;
    minDate_: any;
    _nextDate: any;
    nextDate: any;
    _prevDate: any;
    prevDate: any;
    _startDate: any;
    _endDate: any;
    _hoverDate: any;
    _year: number;
    _month: number;
    _day: number;
    _view: string;
    _tools: boolean;
    _title: string;
    _mdate: any;
    constructor(_mds: MnDatetimeServices);
    ngOnInit(): void;
    getResult($event: any): void;
    _show_prev_big: boolean;
    prevBig(): void;
    _show_prev_small: boolean;
    prevSmall(): void;
    _show_next_big: boolean;
    nextBig(): void;
    _show_next_small: boolean;
    nextSmall(): void;
}
