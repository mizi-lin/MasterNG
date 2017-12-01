import { OnInit } from '@angular/core';
import { MnDate } from './mn-date.class';
import { MnDatetimeServices } from './mn-datetime.services';
export declare class MnYearsPickerComponent implements OnInit {
    private _mds;
    _maxDate: any;
    _minDate: any;
    _startDate: any;
    _endDate: any;
    _date: any;
    result: any;
    current: any;
    constructor(_mds: MnDatetimeServices);
    ngOnInit(): void;
    calendar: any[];
    startDate: any;
    endDate: any;
    maxDate: any;
    minDate: any;
    _tenshow: {};
    _hoverDate: any;
    getCenturyYears(century: number): any;
    selected(date: any): void;
    hovered(date: any): void;
    started(date: any): any;
    ended(date: any): any;
    /**
     * 判断时间区间
     * @param date
     */
    ranged(date: any): boolean;
    /**
     * 反向日期显示
     * @param date
     * @return {boolean}
     */
    reverseRanged(date: any): boolean;
    backStartEnd(_startDate: any, _endDate: any, first: boolean): {
        startDate: MnDate;
        endDate: MnDate;
        first: boolean;
    };
}
