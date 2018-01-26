import {Component, HostBinding, Input, OnInit} from '@angular/core';
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

    @Input('mnDisabled') _disabled: boolean = false;

    @Input('mnStatus')
    set status_(st) {
        // this._current = mu.or(st, 'current', 'prev', 'next');
        this._current = mu.or(st, 'current');
        this._next = st === 'next';
        this._prev = st === 'prev';
        this._status = st;
    }

    _max: boolean = false;

    _current: boolean;
    _prev: boolean;
    _next: boolean;
    _status: string;

    @HostBinding('class.max')
    get classMax_() {
        return mu.run(this._maxDate, (_maxDate) => {
            this._maxDate = this.mndate(_maxDate);
            this._max = this._mds.compared(this._view, this._date, this._maxDate) === 1;
            return this._max;
        });
    }

    _min: boolean = false;

    @HostBinding('class.min')
    get classMin_() {
        return mu.run(this._minDate, (_minDate) => {
            this._minDate = this.mndate(_minDate);
            this._min = this._mds.compared(this._view, this._date, this._minDate) === -1;
            return this._min;
        });
    }

    @HostBinding('class.start')
    get classStart_() {
        return mu.run(this._startDate, (_startDate) => {
            this._startDate = this.mndate(_startDate);

            return !this._max
                && !this._min
                && this._current
                && this._mds.compared(this._view, this._date, this._startDate) === 0;
        });
    }

    @HostBinding('class.end')
    get classEnd_() {
        return mu.run(this._endDate, (_endDate) => {
            this._endDate = this.mndate(_endDate);
            return !this._max
                && !this._min
                && this._current
                && this._mds.compared(this._view, this._date, this._endDate) === 0;
        });
    }

    @HostBinding('class.range')
    get classStartEndRange_() {
        if (this._current && mu.isNotEmpty(this._startDate) && mu.isNotEmpty(this._endDate)) {
            return !this._max
                && !this._min
                && this._current
                && this._mds.range(this._view, this._date, this._startDate, this._endDate) === 2;
        }
    }

    @HostBinding('class.hover')
    get classHover_() {
        // if (this._current && mu.isEmpty(this._endDate) && mu.isNotEmpty(this._startDate) && mu.isNotEmpty(this._hoverDate)) {
        if (mu.isEmpty(this._endDate) && mu.isNotEmpty(this._startDate) && mu.isNotEmpty(this._hoverDate)) {
            return !this._max
                && !this._min
                // && this._current
                && this._mds.range(this._view, this._date, this._startDate, this._hoverDate) === 2;
        } else {
            return false;
        }
    }

    @HostBinding('class.re-hover')
    get classReHover_() {
        // if (this._current && mu.isEmpty(this._endDate) && mu.isNotEmpty(this._startDate) && mu.isNotEmpty(this._hoverDate)) {
        if (mu.isEmpty(this._endDate) && mu.isNotEmpty(this._startDate) && mu.isNotEmpty(this._hoverDate)) {
            return !this._max
                && !this._min
                && this._mds.range(this._view, this._date, this._hoverDate, this._startDate) === 2;
        } else {
            return false;
        }
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

    @HostBinding('class.disabled')
    get classDisabled_() {
        return this._disabled;
    }

    constructor(private _mds: MnDatetimeServices) {
    }

    ngOnInit() {
    }

    mndate(date): any {
        return new MnDate(date);
    }
}
