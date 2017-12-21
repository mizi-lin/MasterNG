import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MnDate} from './mn-date.class';
import {MnDatetimeServices} from './mn-datetime.services';

declare const mu: any;

/**
 * 构建日期视图
 */

@Component({
    selector: 'mn-datedraw',
    template: `
        <mn-fill [gutter]="2" *ngIf="_view === 'days'" class="mnc-weekdays">
            <mn-col [span]="1">Mo</mn-col>
            <mn-col [span]="1">Tu</mn-col>
            <mn-col [span]="1">We</mn-col>
            <mn-col [span]="1">Th</mn-col>
            <mn-col [span]="1">Fr</mn-col>
            <mn-col [span]="1">Sa</mn-col>
            <mn-col [span]="1">Su</mn-col>
        </mn-fill>
        <mn-fill [gutter]="2" *ngFor="let rows of _frames">
            <mn-col [span]="1" *ngFor="let dt of rows">
                <mn-datesingle
                        [mnMaxDate]="_maxDate"
                        [mnMinDate]="_minDate"
                        [mnStartDate]="_startDate"
                        [mnEndDate]="_endDate"
                        [mnHoverDate]="_hoverDate"
                        [mnDate]="dt?.mndate"
                        [mnStatus]="dt?.status"
                        [mnView]="_view"
                        (click)="getStartEndDate(dt?.mndate)"
                        (mouseover)="getHover(dt)"></mn-datesingle>
            </mn-col>
        </mn-fill>
    `
})
export class MnDateDrawComponent implements OnInit, OnDestroy {

    $date: any = {};
    date$: any = new BehaviorSubject<any>({});

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

    _hoverDate: any;

    @Input('mnHoverDate')
    set hoverDate_(dt) {
        this._hoverDate = new MnDate(dt);
    }

    _startDate: any;

    @Input('mnStartDate')
    set startDate_(dt) {
        this._startDate = this.reStartDate(dt);
    }

    _endDate: any;

    @Input('mnEndDate')
    set endDate_(dt) {
        this._endDate = this.reEndDate(dt);
    }

    @Input('mnYear')
    set year_(y) {
        this.$date.y = y;
        this.date$.next(this.$date);
    }

    @Input('mnMonth')
    set month_(m) {
        this.$date.m = m - 1;
        this.date$.next(this.$date);
    }

    @Input('mnDay')
    set day_(d) {
        this.$date.d = d;
        this.date$.next(this.$date);
    }

    @Input('mnDate')
    set date_(dt) {

    }

    @Input('mnView') _view: string;

    _frames: any;
    _max: boolean;
    _min: boolean;

    dmap: any = {
        y: 'setFullYear',
        m: 'setMonth',
        d: 'setDate'
    };

    constructor(private _mds: MnDatetimeServices) {
        this.date$.subscribe((d) => {
            this.bounce(d);
        });
    }

    ngOnInit() {
        this._frames = this.buildFrame();

        this._startEnd.emit({
            startDate: this._startDate,
            endDate: this._endDate
        });
    }

    ngOnDestroy() {
        this.date$.unsubscribe();
    }

    newdate() {
        return new Date(1970, 0, 1, 0, 0, 0, 0);
    }

    bounce: any = mu.debounce((ds: any) => {
        let date = this.newdate();
        mu.each(ds, (v, f) => {
            date[this.dmap[f]](v);
        });

        let pools = this.datePools(date, ds);
        this.fill(pools);
    }, 300);

    /**
     * 根据不同的视图，创建时间集合架子
     */
    buildFrame(): void {

        switch (this._view) {

            // 年视图
            // 5 年视图
            // row 5 col 4
            case 'years':
                return mu.map(4, (i) => {
                    return new Array(3);
                }, []);


            // 季度视图
            // 5 年视图
            // row 5 col 4
            case 'quarters':
                return mu.map(4, (i) => {
                    return new Array(1);
                }, []);


            // 月视图
            // row 4 col 3
            case 'months':
                return mu.map(4, (i) => {
                    return new Array(3);
                }, []);

            // 周视图
            // 当年周数
            // row 7 col 8
            case 'weeks':
                return mu.map(7, (i) => {
                    return new Array(8);
                }, []);

            // 日视图
            case 'days':
                return mu.map(6, (i) => {
                    return new Array(7);
                }, []);
        }
    }

    /**
     * 当前日历数据集
     * @return {any}
     */
    datePools(date, ds): any {

        let mndate = new MnDate(date);

        this._result.emit(mndate);

        let _pools = [];

        switch (this._view) {

            // 年视图
            // 5 年视图
            // row 5 col 4
            case 'years':
                let year = mndate.months.year;
                let startYear = Math.floor(year / 10) * 10 - 1;

                mu.each(12, (ii, i) => {
                    _pools.push({
                        st: i === 0 ? 'prev' : i === 11 ? 'next' : 'current',
                        d: 1,
                        m: 1,
                        y: startYear + i
                    });
                });

                return _pools;

            // 季度视图
            // 5 年视图
            // row 5 col 4
            case 'quarters':
                mu.each(4, (i) => {
                    _pools.push({
                        st: 'current',
                        d: 1,
                        m: (i - 1) * 3 + 1,
                        y: mndate.months.year
                    });
                });

                return _pools;


            // 月视图
            // row 4 col 3
            case 'months':
                mu.each(12, (i) => {
                    _pools.push({
                        st: 'current',
                        d: 1,
                        m: i,
                        y: mndate.months.year
                    });
                });

                return _pools;

            // 周视图
            // 当年周数
            // row 7 col 8
            case 'weeks':
                return mu.map(7, (i) => {
                    return new Array(8);
                }, []);

            // 日视图
            case 'days':
                let ct = mndate['months'];
                let pre = mndate.mom(-1);
                let next = mndate.mom(1);

                // pre month
                mu.each(pre.endWeekday, (i, ii) => {
                    _pools.unshift({
                        st: 'prev',
                        d: pre.days - ii,
                        m: pre.month,
                        y: pre.year
                    });
                });

                // current month
                mu.each(ct.days, (i) => {
                    _pools.push({
                        st: 'current',
                        d: i,
                        m: ct.month,
                        y: ct.year
                    });
                });

                mu.each(42 - _pools.length, (i) => {
                    _pools.push({
                        st: 'next',
                        d: i,
                        m: next.month,
                        y: next.year
                    });
                });

                return _pools;
        }
    }

    /**
     * 填充时间
     * @param pools
     */
    fill(pools) {
        let _cols = this._frames[0].length;
        mu.each(pools, (dt, ii) => {
            let row = Math.floor(ii / _cols);
            let col = ii % _cols;
            this._frames[row][col] = {
                status: dt.st,
                mndate: new MnDate(`${dt.y}/${dt.m}/${dt.d}`)
            };
        });
    }

    /**
     * 选择开始和结束时间
     * @param dt
     */
    getStartEndDate(dt) {

        if (this._mds.range(this._view, dt, this._minDate, this._maxDate) !== 2) {
            return;
        }

        if (mu.isNotEmpty(this._endDate)) {
            this._startDate = dt;
            this._endDate = void 0;
        } else if (mu.isNotEmpty(this._startDate)) {
            // startDate must lg endDate
            if (this._startDate._d > dt._d) {
                this._endDate = this._startDate;
                this._startDate = dt;
            } else {
                this._endDate = dt;
            }

        } else {
            this._startDate = dt;
        }

        this._startEnd.emit({
            startDate: this._startDate,
            endDate: this._endDate
        });

    }

    getHover(dt) {
        if (mu.isEmpty(dt)) {
            this._hoverDate = void 0;
        } else if (mu.isNotEmpty(this._startDate) && mu.isNotEmpty(this._endDate)) {
            this._hoverDate = void 0;
        } else {
            this._hoverDate = dt.mndate;
        }

        this._hover.emit(this._hoverDate);
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
}

