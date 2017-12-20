import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MnDate} from './mn-date.class';
import {MnDatetimeServices} from './mn-datetime.services';

declare const mu: any;

/**
 * 构建日期视图
 */

@Component({
    selector: 'mn-datecalendar',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./mn-date2.scss'],
    template: `
        <mn-fill [hph]="false" class="mnc-header">
            <mn-col [style.width.px]="60" class="mnc-header-prev">
                <i class="fa fa-angle-double-left" *ngIf="_tools && _show_prev_big"
                   (click)="prevBig()"></i>
                <i class="fa fa-angle-left" *ngIf="_tools && _show_prev_small"
                   (click)="prevSmall()"></i>
            </mn-col>
            <mn-col [span]="1" class="mnc-header-current">
                {{_title}}
            </mn-col>
            <mn-col [style.width.px]="60" class="mnc-header-next">
                <i class="fa fa-angle-right" *ngIf="_tools && _show_next_small"
                   (click)="nextSmall()"></i>
                <i class="fa fa-angle-double-right" *ngIf="_tools && _show_next_big"
                   (click)="nextBig()"></i>
            </mn-col>
        </mn-fill>

        <mn-datedraw
                [mnYear]="_year"
                [mnMonth]="_month"
                [mnDay]="_day"
                [mnView]="'days'"
                [mnMaxDate]="_maxDate"
                [mnMinDate]="_minDate"
                [mnStartDate]="_startDate"
                [mnEndDate]="_endDate"
                [mnHoverDate]="_hoverDate"
                (mnStartEnd)="_startEnd.emit($event)"
                (mnHover)="_hover.emit($event)"
                (mnResult)="getResult($event)"></mn-datedraw>
    `
})
export class MnDateCalendarComponent implements OnInit {

    @Output('mnResult') _result = new EventEmitter<any>();
    @Output('mnStartEnd') _startEnd = new EventEmitter<any>();
    @Output('mnHover') _hover = new EventEmitter<any>();

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

    @Input('mnStartDate') _startDate: any;
    @Input('mnEndDate') _endDate: any;
    @Input('mnHoverDate') _hoverDate: any;

    @Input('mnYear') _year: number;
    @Input('mnMonth') _month: number;
    @Input('mnDay') _day: number = 1;
    @Input('mnView') _view: string = 'days';
    @Input('mnTools') _tools: boolean = true;

    _title: string = '';
    _mdate: any;

    constructor(private _mds: MnDatetimeServices) {
    }

    ngOnInit() {
        let current = new MnDate(new Date());
        this._year = mu.ifnvl(this._year, current.days.year);
        this._month = mu.ifnvl(this._month, current.days.month);
    }

    getResult($event) {
        this._mdate = $event;
        switch (this._view) {
            case 'days':
                this._title = mu.format(this._mdate._date, 'yyyy-MM');

                mu.run(this._minDate, () => {
                    this._show_prev_small = this._mds.compared(this._view, this._mdate.months.start, this._minDate) === 1;
                    if (!this._show_prev_small) {
                        this._show_prev_big = false;
                    } else {
                        let _prev = this._mdate.yoy(-1, true);
                        this._show_prev_big = this._mds.compared(this._view, _prev.start, this._minDate) === 1;
                    }
                });

                mu.run(this._maxDate, () => {
                    this._show_next_small = this._mds.compared(this._view, this._mdate.months.end, this._maxDate) === -1;
                    if (!this._show_next_small) {
                        this._show_next_big = false;
                    } else {
                        let _next_year = this._mdate.mom(12);
                        this._show_next_big = this._mds.compared(this._view, _next_year.start, this._maxDate) === -1;
                    }
                });

                break;
        }

        this._result.emit($event);
    }

    _show_prev_big: boolean = true;

    prevBig() {
        switch (this._view) {
            case 'days':
                this._year = this._mdate.days.year - 1;
                break;
        }
    }

    _show_prev_small: boolean = true;
    prevSmall() {
        switch (this._view) {
            case 'days':
                let _prev = this._mdate.mom(-1);
                this._month = _prev.month;
                this._year = _prev.year;
                break;
        }
    }

    _show_next_big: boolean = true;
    nextBig() {
        switch (this._view) {
            case 'days':
                this._year = this._mdate.days.year + 1;
                break;
        }
    }

    _show_next_small: boolean = true;
    nextSmall() {
        switch (this._view) {
            case 'days':
                let _next = this._mdate.mom(1);
                this._month = _next.month;
                this._year = _next.year;
                break;
        }
    }

}

