import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
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

                    <mn-fill *ngFor="let week of calendar" class="mnc-items">
                        <mn-col [span]="1" *ngFor="let d of week"
                                [class.prev]="d.month < current_month"
                                [class.next]="d.month > current_month"
                                [class.today]="d.is_today"
                                [class.no-selected]="d.range.end < minDate || d.range.start > maxDate"
                                [class.b]="d.day === 1"
                                [class.selected]="selected(d)"
                                [class.start]="started(d)"
                                [class.end]="ended(d)"
                                (click)="selectedDate(d, type, mode, $event)">
                            {{d.day === 1 ? d.month + '-' + d.day : d.day}}
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
    @Input() date: number = 1;
    @Input() type: string = 'view';
    @Input() mode: string;

    @Input() maxDate: string | number | any;
    @Input() minDate: string | number | any;

    @Input()
    set startDate(date) {
        this.selected_start = mu.type(date, 'object') ? date : this._getDate(date);
    }

    @Input()
    set endDate(date) {
        this.selected_end = mu.type(date, 'object') ? date : this._getDate(date);
    }

    @Output() result = new EventEmitter<any>();

    calendar: any[];
    current_month: number;

    selected_start: any = {};
    selected_end: any = {};

    constructor(private _mds: MnDatetimeServices) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {

        mu.exist(mu.prop(changes, 'maxDate.currentValue'), () => {
            this.maxDate = mu.timestamp(this.maxDate);
        });

        mu.exist(mu.prop(changes, 'minDate.currentValue'), () => {
            this.minDate = mu.timestamp(this.minDate);
        });

        console.debug('::::::::::::::::');

        mu.run(mu.prop(changes, 'year.currentValue') || mu.prop(changes, 'month.currentValue'), () => {
            let d = new Date(this.year, this.month, 0);
            let current_year = d.getFullYear();
            let current_month = d.getMonth() + 1;
            this.current_month = current_month;

            this.result.emit({
                year: current_year,
                month: current_month,
                range: this._mds.getRangTimestamp(current_year, current_month)
            });

            console.debug(this.type, this.month, mu.format(d, 'yyyy-MM-dd'));

            // 获得月份的最后一天
            // 即当前月份的天数
            let current_date = d.getDate();

            // 日历中当前月份的天数
            let current_day = current_date;

            // 获得当前月份的第一天是周几
            d.setDate(1);
            let current_first_day = d.getDay();

            // 获得上个月的最后一天
            d.setDate(0);
            let last_month_date = d.getDate();
            let prev_year = d.getFullYear();
            let prev_month = d.getMonth() + 1;
            let first_date_ = last_month_date - current_first_day;

            // 获得下个月的日期信息
            let nd = new Date(this.year, this.month + 1, 0);
            let next_month = nd.getMonth() + 1;
            let next_year = nd.getFullYear();

            // 勾画当前月份日历视图数据
            let _calendar = mu.map(6, (i) => {
                return new Array(7);
            }, []);

            // prev current next
            let status = 'prev';

            // 构建日期数组
            mu.each(42, (i, ii) => {
                let index_1 = Math.floor(ii / 7);
                let index_2 = ii % 7;

                if (!ii && !current_first_day) {
                    status = 'current';
                }

                if (status === 'next') {
                    let _nd = i - current_first_day - current_date;
                    _calendar[index_1][index_2] = this.getDate(next_year, next_month, index_2, _nd);
                }

                if (status === 'current') {
                    let _cd = i - current_first_day;
                    _calendar[index_1][index_2] = this.getDate(current_year, current_month, index_2, _cd);
                    if (_cd === current_date) {
                        status = 'next';
                    }
                }

                if (i <= current_first_day) {
                    let _pd = i + first_date_;
                    _calendar[index_1][index_2] = this.getDate(prev_year, prev_month, index_2, _pd);
                    if (i === current_first_day) {
                        status = 'current';
                    }
                }

            });

            this.calendar = _calendar;
        });
    }

    isToday(year, month, date) {
        const today = new Date();
        return today.getFullYear() === year && (today.getMonth() + 1) === month && today.getDate() === date;
    }

    timestamp(year, month, date) {
        let d = new Date(year, month - 1, date, 0, 0, 0, 0);
        const start = +d;
        d = new Date(year, month - 1, date, 23, 59, 59, 999);
        const end = +d;

        return {
            start,
            end
        };
    }

    // 获得当前日期
    getDate(year: number, month: number, weekday: number, day: number): any {
        return {
            day: day,
            year: year,
            month: month,
            weekday: weekday,
            is_today: this.isToday(year, month, day),
            range: this.timestamp(year, month, day),
            status: month < this.current_month ? 'prev' : month > this.current_month ? 'next' : 'current'
        };
    }

    _getDate(date: any): any {
        if (date) {
            date = mu.timestamp(date);
            date = new Date(date);
            const year = date.getFullYear();
            const month = date.getMonth();
            const weekday = date.getDay();
            const day = date.getDate();
            return this.getDate(year, month, weekday, day);
        }

    }

    selectedDate(date, type, mode) {
        if (this.mode === 'single') {
            this.selected_start = date;
        }

        console.debug(date);
    }

    selected(d) {
        if (this.mode === 'single') {
            return mu.run(this.selected_start, () => {
                return d.range.start === mu.prop(this.selected_start, 'range.start');
            });
        }
    }

    started(d) {
        if (this.mode === 'multiple' && d.month === this.current_month) {
            return mu.run(this.selected_start, () => {
                return d.range.start === mu.prop(this.selected_start, 'range.start');
            });
        }
    }

    ended(d) {
        if (this.mode === 'multiple' && d.month === this.current_month) {
            return mu.run(this.selected_end, () => {
                return d.range.start === mu.prop(this.selected_end, 'range.start');
            });
        }
    }
}
