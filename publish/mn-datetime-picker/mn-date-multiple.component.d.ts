import { OnInit } from '@angular/core';
/**
 * 构建日期视图
 */
export declare class MnDateMultipleComponent implements OnInit {
    _maxDate: any;
    maxDate_: any;
    _minDate: any;
    minDate_: any;
    _startDate: any;
    startDate_: any;
    _endDate: any;
    endDate_: any;
    _view: string;
    _hoverDate: any;
    _prev: any;
    _next: any;
    constructor();
    ngOnInit(): void;
    getStartEnd(ds: any): void;
    getPreCalendar(ds: any): void;
    /**
     * 重新计算startDate
     * @param dt
     * @return {any}
     */
    reStartDate(dt: any): any;
    /**
     * 重新计算结束时间
     * @param dt
     * @return {any}
     */
    reEndDate(dt: any): any;
    /**
     * 获得下个月的期间区域
     * @private
     */
    next_(prev: any, next: any): any;
}
