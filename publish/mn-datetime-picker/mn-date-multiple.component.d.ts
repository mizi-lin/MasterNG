import { OnInit } from '@angular/core';
/**
 * 构建日期视图
 */
export declare class MnDateMultipleComponent implements OnInit {
    _hoverDate: any;
    _maxDate: any;
    maxDate_: any;
    _minDate: any;
    minDate_: any;
    _startDate: any;
    startDate_: any;
    _endDate: any;
    endDate_: any;
    _view: string;
    constructor();
    ngOnInit(): void;
    getStartEnd(ds: any): void;
}
