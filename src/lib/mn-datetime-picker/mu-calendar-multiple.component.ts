import {AfterViewInit, Component, Input, OnInit, ViewChildren} from '@angular/core';
import {MnCalendarComponent} from './mn-calendar.component';
import {MnCalendarViewComponent} from './mn-calendar-view.component';

declare const mu: any;

@Component({
    selector: 'mn-calendar-multiple',
    template: `
        <mn-fill [gutter]="16">
            <mn-col [span]="1">
                <mn-calendar
                        [year]="prev_year"
                        [month]="prev_month"
                        [date]="prev_date"
                        [type]="'prev'"
                        [mode]="'multiple'"
                        [startDate]="startDate"
                        [endDate]="endDate">
                </mn-calendar>
            </mn-col>
            <mn-col [span]="1">
                <mn-calendar
                        [year]="next_year"
                        [month]="next_month"
                        [date]="next_date"
                        [type]="'next'"
                        [mode]="'multiple'"
                        [startDate]="startDate"
                        [endDate]="endDate">
                </mn-calendar>
            </mn-col>
        </mn-fill>
    `
})
export class MnCalendarMultipleComponent implements OnInit {

    @Input() next_year: number;
    @Input() next_month: number;
    @Input() next_date: number;

    @Input() prev_year: number;
    @Input() prev_month: number;
    @Input() prev_date: number;

    @Input() startDate: any;
    @Input() endDate: any;

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
    }

    prev: any = new Date();
    next: any = new Date();

    prev_calendar: MnCalendarComponent;
    next_calendar: MnCalendarComponent;

    prev_view: MnCalendarViewComponent;
    next_view: MnCalendarViewComponent;

    constructor() {
        mu.empty(this.prev_year, () => {
            this.prev_year = this.prev.getFullYear();
            this.prev_month = this.prev.getMonth() + 1;
            this.prev_date = this.prev.getFullYear();
        });

        mu.empty(this.next_year, () => {
            this.next.setMonth(this.prev_month);
            this.next_year = this.next.getFullYear();
            this.next_month = this.next.getMonth() + 1;
            this.next_date = this.next.getFullYear();
        });
    }

    ngOnInit() {
    }

    // ngAfterViewInit() {
    //     this.prev_calendar = mu.prop(this.calendars_, '_results.0');
    //     this.next_calendar = mu.prop(this.calendars_, '_results.1');
    //
    //     this.ss = this.prev_calendar.getPrevMonth;
    //     this.prev_calendar.getPrevMonth = this.getPrevMonth;
    // }

    getPrevYear() {
        this.prev_calendar._getPrevYear();
        this.next_calendar._getPrevYear();
    }

    getPrevMonth(): void {
        this.prev_calendar._getPrevMonth();
        this.next_calendar._getPrevMonth();
    }

    getNextYear() {
        this.prev_calendar._getNextYear();
        this.next_calendar._getNextYear();
    }

    getNextMonth() {
        this.next_calendar._getNextMonth();
        this.prev_calendar._getNextMonth();
    }

    selectedDate(date, type, mode) {
        mu.run(this.startDate, () => {
            mu.run(this.endDate, () => {
                this.startDate = date;
                this.endDate = void 0;
            }, () => {
                if (date.range.start < this.startDate.range.end) {
                    this.endDate = this.startDate;
                    this.startDate = date;
                } else {
                    this.endDate = date;
                }

            });
        }, () => {
            this.startDate = date;
        });

        if (date.status === type) {
            if (date.status === 'prev') {
                this.getPrevMonth();
            }

            if (date.status === 'next') {
                this.getNextMonth();
            }
        }

        console.debug(date);
    }
}

