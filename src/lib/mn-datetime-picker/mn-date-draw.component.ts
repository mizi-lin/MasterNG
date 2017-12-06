import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MnDate} from './mn-date.class';

declare const mu: any;

/**
 * 构建日期视图
 */

@Component({
    selector: 'mn-datedraw',
    template: `
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
                        (mouseover)="_hoverDate = dt?.mndate"></mn-datesingle>
            </mn-col>
        </mn-fill>
    `
})
export class MnDateDrawComponent implements OnInit, OnDestroy {

    $date: any = {};
    date$: any = new BehaviorSubject<any>({});

    @Output('mnResult') _result = new EventEmitter<any>();
    @Input('mnMaxDate') _maxDate: any;
    @Input('mnMinDate') _minDate: any;
    @Input('mnStartDate') _startDate: any;
    @Input('mnEndDate') _endDate: any;

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
    _hoverDate: any;

    dmap: any = {
        y: 'setFullYear',
        m: 'setMonth',
        d: 'setDate'
    };

    constructor() {
        this.date$.subscribe((d) => {
            this.bounce(d);
        });
    }

    ngOnInit() {
        this._frames = this.buildFrame();
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
        if (this._endDate) {
            this._startDate = dt;
            this._endDate = void 0;
        } else if (this._startDate) {
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
    }
}

