import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChildren} from '@angular/core';
import {MnCalendarComponent} from './mn-calendar.component';
import {MnCalendarViewComponent} from './mn-calendar-view.component';
import {MnDatetimeServices} from './mn-datetime.services';
import {MnDate} from './mn-date.class';

import  mu from 'mzmu';

@Component({
    selector: 'mn-calendar-multiple',
    template: `
        <mn-fill [gutter]="16">
            <mn-col [span]="1">
                <mn-calendar
                        [mnYear]="prev_year"
                        [mnMonth]="prev_month"
                        [mnDate]="prev_date"
                        [mnViewType]="'prev'"
                        [mnMode]="'multiple'"
                        [mnMinDate]="minDate_"
                        [mnMaxDate]="maxDate_"
                        [mnStartDate]="startDate_"
                        [mnEndDate]="endDate_"
                        (mnResult)="prev_result_($event)">
                </mn-calendar>
            </mn-col>
            <mn-col [span]="1">
                <mn-calendar
                        [mnYear]="next_year"
                        [mnMonth]="next_month"
                        [mnDate]="next_date"
                        [mnMinDate]="minDate_"
                        [mnMaxDate]="maxDate_"
                        [mnViewType]="'next'"
                        [mnMode]="'multiple'"
                        [mnStartDate]="startDate_"
                        [mnEndDate]="endDate_"
                        (mnResult)="next_result_($event)">
                </mn-calendar>
            </mn-col>
        </mn-fill>
    `
})
export class MnCalendarMultipleComponent implements OnInit, OnChanges {

    @Input('mnMinDate')
    set minDate(date) {
        if (mu.isEmpty(date)) {
            return;
        }
        this.minDate_ = new MnDate(date);
    }

    @Input('mnMaxDate')
    set maxDate(date) {
        if (mu.isEmpty(date)) {
            return;
        }
        this.maxDate_ = new MnDate(date);
    }

    @Input('mnStartDate')
    set startDate(date) {
        this.startDate$_(date);
    }

    startDate$_(date) {
        if (mu.isEmpty(date)) {
            return;
        }

        this.startDate_ = new MnDate(date);
        this.startDate_ = this._mds.reStartDate(this.startDate_, this.maxDate_, this.minDate_);

        if (this.startDate_) {
            if (!this._hasChanges) {
                this.prev_year = this.startDate_.days.year;
                this.prev_month = this.startDate_.days.month;
                this._hasChanges = true;
            }

            // 若两个月份指向同一个月份
            if (this.next_year === this.prev_year && this.next_month === this.prev_month) {
                let _adjust_next = this.startDate_.mom(1);
                this.next_year = _adjust_next.year;
                this.next_month = _adjust_next.month;
                this.next_date = this.startDate_.days.date;
            }

            this.prev_date = this.startDate_.days.date;

            setTimeout(() => {
                if (!this.endDate_) {
                    this.result.emit({startDate: this.startDate_});
                }
            }, 100);
        } else {
            return;
        }
    }

    @Input('mnEndDate')
    set endDate(date) {
        if (mu.isEmpty(date)) {
            this.result.emit({
                startDate: this.startDate_,
                endDate: this.endDate_
            });
            return;
        }
        this.endDate_ = new MnDate(date);
        this.endDate_ = this._mds.reEndDate(this.endDate_, this.maxDate_, this.minDate_);

        if (this.endDate_) {
            this.next_year = this.endDate_.days.year;
            this.next_month = this.endDate_.days.month;
            this.next_date = this.endDate_.days.date;

            // 若两个月份指向同一个月份
            if (this.next_year === this.prev_year && this.next_month === this.prev_month) {
                let _adjust_next = this.startDate_.mom(1);
                this.next_year = _adjust_next.year;
                this.next_month = _adjust_next.month;
                this.next_date = this.startDate_.days.date;
            }

            this.result.emit({
                startDate: this.startDate_,
                endDate: this.endDate_
            });
        } else {
            this.result.emit({
                startDate: this.startDate_,
                endDate: this.endDate_
            });
            return;
        }

    }

    @Output('mnResult') result: any = new EventEmitter<any>();

    @ViewChildren(MnCalendarComponent)
    set calendars(calendars_) {

        this.prev_calendar = mu.prop(calendars_, '_results.0');
        this.next_calendar = mu.prop(calendars_, '_results.1');

        this.prev_calendar.getPrevMonth = () => this.getPrevMonth();
        this.prev_calendar.getPrevYear = () => this.getPrevYear();
        this.next_calendar.getNextMonth = () => this.getNextMonth();
        this.next_calendar.getNextYear = () => this.getNextYear();

        this.prev_view = mu.prop(this.prev_calendar, '_viewComponent');
        this.next_view = mu.prop(this.next_calendar, '_viewComponent');

        this.prev_view.selectedDate = (date, type, mode) => this.selectedDate(date, type, mode);
        this.next_view.selectedDate = (date, type, mode) => this.selectedDate(date, type, mode);

        this.prev_view.hovered = (date) => this.hovered(date);
        this.next_view.hovered = (date) => this.hovered(date);
    }

    next_year: number;
    next_month: number;
    next_date: number;

    prev_year: number;
    prev_month: number;
    prev_date: number;

    prev: any = new Date();
    next: any = new Date();

    prev_calendar: MnCalendarComponent;
    next_calendar: MnCalendarComponent;

    prev_view: MnCalendarViewComponent;
    next_view: MnCalendarViewComponent;

    maxDate_: any;
    minDate_: any;
    startDate_: any;
    endDate_: any;

    prev_result: any;
    next_result: any;

    _hasChanges: boolean = false;

    constructor(private _mds: MnDatetimeServices) {
        mu.empty(this.prev_year, () => {
            this.prev_year = this.prev.getFullYear();
            this.prev_month = this.prev.getMonth() + 1;
            this.prev_date = this.prev.getDate();
        });

        mu.empty(this.next_year, () => {
            this.next.setMonth(this.prev_month);
            this.next_year = this.next.getFullYear();
            this.next_month = this.next.getMonth() + 1;
            this.next_date = this.next.getDate();
        });
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        mu.run(changes['minDate'], (change) => {
            if (!change.firstChange) {
                this.startDate$_(mu.clone(this.startDate_));
                this.endDate = mu.clone(this.endDate_);
            }
        });

        mu.run(changes['maxDate'], (change) => {
            if (!change.firstChange) {
                this.startDate = mu.clone(this.startDate_);
                this.endDate = mu.clone(this.endDate_);
            }
        });
    }

    getPrevYear() {
        let rst = this.prev_calendar._getPrevYear();
        this.prev_year = rst.year;
        this.prev_month = rst.month;
        this.next_year = this.next_year + 1;
    }

    getPrevMonth(): void {
        let rst = this.prev_calendar._getPrevMonth();
        this.prev_year = rst.year;
        this.prev_month = rst.month;
        let mom = rst.mom(1);
        this.next_year = mom.year;
        this.next_month = mom.month;
    }

    getNextYear() {
        let rst = this.next_calendar._getNextYear();
        this.next_year = rst.year;
        this.next_month = rst.month;
        this.prev_year = this.next_year - 1;
    }

    getNextMonth() {
        let rst = this.next_calendar._getNextMonth();
        this.next_year = rst.year;
        this.next_month = rst.month;
        let mom = rst.mom(-1);

        this.prev_year = mom.year;
        this.prev_month = mom.month;
    }

    prev_result_(e) {
        this.prev_result = e;
    }

    next_result_(e) {
        this.next_result = e;
    }

    selectedDate(date, type, mode) {

        /**
         * 切换选择日期视图
         */
        if (date.no_selected) {
            return;
        }

        mu.run(this.startDate_, () => {
            mu.run(this.endDate_, () => {
                this.startDate_ = date;
                this.endDate_ = void 0;
            }, () => {
                if (date.days.start < this.startDate_.days.end) {
                    this.endDate_ = this.startDate_;
                    this.startDate_ = date;
                } else {
                    this.endDate_ = date;
                }
            });
        }, () => {
            this.startDate_ = date;
        });

        if (date.status === type) {
            if (date.status === 'prev') {
                this.getPrevMonth();
            }

            if (date.status === 'next') {
                this.getNextMonth();
            }
        }

        this.switchView();

        this.result.emit({
            startDate: this.startDate_,
            endDate: this.endDate_
        });
    }

    hovered(date) {
        this.prev_view._selected_end = date;
        this.next_view._selected_end = date;
    }

    switchView() {
        if (this.next_calendar._view.months.start - this.prev_calendar._view.months.end > 10000) {
            if (this.startDate_ && this.startDate_.days.start > this.next_calendar._view.months.start) {
                this.getNextMonth();
            } else {
                let _next = this.prev_calendar._view.mom(1);
                this.next_year = _next.year;
                this.next_month = _next.month;
                this.next_date = _next.day;
            }

        }
    }
}

