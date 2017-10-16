import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';

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
                                [class.today]="d.today"
                                [class.no-selected]="d.timestamp.end < min || d.timestamp.start > max"
                                [class.b]="d.date === 1"
                                [class.selected]="selected(d)"
                                (click)="getDate(d, $event)">
                            {{d.date === 1 ? d.month + '-' + d.date : d.date}}
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

    @Input() max: string | number | any;
    @Input() min: string | number | any;

    @Output() result = new EventEmitter<any>();

    calendar: any[];
    current_month: number;

    selected_start: any = {};
    selected_end: any = {};

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {

        mu.run(this.max, () => {
            this.max = mu.timestamp(this.max);
        });

        mu.run(this.min, () => {
            this.min = mu.timestamp(this.min);
        });

        mu.run(this.year && this.month && this.day, () => {
            let d = new Date(this.year, this.month, 0);
            let current_year = d.getFullYear();
            let current_month = d.getMonth() + 1;
            this.current_month = current_month;

            this.result.emit({
                year: current_year,
                month: current_month
            });

            console.debug(this.month, mu.format(d, 'yyyy-MM-dd'));

            // 获得月份的最后一天
            // 即当前月份的天数
            let current_date = d.getDate();

            // 日历中当前月份的天数
            let current_day = current_date;

            // 获得当前月份的第一天是周几
            d.setDate(1);
            let current_first_day = d.getDay();

            console.debug('current_first_day', current_first_day);

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
                    _calendar[index_1][index_2] = {
                        date: _nd,
                        year: next_year,
                        month: next_month,
                        week: index_2,
                        today: this.isToday(next_year, next_month, _nd),
                        timestamp: this.timestamp(next_year, next_month, _nd)
                    };
                }

                if (status === 'current') {
                    let _cd = i - current_first_day;
                    _calendar[index_1][index_2] = {
                        date: _cd,
                        year: current_year,
                        month: current_month,
                        week: index_2,
                        today: this.isToday(current_year, current_month, _cd),
                        timestamp: this.timestamp(current_year, current_month, _cd)
                    };

                    if (_cd === current_date) {
                        status = 'next';
                    }
                }

                if (i <= current_first_day) {
                    let _pd = i + first_date_;
                    _calendar[index_1][index_2] = {
                        date: _pd,
                        year: prev_year,
                        month: prev_month,
                        week: index_2,
                        today: this.isToday(prev_year, prev_month, _pd),
                        timestamp: this.timestamp(prev_year, prev_month, _pd)
                    };

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

    getDate(date) {
        this.selected_start = date;
        console.debug(date);
    }

    selected(d) {
        return mu.run(this.selected_start, () => {
            return d.timestamp.start === mu.prop(this.selected_start, 'timestamp.start')
                || d.timestamp.start === mu.prop(this.selected_end, 'timestamp.start');
        });
    }
}
