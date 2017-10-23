import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {MnDatetimeServices} from './mn-datetime.services';

declare const mu: any;

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
                            {{d?.day === 1 ? d?.month + '-' + d?.day : d?.day}}
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

    @Input() year: number;
    @Input() month: number;
    @Input() day: number = 1;
    @Input() viewType: string = 'view';
    @Input() mode: string = 'single';

    @Input()
    set minDate(date) {
        this.minDate_ = this._mds.mndate(date);
    }

    @Input()
    set maxDate(date) {
        this.maxDate_ = this._mds.mndate(date);
    }

    @Input()
    set startDate(date) {
        this.selected_start = this._mds.mndate(date);
    }

    @Input()
    set endDate(date) {
        this.selected_end = this._mds.mndate(date);
    }

    @Output() result = new EventEmitter<any>();

    calendar: any[];
    current_month: number;

    selected_start: any = {};
    selected_end: any = {};

    // 鼠标滑过日期
    _selected_end: any;

    minDate_: any;
    maxDate_: any;

    current: any;
    prev: any;
    next: any;

    constructor(private _mds: MnDatetimeServices) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {

        // year or month change
        mu.run(mu.prop(changes, 'year.currentValue') || mu.prop(changes, 'month.currentValue'), () => {

            // 年月必须同时存在
            if (!(this.year && this.month)) {
                let d = new Date();
                this.year = d.getFullYear();
                this.month = d.getMonth() + 1;
            }

            // 获取当前时间信息
            let current = this.current = this._mds.mndate(this._getDate(this.year, this.month, this.day));
            let prev = this.prev = current.mom(-1);
            let next = this.next = current.mom(1);

            this.result.emit(current);

            // 获取日历时间列表
            const dates = mu.run(() => {
                let prev_dates = [], current_dates = [], next_dates = [];

                let i = 0;
                while (i < current.month_range.first_day_weekday) {
                    let _d = this.getDate(prev.year, prev.month, prev.month_range.last_day - i);
                    prev_dates.push(_d);
                    i++;
                }
                prev_dates = prev_dates.reverse();

                current_dates = mu.map(current.month_range.last_day, (day) => {
                    return this.getDate(current.year, current.month, day);
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
        });
    }

    // 获得日期字符串
    _getDate(year: number, month: number = 1, day: number = 1): string {
        return `${year}-${mu.leftpad(month, 2)}-${mu.leftpad(day, 2)}`;
    }

    // 获得当前日期
    getDate(year: number, month: number, day: number): any {

        const date = this._getDate(year, month, day);
        const rst = this._mds.mndate(date);
        rst.is_today = rst.range.start === mu.timestamp(new Date(), 'hhmmssSS');
        rst.status = this.prev.month_range.end > rst.month_range.start
            ? 'prev' : this.next.month_range.start < rst.month_range.end
            ? 'next' : 'current';

        mu.run(this.minDate_, (min) => {
            rst.min_date = min.current;
            rst.min = rst.range.end < min.current;
        });

        mu.run(this.maxDate_, (max) => {
            rst.max_date = max.current;
            rst.max = rst.range.start > max.current;
        });

        rst.no_selected = mu.ifnvl(rst.min, false) || mu.ifnvl(rst.max, false);

        return rst;
    }

    selectedDate(date, type, mode) {
        if (this.mode === 'single' && !date.not_selected) {
            this.selected_start = date;
            this.result.emit(date);
        }
    }


    selected(d) {
        if (this.mode === 'single') {
            return mu.run(this.selected_start, () => {
                return d.range.start === mu.prop(this.selected_start, 'range.start');
            });
        }
    }

    hovered(d) {
    }

    started(d) {
        if (d.status === 'current' && this.mode === 'multiple') {
            return mu.run(this.selected_start, () => {
                return d.range.start === mu.prop(this.selected_start, 'range.start');
            });
        }
    }

    ended(d) {
        if (d.status === 'current' && this.mode === 'multiple') {
            return mu.run(this.selected_end, () => {
                return d.range.start === mu.prop(this.selected_end, 'range.start');
            });
        }
    }

    /**
     * 判断时间区间
     * @param d
     */
    ranged(d) {
        let selected_end = this.selected_end || this._selected_end;
        if (this.mode === 'multiple' && this.selected_start && selected_end) {
            return d.range.start > this.selected_start.range.end && d.range.end < selected_end.range.end;
        }
    }

    /**
     * 反向日期显示
     * @param d
     * @return {boolean}
     */
    reverseRanged(d) {
        if (this.selected_end) {
            return;
        }

        if (this.mode === 'multiple' && this._selected_end && this.selected_start) {
            return d.range.end < this.selected_start.range.start && d.range.end > this._selected_end.range.start;
        }
    }
}
