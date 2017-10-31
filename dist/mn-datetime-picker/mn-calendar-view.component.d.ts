import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MnDatetimeServices } from './mn-datetime.services';
export declare class MnCalendarViewComponent implements OnInit, OnChanges {
    private _mds;
    year: number;
    month: number;
    day: number;
    viewType: string;
    mode: string;
    minDate: any;
    maxDate: any;
    startDate: any;
    endDate: any;
    result: EventEmitter<any>;
    calendar: any[];
    current_month: number;
    selected_start: any;
    selected_end: any;
    _selected_end: any;
    minDate_: any;
    maxDate_: any;
    current: any;
    prev: any;
    next: any;
    constructor(_mds: MnDatetimeServices);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    _getDate(year: number, month?: number, day?: number): string;
    getDate(year: number, month: number, day: number): any;
    selectedDate(date: any, type: any, mode: any): void;
    selected(d: any): any;
    hovered(d: any): void;
    started(d: any): any;
    ended(d: any): any;
    /**
     * 判断时间区间
     * @param d
     */
    ranged(d: any): boolean;
    /**
     * 反向日期显示
     * @param d
     * @return {boolean}
     */
    reverseRanged(d: any): boolean;
}
