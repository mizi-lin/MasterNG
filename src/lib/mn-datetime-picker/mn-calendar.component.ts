import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MnDatetimeServices} from './mn-datetime.services';
import {MnCalendarViewComponent} from './mn-calendar-view.component';
import {MnDate} from './mn-date.class';

declare const mu: any;
export const YEAR_MILLISECONDS = 864000;

@Component({
    selector: 'mn-calendar',
    template: `
        <mn-fill [hph]="false" class="mnc-header">
            <mn-col [style.width.px]="60" class="mnc-header-prev">
                <i class="fa fa-angle-double-left"
                   (click)="getPrevYear()"
                   *ngIf="viewType !== 'next' && _show.prev_year">
                </i>
                <i class="fa fa-angle-left"
                   (click)="getPrevMonth()"
                   *ngIf="(viewType !== 'next') && _show.prev_month">
                </i>

            </mn-col>
            <mn-col [span]="1" class="mnc-header-current">
                {{this._view?.months.year}}-{{this._view?.months.month | mu: 'leftpad': 2}}
            </mn-col>
            <mn-col [style.width.px]="60" class="mnc-header-next">
                <i class="fa fa-angle-right"
                   (click)="getNextMonth()"
                   *ngIf="viewType !== 'prev' && _show.next_month">
                </i>
                <i class="fa fa-angle-double-right"
                   (click)="getNextYear()"
                   *ngIf="viewType !== 'prev' && _show.next_year">
                </i>
            </mn-col>
        </mn-fill>

        <mn-calendar-view
                [mnYear]="_year"
                [mnMonth]="_month"
                [mnDate]="23"
                [mnMinDate]="minDate_"
                [mnMaxDate]="maxDate_"
                [mnViewType]="viewType"
                [mnMode]="mode"
                [mnStartDate]="startDate"
                [mnEndDate]="endDate"
                (mnResult)="getView($event)">
        </mn-calendar-view>
    `
})
export class MnCalendarComponent implements OnInit, OnChanges {

    @Input('mnYear') year: number;
    @Input('mnMonth') month: number;
    @Input('mnDate') date: number = 1;

    // 日历类型，normal, prev, next
    @Input('mnViewType') viewType: string = 'normal';

    // 日历模式, single, multiple
    @Input('mnMode') mode: string = 'single';

    @Input('mnMinDate')
    set minDate(date) {
        this.minDate_ = new MnDate(date);
    }

    @Input('mnMaxDate')
    set maxDate(date) {
        this.maxDate_ = new MnDate(date);
    }

    @Input('mnStartDate') startDate: any;
    @Input('mnEndDate') endDate: any;

    @Output('mnResult') result: any = new EventEmitter<any>();

    @ViewChild(MnCalendarViewComponent)
    set viewComponent(_vc) {
        this._viewComponent = _vc;

        _vc.selectedDate = (date) => {
            if (this.mode === 'single' && !date.no_selected) {
                if (date.status !== 'current') {
                    let _md = this._view.mom(date.status === 'prev' ? -1 : 1);
                    this._year = _md.year;
                    this._month = _md.month;
                    date.status = 'current';
                }

                _vc.selected_start = date;
            }
        };

    }

    _viewComponent: MnCalendarViewComponent;

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

    minDate_: any;
    maxDate_: any;

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
        let _prev = this._view.mom(-1);
        this._month = _prev.month;
        this._year = _prev.year;
        return _prev;
    }

    _getPrevMonth = this.getPrevMonth;

    getPrevYear(): any {
        let _prev = this._view.yoy(-1);
        this._year = _prev.year;
        return _prev;
    }

    _getPrevYear = this.getPrevYear;

    getNextMonth(): any {
        let _next = this._view.mom(1);
        this._month = _next.month;
        this._year = _next.year;
        return _next;
    }

    _getNextMonth = this.getNextMonth;

    getNextYear() {
        let _next = this._view.yoy(1);
        this._year = _next.year;
        return _next;
    }

    _getNextYear = this.getNextYear;

    getView(e) {
        this._view = e;
        this.getShow();
        this.result.emit(e);
    }

    _getView = this.getView;

    // 设置按钮显示
    // FIXED NG ERROR::: Expression has changed after it was checked.
    getShow: any = mu.debounce(() => {
        mu.run(this._show, () => {
            mu.run(this.maxDate_, (max) => {
                // 获取下一年这月的时间戳
                let next_year = this._view.yoy(1);
                this._show.next_year = next_year.start < max._ts;
                this._show.next_month = this._view.months.end < max._ts;

            });

            mu.run(this.minDate_, (min) => {
                let prev_year = this._view.yoy(-1);
                this._show.prev_year = prev_year.end > min._ts;
                this._show.prev_month = this._view.months.start > min._ts;
            });
        });
    }, 300);

}
