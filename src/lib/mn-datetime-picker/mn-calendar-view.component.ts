import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {MnDatetimeServices} from './mn-datetime.services';
import {MnDate} from './mn-date.class';

import  mu from 'mzmu';

@Component({
    selector: 'mn-calendar-view',
    template: `
        <div class="p-8 bordered">
            <ol>
                <li>
                    <mn-fill class="mnc-header">
                        <mn-col [span]="1">日</mn-col>
                        <mn-col [span]="1">一</mn-col>
                        <mn-col [span]="1">二</mn-col>
                        <mn-col [span]="1">三</mn-col>
                        <mn-col [span]="1">四</mn-col>
                        <mn-col [span]="1">五</mn-col>
                        <mn-col [span]="1">六</mn-col>
                    </mn-fill>

                    <mn-fill *ngFor="let week of calendar" class="mnc-items" [gutter]="2">
                        <mn-col [span]="1" *ngFor="let d of week"
                                [class.prev]="d?.status === 'prev'"
                                [class.next]="d?.status === 'next'"
                                [class.today]="d?.is_today"
                                [class.no-selected]="d?.no_selected"
                                [class.b]="d?.day === 1"
                                [class.selected]="selected(d)"
                                [class.start]="started(d)"
                                [class.end]="ended(d)"
                                [class.range]="ranged(d)"
                                [class.range-reverse]="reverseRanged(d)"
                                (mouseover)="hovered(d)"
                                (click)="selectedDate(d, viewType, mode, $event)">
                            {{d?.days?.date === 1 ? d?.days.month + '-' + d?.days.date : d?.days.date}}
                            <!--{{d.year}}-{{d.month}}-{{d.date}}-->
                        </mn-col>
                    </mn-fill>
                </li>
            </ol>
        </div>
    `,
    styleUrls: ['./mn-datetime-picker.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MnCalendarViewComponent implements OnInit, OnChanges {

    @Input('mnYear') year: number;
    @Input('mnMonth') month: number;
    @Input('mnDate') day: number = 1;
    @Input('mnViewType') viewType: string = 'view';
    @Input('mnMode') mode: string = 'single';

    @Input('mnMinDate')
    set minDate(date) {
        this.minDate_ = new MnDate(date);
    }

    @Input('mnMaxDate')
    set maxDate(date) {
        this.maxDate_ = new MnDate(date);
    }

    @Input('mnStartDate')
    set startDate(date) {
        this.selected_start = new MnDate(date);
    }

    @Input('mnEndDate')
    set endDate(date) {
        this.selected_end = new MnDate(date);
    }

    @Output('mnResult') result = new EventEmitter<any>();

    calendar: any[];
    current_month: number;

    selected_start: any = {};
    selected_end: any = {};

    // 鼠标滑过日期
    _selected_end: any;

    minDate_: any;
    maxDate_: any;

    current: any;
    prev_month: any;
    next_month: any;

    constructor(private _mds: MnDatetimeServices) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {

        // year or month change
        mu.run(mu.prop(changes, 'year.currentValue') || mu.prop(changes, 'month.currentValue'), () => {
            this._draw();
        });

        mu.run(changes.minDate, (change) => {
            if (!change.firstChange) {
                this._debounceDraw();
            }
        });

        mu.run(changes.maxDate, (change) => {
            if (!change.firstChange) {
                this._debounceDraw();
            }
        });
    }

    _debounceDraw: any = mu.debounce(() => {
        this._draw();
    }, 500);

    _draw() {
        // 年月必须同时存在
        if (!(this.year && this.month)) {
            let d = new Date();
            this.year = d.getFullYear();
            this.month = d.getMonth() + 1;
        }

        // 获取当前时间信息
        let current = this.current = new MnDate(this._getDate(this.year, this.month, this.day));

        let prev = this.prev_month = current.mom(-1);
        let next = this.next_month = current.mom(1);

        this.result.emit(current);

        // 获取日历时间列表
        const dates = mu.run(() => {
            let prev_dates = [], current_dates = [], next_dates = [];

            let i = 0;
            while (i < current.months.startWeekday) {
                let _d = this.getDate(prev.year, prev.month, prev.days - i);
                prev_dates.push(_d);
                i++;
            }
            prev_dates = prev_dates.reverse();

            current_dates = mu.map(current.months.days, (day) => {
                return this.getDate(current.days.year, current.days.month, day);
            }, []);

            const len = 42 - prev_dates.length - current_dates.length;
            for (let j = 1; j <= len; j++) {

                let _d = this.getDate(next.year, next.month, j);
                next_dates.push(_d);
            }

            return [...prev_dates, ...current_dates, ...next_dates];
        });

        let _dates = mu.map(6, (i) => {
            return new Array(7);
        }, []);

        mu.each(42, (i, ii) => {
            let row = Math.floor(ii / 7);
            let col = ii % 7;
            _dates[row][col] = dates[ii];
        });

        this.calendar = _dates;
    }

    // 获得日期字符串
    _getDate(year: number, month: number = 1, day: number = 1): string {
        return `${year}-${mu.leftpad(month, 2)}-${mu.leftpad(day, 2)}`;
    }

    // 获得当前日期
    getDate(year: number, month: number, day: number): any {

        const date = this._getDate(year, month, day);
        const rst: any = new MnDate(date);

        rst.is_today = rst.days.start === mu.timestamp(new Date(), 'hhmmssSS');

        rst.status = this.prev_month.end > rst.months.start
            ? 'prev' : this.next_month.start < rst.months.end
                ? 'next' : 'current';

        mu.run(this.minDate_, (min) => {
            rst.min_date = min._ts;
            rst.min = rst.days.end < min._ts;
        });

        mu.run(this.maxDate_, (max) => {
            rst.max_date = max._ts;
            rst.max = rst.days.start > max._ts;
        });

        rst.no_selected = mu.ifnvl(rst.min, false) || mu.ifnvl(rst.max, false);

        return rst;
    }

    selectedDate(date, type, mode) {
        if (this.mode === 'single' && !date.no_selected) {
            this.selected_start = date;
            this.result.emit(date);
        }
    }

    selected(d) {
        if (this.mode === 'single') {
            return mu.run(this.selected_start, () => {
                return d.days.start === mu.prop(this.selected_start, 'days.start');
            });
        }
    }

    hovered(d) {
        return d;
    }

    started(d) {
        if (d.status === 'current' && this.mode === 'multiple') {
            return mu.run(this.selected_start, () => {
                return d.days.start === mu.prop(this.selected_start, 'days.start');
            });
        }
    }

    ended(d) {
        if (d.status === 'current' && this.mode === 'multiple') {
            return mu.run(this.selected_end, () => {
                return d.days.start === mu.prop(this.selected_end, 'days.start');
            });
        }
    }

    /**
     * 判断时间区间
     * @param d
     */
    ranged(d) {
        let selected_end = mu.ifempty(this.selected_end, this._selected_end);
        if (this.mode === 'multiple' && mu.isNotEmpty(this.selected_start) && mu.isNotEmpty(selected_end)) {
            return d.days.start > this.selected_start.days.end && d.days.end < selected_end.days.end;
            // try {
            //     return d.days.start > this.selected_start.days.end && d.days.end < selected_end.days.end;
            // } catch (e) {
            //     console.log(this.selected_start);
            //     console.log(d);
            //     console.log(this.selected_end, this._selected_end);
            // }
        }
    }

    /**
     * 反向日期显示
     * @param d
     * @return {boolean}
     */
    reverseRanged(d) {
        if (this.mode === 'multiple' && mu.isNotEmpty(this._selected_end) && mu.isNotEmpty(this.selected_start)) {
            return d.days.end < this.selected_start.days.start && d.days.end > this._selected_end.days.start;
        }
    }
}
