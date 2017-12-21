import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MnDate} from './mn-date.class';

declare const mu: any;

/**
 * 构建日期视图
 */

@Component({
    selector: 'mn-datemultiple',
    template: `
        <mn-fill [gutter]="16">
            <mn-col [span]="1">
                <mn-datecalendar
                        [mnMinDate]="_minDate"
                        [mnMaxDate]="_maxDate"
                        [mnStartDate]="_startDate"
                        [mnEndDate]="_endDate"
                        [mnHoverDate]="_hoverDate"
                        [mnView]="'days'"

                        [mnYear]="_prev.days.year"
                        [mnMonth]="_prev.days.month"

                        [mnNextDate]="_next"

                        (mnResult)="getPreCalendar($event)"
                        (mnStartEnd)="getStartEnd($event)"
                        (mnHover)="_hoverDate = $event"></mn-datecalendar>
            </mn-col>

            <mn-col [span]="1">
                <mn-datecalendar
                        [mnMinDate]="_minDate"
                        [mnMaxDate]="_maxDate"
                        [mnStartDate]="_startDate"
                        [mnEndDate]="_endDate"
                        [mnHoverDate]="_hoverDate"
                        [mnView]="'days'"

                        [mnYear]="_next.days.year"
                        [mnMonth]="_next.days.month"

                        [mnPrevDate]="_prev"

                        (mnResult)="getNextCalendar($event)"
                        (mnStartEnd)="getStartEnd($event)"
                        (mnHover)="_hoverDate = $event"></mn-datecalendar>
            </mn-col>

        </mn-fill>
    `
})
export class MnDateMultipleComponent implements OnInit {

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
        this._startDate = this.reStartDate(dt);
        this._prev = this._startDate;
    }

    _endDate: any;

    @Input('mnEndDate')
    set endDate_(dt) {
        this._endDate = this.reEndDate(dt);
        this._next = this.next_(this._prev, this._endDate);
    }

    @Input('mnView') _view: string = 'days';

    _hoverDate: any;

    _prev: any = {};
    _next: any = {};

    constructor() {

    }

    ngOnInit() {
    }

    getStartEnd(ds) {
        this._startDate = ds.startDate;
        this._endDate = ds.endDate;
    }

    getPreCalendar(ds) {
        this._prev = ds;
    }

    getNextCalendar(ds) {
        this._next = ds;
    }

    /**
     * 重新计算startDate
     * @param dt
     * @return {any}
     */
    reStartDate(dt) {
        dt = new MnDate(dt);
        if (this._minDate) {
            return this._minDate._date > dt._date ? this._minDate : dt;
        }
        return dt;
    }

    /**
     * 重新计算结束时间
     * @param dt
     * @return {any}
     */
    reEndDate(dt) {
        dt = new MnDate(dt);
        if (this._maxDate) {
            return this._maxDate._date < dt._date ? this._maxDate : dt;
        }

        return dt;
    }

    /**
     * 获得下个月的期间区域
     * @private
     */
    next_(prev: any, next: any) {
        return prev._d === next._d ? new MnDate(prev.mom(1).start) : next;
    }

}

