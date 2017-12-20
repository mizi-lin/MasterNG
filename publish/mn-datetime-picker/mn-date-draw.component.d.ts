import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { MnDatetimeServices } from './mn-datetime.services';
/**
 * 构建日期视图
 */
export declare class MnDateDrawComponent implements OnInit, OnDestroy {
    private _mds;
    $date: any;
    date$: any;
    _result: EventEmitter<any>;
    _startEnd: EventEmitter<any>;
    _hover: EventEmitter<any>;
    _maxDate: any;
    maxDate_: any;
    _minDate: any;
    minDate_: any;
    _hoverDate: any;
    hoverDate_: any;
    _startDate: any;
    startDate_: any;
    _endDate: any;
    endDate_: any;
    year_: any;
    month_: any;
    day_: any;
    date_: any;
    _view: string;
    _frames: any;
    _max: boolean;
    _min: boolean;
    dmap: any;
    constructor(_mds: MnDatetimeServices);
    ngOnInit(): void;
    ngOnDestroy(): void;
    newdate(): Date;
    bounce: any;
    /**
     * 根据不同的视图，创建时间集合架子
     */
    buildFrame(): void;
    /**
     * 当前日历数据集
     * @return {any}
     */
    datePools(date: any, ds: any): any;
    /**
     * 填充时间
     * @param pools
     */
    fill(pools: any): void;
    /**
     * 选择开始和结束时间
     * @param dt
     */
    getStartEndDate(dt: any): void;
    getHover(dt: any): void;
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
}
