import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MnDatetimeServices} from './mn-datetime.services';
import {MnCalendarViewComponent} from './mn-calendar-view.component';

declare const mu: any;
export const YEAR_MILLISECONDS = 864000;

@Component({
    selector: 'mn-calendar',
    template: `
        <mn-fill [hph]="false" class="mnc-header">
            <mn-col [style.width.px]="60" class="mnc-header-prev">
                <button (click)="getPrevYear()" *ngIf="type !== 'next' && _show.prev_year">上一年</button>
                <button
                        (click)="getPrevMonth()"
                        *ngIf="(type !== 'next') && _show.prev_month">上一月
                </button>
            </mn-col>
            <mn-col [span]="1" class="mnc-header-current">
                {{this._view?.year}}-{{this._view?.month}}
            </mn-col>
            <mn-col [style.width.px]="60" class="mnc-header-next">
                <button (click)="getNextMonth()" *ngIf="type !== 'prev' && _show.next_month">下一月</button>
                <button (click)="getNextYear()" *ngIf="type !== 'prev' && _show.next_year">下一年</button>
            </mn-col>
        </mn-fill>

        <mn-calendar-view
                [year]="_year"
                [month]="_month"
                [date]="23"
                [minDate]="minDate"
                [maxDate]="maxDate"
                [type]="type"
                [mode]="mode"
                [startDate]="startDate"
                [endDate]="endDate"
                (result)="getView($event)">
        </mn-calendar-view>
    `
})
export class MnCalendarComponent implements OnInit, OnChanges {

    @Input() year: number;
    @Input() month: number;
    @Input() date: number = 1;

    // 日历类型，normal, prev, next
    @Input() type: string = 'normal';

    // 日历模式, single, multiple
    @Input() mode: string = 'single';

    @Input() minDate: string | number = mu.timestamp('2017-09-12');
    @Input() maxDate: string | number = mu.timestamp('2017-12-09');

    @Input() startDate: any;
    @Input() endDate: any;

    @ViewChild(MnCalendarViewComponent) _viewComponent: MnCalendarViewComponent;

    _year: number;
    _month: number;

    _current = new Date();
    _view: any;

    _show: any = {
        prev_year: true,
        prev_month: true,
        next_year: true,
        next_month: true
    };

    constructor(private _mds: MnDatetimeServices) {
        mu.run(!(this.year && this.month), () => {
            this._year = this._current.getFullYear();
            this._month = this._current.getMonth() + 1;
        });
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        mu.run(mu.prop(changes, 'year.currentValue'), (year) => {
            this._year = year;
        });

        mu.run(mu.prop(changes, 'month.currentValue'), (month) => {
            this._month = month;
        });
    }

    getPrevMonth() {
        this._month = this._month - 1;
    }

    _getPrevMonth = this.getPrevMonth;

    getPrevYear() {
        this._month = this._view.month;
        this._year = this._view.year - 1;
    }

    _getPrevYear = this.getPrevYear;

    getNextMonth() {
        this._month = this._month + 1;
        console.debug(this._month);
    }

    _getNextMonth = this.getNextMonth;

    getNextYear() {
        this._month = this._view.month;
        this._year = this._view.year + 1;
    }

    _getNextYear = this.getNextYear;

    getView(e) {
        this._view = e;
        this.getShow();
    }

    _getView = this.getView;

    // 防止触发
    // Expression has changed after it was checked.
    getShow: any = mu.debounce(() => {
        mu.run(this._show, () => {
            mu.run(this.maxDate, (maxDate) => {
                // 获取下一年这月的时间戳
                let next_year_rang = this._mds.getRangTimestamp(this._view.year + 1, this._view.month);
                this._show.next_year = next_year_rang.start < maxDate;
                this._show.next_month = this._view.range.end < maxDate;

            });

            mu.run(this.minDate, (minDate) => {
                let prev_year_rang = this._mds.getRangTimestamp(this._view.year - 1, this._view.month);
                this._show.prev_year = prev_year_rang.end > minDate;
                this._show.prev_month = (this._view.range.start > minDate);
            });
        });
    }, 300);





}
