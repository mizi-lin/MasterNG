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
    _view: string;
    readonly classStart_: any;
    readonly classEnd_: any;
    readonly classRange_: any;
    readonly classReverseRange_: any;
    readonly classMax_: any;
    readonly classMin_: any;
    _hoverDate: any;
    _startDate: any;
    _endDate: any;
    _maxDate: any;
    _minDate: any;
    _rst: any;
    constructor(_mds: MnDatetimeServices);
    ngOnInit(): void;
    /**
     * 根据当前视图比较两个时间
     * @param src
     * @param target
     *
     * @return 1 大于; 0: 等于; -1: 小于; 2 范围内; -2 有交集
     */
    compared(src: any, target: any): number;
    mndate(date: any): any;
}
