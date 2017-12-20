"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var mn_date_class_1 = require("./mn-date.class");
var mn_datetime_services_1 = require("./mn-datetime.services");
/**
 * 构建日期视图
 */
var MnDateDrawComponent = (function () {
    function MnDateDrawComponent(_mds) {
        var _this = this;
        this._mds = _mds;
        this.$date = {};
        this.date$ = new BehaviorSubject_1.BehaviorSubject({});
        this._result = new core_1.EventEmitter();
        this._startEnd = new core_1.EventEmitter();
        this._hover = new core_1.EventEmitter();
        this.dmap = {
            y: 'setFullYear',
            m: 'setMonth',
            d: 'setDate'
        };
        this.bounce = mu.debounce(function (ds) {
            var date = _this.newdate();
            mu.each(ds, function (v, f) {
                date[_this.dmap[f]](v);
            });
            var pools = _this.datePools(date, ds);
            _this.fill(pools);
        }, 300);
        this.date$.subscribe(function (d) {
            _this.bounce(d);
        });
    }
    Object.defineProperty(MnDateDrawComponent.prototype, "maxDate_", {
        set: function (dt) {
            this._maxDate = new mn_date_class_1.MnDate(dt);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateDrawComponent.prototype, "minDate_", {
        set: function (dt) {
            this._minDate = new mn_date_class_1.MnDate(dt);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateDrawComponent.prototype, "hoverDate_", {
        set: function (dt) {
            this._hoverDate = new mn_date_class_1.MnDate(dt);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateDrawComponent.prototype, "startDate_", {
        set: function (dt) {
            this._startDate = this.reStartDate(dt);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateDrawComponent.prototype, "endDate_", {
        set: function (dt) {
            this._endDate = this.reEndDate(dt);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateDrawComponent.prototype, "year_", {
        set: function (y) {
            this.$date.y = y;
            this.date$.next(this.$date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateDrawComponent.prototype, "month_", {
        set: function (m) {
            this.$date.m = m - 1;
            this.date$.next(this.$date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateDrawComponent.prototype, "day_", {
        set: function (d) {
            this.$date.d = d;
            this.date$.next(this.$date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateDrawComponent.prototype, "date_", {
        set: function (dt) {
        },
        enumerable: true,
        configurable: true
    });
    MnDateDrawComponent.prototype.ngOnInit = function () {
        this._frames = this.buildFrame();
        this._startEnd.emit({
            startDate: this._startDate,
            endDate: this._endDate
        });
    };
    MnDateDrawComponent.prototype.ngOnDestroy = function () {
        this.date$.unsubscribe();
    };
    MnDateDrawComponent.prototype.newdate = function () {
        return new Date(1970, 0, 1, 0, 0, 0, 0);
    };
    /**
     * 根据不同的视图，创建时间集合架子
     */
    /**
         * 根据不同的视图，创建时间集合架子
         */
    MnDateDrawComponent.prototype.buildFrame = /**
         * 根据不同的视图，创建时间集合架子
         */
    function () {
        switch (this._view) {
            // 年视图
            // 5 年视图
            // row 5 col 4
            case 'years':
                return mu.map(4, function (i) {
                    return new Array(3);
                }, []);
            // 季度视图
            // 5 年视图
            // row 5 col 4
            case 'quarters':
                return mu.map(4, function (i) {
                    return new Array(1);
                }, []);
            // 月视图
            // row 4 col 3
            case 'months':
                return mu.map(4, function (i) {
                    return new Array(3);
                }, []);
            // 周视图
            // 当年周数
            // row 7 col 8
            case 'weeks':
                return mu.map(7, function (i) {
                    return new Array(8);
                }, []);
            // 日视图
            case 'days':
                return mu.map(6, function (i) {
                    return new Array(7);
                }, []);
        }
    };
    /**
     * 当前日历数据集
     * @return {any}
     */
    /**
         * 当前日历数据集
         * @return {any}
         */
    MnDateDrawComponent.prototype.datePools = /**
         * 当前日历数据集
         * @return {any}
         */
    function (date, ds) {
        var mndate = new mn_date_class_1.MnDate(date);
        this._result.emit(mndate);
        var _pools = [];
        switch (this._view) {
            // 年视图
            // 5 年视图
            // row 5 col 4
            case 'years':
                var year = mndate.months.year;
                var startYear_1 = Math.floor(year / 10) * 10 - 1;
                mu.each(12, function (ii, i) {
                    _pools.push({
                        st: i === 0 ? 'prev' : i === 11 ? 'next' : 'current',
                        d: 1,
                        m: 1,
                        y: startYear_1 + i
                    });
                });
                return _pools;
            // 季度视图
            // 5 年视图
            // row 5 col 4
            case 'quarters':
                mu.each(4, function (i) {
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
                mu.each(12, function (i) {
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
                return mu.map(7, function (i) {
                    return new Array(8);
                }, []);
            // 日视图
            case 'days':
                var ct_1 = mndate['months'];
                var pre_1 = mndate.mom(-1);
                var next_1 = mndate.mom(1);
                // pre month
                mu.each(pre_1.endWeekday, function (i, ii) {
                    _pools.unshift({
                        st: 'prev',
                        d: pre_1.days - ii,
                        m: pre_1.month,
                        y: pre_1.year
                    });
                });
                // current month
                mu.each(ct_1.days, function (i) {
                    _pools.push({
                        st: 'current',
                        d: i,
                        m: ct_1.month,
                        y: ct_1.year
                    });
                });
                mu.each(42 - _pools.length, function (i) {
                    _pools.push({
                        st: 'next',
                        d: i,
                        m: next_1.month,
                        y: next_1.year
                    });
                });
                return _pools;
        }
    };
    /**
     * 填充时间
     * @param pools
     */
    /**
         * 填充时间
         * @param pools
         */
    MnDateDrawComponent.prototype.fill = /**
         * 填充时间
         * @param pools
         */
    function (pools) {
        var _this = this;
        var _cols = this._frames[0].length;
        mu.each(pools, function (dt, ii) {
            var row = Math.floor(ii / _cols);
            var col = ii % _cols;
            _this._frames[row][col] = {
                status: dt.st,
                mndate: new mn_date_class_1.MnDate(dt.y + "/" + dt.m + "/" + dt.d)
            };
        });
    };
    /**
     * 选择开始和结束时间
     * @param dt
     */
    /**
         * 选择开始和结束时间
         * @param dt
         */
    MnDateDrawComponent.prototype.getStartEndDate = /**
         * 选择开始和结束时间
         * @param dt
         */
    function (dt) {
        if (this._max || this._min) {
            return;
        }
        if (this._mds.range(this._view, dt, this._minDate, this._maxDate) !== 2) {
            return;
        }
        if (this._endDate) {
            this._startDate = dt;
            this._endDate = void 0;
        }
        else if (this._startDate) {
            // startDate must lg endDate
            if (this._startDate._d > dt._d) {
                this._endDate = this._startDate;
                this._startDate = dt;
            }
            else {
                this._endDate = dt;
            }
        }
        else {
            this._startDate = dt;
        }
        this._startEnd.emit({
            startDate: this._startDate,
            endDate: this._endDate
        });
    };
    MnDateDrawComponent.prototype.getHover = function (dt) {
        if (mu.isEmpty(dt)) {
            this._hoverDate = void 0;
        }
        else if (mu.isNotEmpty(this._startDate) && mu.isNotEmpty(this._endDate)) {
            this._hoverDate = void 0;
        }
        else {
            this._hoverDate = dt.mndate;
        }
        this._hover.emit(this._hoverDate);
    };
    /**
     * 重新计算startDate
     * @param dt
     * @return {any}
     */
    /**
         * 重新计算startDate
         * @param dt
         * @return {any}
         */
    MnDateDrawComponent.prototype.reStartDate = /**
         * 重新计算startDate
         * @param dt
         * @return {any}
         */
    function (dt) {
        dt = new mn_date_class_1.MnDate(dt);
        if (this._minDate) {
            return this._minDate._date > dt._date ? this._minDate : dt;
        }
        return dt;
    };
    /**
     * 重新计算结束时间
     * @param dt
     * @return {any}
     */
    /**
         * 重新计算结束时间
         * @param dt
         * @return {any}
         */
    MnDateDrawComponent.prototype.reEndDate = /**
         * 重新计算结束时间
         * @param dt
         * @return {any}
         */
    function (dt) {
        dt = new mn_date_class_1.MnDate(dt);
        if (this._maxDate) {
            return this._maxDate._date < dt._date ? this._maxDate : dt;
        }
        return dt;
    };
    MnDateDrawComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-datedraw',
                    template: "\n        <mn-fill [gutter]=\"2\" *ngFor=\"let rows of _frames\">\n            <mn-col [span]=\"1\" *ngFor=\"let dt of rows\">\n                <mn-datesingle\n                        [mnMaxDate]=\"_maxDate\"\n                        [mnMinDate]=\"_minDate\"\n                        [mnStartDate]=\"_startDate\"\n                        [mnEndDate]=\"_endDate\"\n                        [mnHoverDate]=\"_hoverDate\"\n                        [mnDate]=\"dt?.mndate\"\n                        [mnStatus]=\"dt?.status\"\n                        [mnView]=\"_view\"\n                        (click)=\"getStartEndDate(dt?.mndate)\"\n                        (mouseover)=\"getHover(dt)\"></mn-datesingle>\n            </mn-col>\n        </mn-fill>\n    "
                },] },
    ];
    /** @nocollapse */
    MnDateDrawComponent.ctorParameters = function () { return [
        { type: mn_datetime_services_1.MnDatetimeServices, },
    ]; };
    MnDateDrawComponent.propDecorators = {
        "_result": [{ type: core_1.Output, args: ['mnResult',] },],
        "_startEnd": [{ type: core_1.Output, args: ['mnStartEnd',] },],
        "_hover": [{ type: core_1.Output, args: ['mnHover',] },],
        "maxDate_": [{ type: core_1.Input, args: ['mnMaxDate',] },],
        "minDate_": [{ type: core_1.Input, args: ['mnMinDate',] },],
        "hoverDate_": [{ type: core_1.Input, args: ['mnHoverDate',] },],
        "startDate_": [{ type: core_1.Input, args: ['mnStartDate',] },],
        "endDate_": [{ type: core_1.Input, args: ['mnEndDate',] },],
        "year_": [{ type: core_1.Input, args: ['mnYear',] },],
        "month_": [{ type: core_1.Input, args: ['mnMonth',] },],
        "day_": [{ type: core_1.Input, args: ['mnDay',] },],
        "date_": [{ type: core_1.Input, args: ['mnDate',] },],
        "_view": [{ type: core_1.Input, args: ['mnView',] },],
    };
    return MnDateDrawComponent;
}());
exports.MnDateDrawComponent = MnDateDrawComponent;
//# sourceMappingURL=mn-date-draw.component.js.map