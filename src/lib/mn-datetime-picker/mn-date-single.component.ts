import {Component, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {MnDate} from './mn-date.class';
import {MnDatetimeServices} from './mn-datetime.services';

declare const mu: any;

/**
 * 日历控件最小模块：日期块
 * 最小时间粒度，实现时间样式（max, min, start, end)
 *
 */

@Component({
    selector: 'mn-datesingle',
    template: `
        <div class="content">
            {{_date[_view]?.value}}
        </div>
    `
})
export class MnDateSingleComponent implements OnInit {

    _date: any = {};

    @Input('mnDate')
    set date_(date) {
        if (date) {
            this._date = new MnDate(date);
        }
    }

    _maxDate: any;

    @Input('mnMaxDate')
    set maxDate_(dt) {
        this._maxDate = new MnDate(dt);
    }

    _minDate: any;

    @Input('mnMinDate')
    set minDate_(dt) {
        this._minDate = new MnDate(dt);
    }

    _startDate: any;

    @Input('mnStartDate')
    set startDate_(dt) {
        this._startDate = new MnDate(dt);
    }

    _endDate: any;

    @Input('mnEndDate')
    set endDate_(dt) {
        this._endDate = new MnDate(dt);
    }

    _hoverDate: any;

    @Input('mnHoverDate')
    set hoverDate_(dt) {
        this._hoverDate = new MnDate(dt);
    }

    @Input('mnView') _view: string = 'days';

    _current: boolean;
    _prev: boolean;
    _next: boolean;
    _status: string;

    @Input('mnStatus')
    set status_(st) {
        this._current = st === 'current';
        this._next = st === 'next';
        this._prev = st === 'prev';
        this._status = st;
    }

    @HostBinding('class.start')
    get classStart_() {
        return mu.run(this._startDate, (_startDate) => {
            this._startDate = this.mndate(_startDate);
            return this._current && this.compared(this._date, this._startDate) === 0;
        });
    }

    @HostBinding('class.end')
    get classEnd_() {
        return mu.run(this._endDate, (_endDate) => {
            this._endDate = this.mndate(_endDate);
            return this._current && this.compared(this._date, this._endDate) === 0;
        });
    }

    @HostBinding('class.range')
    get classStartEndRange_() {
        if (this._current && mu.isNotEmpty(this._startDate) && mu.isNotEmpty(this._endDate)) {
            return this._current && this.range(this._date, this._startDate, this._endDate) === 2;
        }
    }

    @HostBinding('class.hover')
    get classHover_() {
        if (this._current && mu.isEmpty(this._endDate) && mu.isNotEmpty(this._startDate) && mu.isNotEmpty(this._hoverDate)) {
            return this.range(this._date, this._startDate, this._hoverDate) === 2;
        }
    }

    @HostBinding('class.re-hover')
    get classReHover_() {
        if (this._current && mu.isEmpty(this._endDate) && mu.isNotEmpty(this._startDate) && mu.isNotEmpty(this._hoverDate)) {
            return this.range(this._date, this._hoverDate, this._startDate) === 2;
        }
    }

    @HostBinding('class.max')
    get classMax_() {
        return mu.run(this._maxDate, (_maxDate) => {
            this._maxDate = this.mndate(_maxDate);
            return this.compared(this._date, this._maxDate) === 1;
        });
    }

    @HostBinding('class.min')
    get classMin_() {
        return mu.run(this._minDate, (_minDate) => {
            this._minDate = this.mndate(_minDate);
            return this.compared(this._date, this._minDate) === -1;
        });
    }

    @HostBinding('class.prev')
    get classPrev_() {
        return this._prev;
    }

    @HostBinding('class.current')
    get classCurrent_() {
        return this._current;
    }

    @HostBinding('class.next')
    get classNext_() {
        return this._next;
    }

    constructor(private _mds: MnDatetimeServices) {
    }

    ngOnInit() {
    }

    /**
     * 根据当前视图比较两个时间
     * @param src
     * @param target
     *
     * @return 1 大于; 0: 等于; -1: 小于; 2 范围内; -2 有交集
     */
    compared(src, target): number {
        if (mu.isEmpty(src) || mu.isEmpty(target)) {
            return;
        }
        let _src = src[this._view];
        let _target = target[this._view];
        if (_src.start > _target.end) {
            return 1;
        } else if (_src.end < _target.start) {
            return -1;
        } else if (_src.start === _target.start && _src.end === _target.end) {
            return 0;
        } else if (_src.start < _target.start && _target.end < _src.end) {
            return 2;
        } else {
            return -2;
        }
    }

    /**
     * 判断当前时间是否在时间范围之内
     * @param src
     * @param min
     * @param max
     * @return {number} 2 范围内，0 不在范围内
     */
    range(src, min, max): number {
        if (mu.isEmpty(src)) {
            return;
        }

        let _src = src[this._view];
        let _min = min[this._view];
        let _max = max[this._view];

        if (_min.end < _src.start && _src.end < _max.start) {
            return 2;
        } else {
            return 0;
        }

    }

    mndate(date): any {
        return new MnDate(date);
    }
}
