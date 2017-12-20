"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// 24 * 60 * 60 * 1000;
var DAY_TS = 86400000;
var MnDate = (function () {
    function MnDate(dateValue, formatter) {
        if (!mu.or(mu.type(dateValue), 'date', 'string', 'number')) {
            return dateValue;
        }
        this.b_ = [1970, 0, 1, 0, 0, 0, 0];
        this.bs_ = {
            '0': 'getFullYear',
            '1': 'getMonth',
            '2': 'getDate',
            '3': 'getHours',
            '4': 'getMinutes',
            '5': 'getSeconds',
            '6': 'getMilliseconds'
        };
        this._date = this.toDate(dateValue, formatter);
        this._d = this.format(this._date);
        this._ts = +this._date;
        this.days = this.getDays(this._date);
        this.months = this.getMonths(this._date);
        this.years = this.getYears(this._date);
        this.weeks = this.getWeeks(this._date);
        this.quarters = this.getQuarters(this._date);
    }
    /**
     * 将任意的时间格式转为时间类型
     * @param {number | string | any} _dateV
     * @param {string} formatter: 某些特殊组成时间的字符串时间替换
     * @return {any}
     */
    /**
         * 将任意的时间格式转为时间类型
         * @param {number | string | any} _dateV
         * @param {string} formatter: 某些特殊组成时间的字符串时间替换
         * @return {any}
         */
    MnDate.prototype.toDate = /**
         * 将任意的时间格式转为时间类型
         * @param {number | string | any} _dateV
         * @param {string} formatter: 某些特殊组成时间的字符串时间替换
         * @return {any}
         */
    function (_dateV, formatter) {
        if (_dateV === void 0) { _dateV = new Date(); }
        var _date;
        switch (mu.type(_dateV)) {
            case 'object':
                return _dateV;
            case 'number':
                _date = new Date(_dateV);
                break;
            case 'date':
                _date = _dateV;
                break;
            case 'string':
                /**
                                 * yyyy-MM-dd 转为 yyyy/MM/dd
                                 * new Date(yyyy/MM/dd) 为原点值
                                 */
                _dateV = _dateV.trim().replace(/-/gi, '/');
                _date = new Date(_dateV);
                break;
            default:
                return _dateV;
        }
        return _date;
    };
    /**
     * 获得某一天的信息
     * @param _dt
     * @param count
     * @param relative: 相对时间，计算时间时，是否从0点0分计算
     * @return {any}
     *
     * {start, end, weekday, year, month, quarter}
     */
    /**
         * 获得某一天的信息
         * @param _dt
         * @param count
         * @param relative: 相对时间，计算时间时，是否从0点0分计算
         * @return {any}
         *
         * {start, end, weekday, year, month, quarter}
         */
    MnDate.prototype.getDays = /**
         * 获得某一天的信息
         * @param _dt
         * @param count
         * @param relative: 相对时间，计算时间时，是否从0点0分计算
         * @return {any}
         *
         * {start, end, weekday, year, month, quarter}
         */
    function (_dt, count, relative) {
        if (_dt === void 0) { _dt = this._date; }
        if (count === void 0) { count = 0; }
        if (relative === void 0) { relative = false; }
        var _date = this.toDate(_dt);
        var _begin = relative ? this.cloneDate(_date) : this.getBeginDate(_date, 0, 1, 2);
        mu.run(count, function () {
            count = relative ? (count > 0 ? count - 1 : count) : count;
            _begin.setDate(_begin.getDate() + count);
        });
        var start = +_begin;
        var year = _begin.getFullYear();
        var month = _begin.getMonth() + 1;
        var quarter = this.getQuarter(month);
        var weekday = _begin.getDay();
        var date = _begin.getDate();
        var _end = _begin;
        _end.setDate(date + 1);
        var end = +_end - 1;
        return {
            start: start,
            _start: this.format(start),
            end: end,
            _end: this.format(end),
            year: year,
            month: month,
            quarter: quarter,
            weekday: weekday,
            date: date,
            value: date
        };
    };
    /**
     * 获得某月的信息
     * @param _dt
     * @param count
     * @param relative
     * @return {any}
     *
     * {start, end, year, quarter, month, startWeekday, endWeekday, days}
     */
    /**
         * 获得某月的信息
         * @param _dt
         * @param count
         * @param relative
         * @return {any}
         *
         * {start, end, year, quarter, month, startWeekday, endWeekday, days}
         */
    MnDate.prototype.getMonths = /**
         * 获得某月的信息
         * @param _dt
         * @param count
         * @param relative
         * @return {any}
         *
         * {start, end, year, quarter, month, startWeekday, endWeekday, days}
         */
    function (_dt, count, relative) {
        var _this = this;
        if (_dt === void 0) { _dt = this._date; }
        if (count === void 0) { count = 0; }
        if (relative === void 0) { relative = false; }
        var _date = this.toDate(_dt);
        var _begin = relative ? this.cloneDate(_date) : this.getBeginDate(_date, 0, 1);
        var _start, _end;
        if (relative && count === 0) {
            _end = this.cloneDate(_begin);
            _begin = this.getBeginDate(_date, 0, 1);
        }
        else if (count) {
            count = relative ? (count > 0 ? count - 1 : count) : count;
            _begin.setMonth(_begin.getMonth() + count);
        }
        var start = +_begin;
        var year = _begin.getFullYear();
        var month = _begin.getMonth() + 1;
        var quarter = this.getQuarter(month);
        var startWeekday = _begin.getDay();
        if (!_end) {
            _end = this.cloneDate(_begin);
            _end.setMonth(month);
        }
        var end = +_end - 1;
        _end.setDate(0);
        var endWeekday = _end.getDay();
        var days = _end.getDate();
        return {
            start: start,
            _start: this.format(start),
            end: end,
            _end: this.format(end),
            year: year,
            month: month,
            quarter: quarter,
            startWeekday: startWeekday,
            endWeekday: endWeekday,
            days: days,
            value: month,
            mom: function (count, relative) {
                if (count === void 0) { count = 0; }
                if (relative === void 0) { relative = false; }
                return _this.getMonths(_this.toDate(start), count, relative);
            }
        };
    };
    MnDate.prototype.mom = function (count, relative) {
        if (count === void 0) { count = 0; }
        if (relative === void 0) { relative = false; }
        return this.getMonths(this._date, count, relative);
    };
    /**
     * 获得某年的信息
     * @param _dt
     * @param count
     * @param relative
     * @return {any}
     *
     * {start, end, year, startWeekday, endWeekday, days}
     */
    /**
         * 获得某年的信息
         * @param _dt
         * @param count
         * @param relative
         * @return {any}
         *
         * {start, end, year, startWeekday, endWeekday, days}
         */
    MnDate.prototype.getYears = /**
         * 获得某年的信息
         * @param _dt
         * @param count
         * @param relative
         * @return {any}
         *
         * {start, end, year, startWeekday, endWeekday, days}
         */
    function (_dt, count, relative) {
        if (_dt === void 0) { _dt = this._date; }
        if (count === void 0) { count = 0; }
        if (relative === void 0) { relative = false; }
        var _date = this.toDate(_dt);
        var _begin = relative ? this.cloneDate(_date) : this.getBeginDate(_date, 0);
        var _end;
        if (relative && count === 0) {
            _end = this.cloneDate(_begin);
            _begin = this.getBeginDate(_date, 0);
        }
        else if (count) {
            count = relative ? (count > 0 ? count - 1 : count) : count;
            _begin.setFullYear(_begin.getFullYear() + count);
        }
        var start = +_begin;
        var year = _begin.getFullYear();
        var startWeekday = _begin.getDay();
        if (!_end) {
            _end = this.cloneDate(_begin);
            _end.setFullYear(year + 1);
        }
        var end = +_end - 1;
        var days = (+_end - start) / DAY_TS;
        _end.setDate(0);
        var endWeekday = _end.getDay();
        return {
            start: start,
            _start: this.format(start),
            end: end,
            _end: this.format(end),
            year: year,
            startWeekday: startWeekday,
            endWeekday: endWeekday,
            days: days,
            value: year,
        };
    };
    MnDate.prototype.yoy = function (count, relative) {
        if (count === void 0) { count = 0; }
        if (relative === void 0) { relative = false; }
        return this.getYears(this._date, count, relative);
    };
    /**
     * 获取日期所在周的信息 (start 周日, end 周六)
     * @param _dt
     * @param count
     * @param relative
     * @return {any}
     *
     * {start, end}
     */
    /**
         * 获取日期所在周的信息 (start 周日, end 周六)
         * @param _dt
         * @param count
         * @param relative
         * @return {any}
         *
         * {start, end}
         */
    MnDate.prototype.getWeeks = /**
         * 获取日期所在周的信息 (start 周日, end 周六)
         * @param _dt
         * @param count
         * @param relative
         * @return {any}
         *
         * {start, end}
         */
    function (_dt, count, relative) {
        if (_dt === void 0) { _dt = this._date; }
        if (count === void 0) { count = 0; }
        if (relative === void 0) { relative = false; }
        var _date = this.toDate(_dt);
        var _begin = relative ? this.cloneDate(_date) : this.getBeginDate(_date, 0, 1, 2);
        var _end, start, end;
        if (relative) {
            if (count) {
                count = (count > 0 ? count - 1 : count) * 7 - 1;
            }
            else {
                count = -(_begin.getDay() + 1);
                _end = this.cloneDate(_begin);
            }
        }
        else {
            count = count * 7 - (_begin.getDay() + 1);
        }
        _begin.setDate(_begin.getDate() + count + 1);
        start = +_begin;
        if (!_end) {
            _end = this.cloneDate(_begin);
            _end.setDate(_end.getDate() + 7);
        }
        end = +_end - 1;
        return {
            start: start,
            _start: this.format(start),
            end: end,
            _end: this.format(end)
            // value: weekcount,
        };
    };
    /**
     * 获取当前日期所在季度信息
     * @param _dt
     * @param count
     * @param relative
     * @return {any}
     */
    /**
         * 获取当前日期所在季度信息
         * @param _dt
         * @param count
         * @param relative
         * @return {any}
         */
    MnDate.prototype.getQuarters = /**
         * 获取当前日期所在季度信息
         * @param _dt
         * @param count
         * @param relative
         * @return {any}
         */
    function (_dt, count, relative) {
        var _this = this;
        if (_dt === void 0) { _dt = this._date; }
        if (count === void 0) { count = 0; }
        if (relative === void 0) { relative = false; }
        var _date = this.toDate(_dt);
        var _nameMap = {
            1: 'JFM',
            2: 'AMJ',
            3: 'JAS',
            4: 'OND'
        };
        count = relative ? count : (count + 1);
        // let _begin = (relative && count !== 0) ? this.cloneDate(_date) : this.getBeginDate(_date, 0, 1);
        var _begin = mu.run(relative, function () {
            return _this.cloneDate(_date);
        }, function () {
            return _this.getBeginDate(_date, 0, 1);
        });
        var year = _begin.getFullYear();
        var month = _begin.getMonth() + 1;
        var quarter = this.getQuarter(month);
        var _start = mu.run(relative, function () { return _begin; }, function () {
            var diff = month % 3 || 3;
            _begin.setMonth(month - diff);
            return _begin;
        });
        var _end = this.cloneDate(_start);
        _end.setMonth(_end.getMonth() + (count * 3));
        _start = this.cloneDate(_end);
        _start.setMonth(_start.getMonth() - 3);
        var start = +_start;
        var end = +_end - 1;
        return {
            start: start,
            _start: this.format(start),
            end: end,
            _end: this.format(end),
            startMonth: _start.getMonth() + 1,
            endMonth: _end.getMonth() || 12,
            quarter: quarter,
            year: year,
            name: _nameMap[quarter],
            value: quarter
        };
    };
    /**
     * 获取开始时间
     * @param date
     * @param {number} types
     * @return {any}
     */
    /**
         * 获取开始时间
         * @param date
         * @param {number} types
         * @return {any}
         */
    MnDate.prototype.getBeginDate = /**
         * 获取开始时间
         * @param date
         * @param {number} types
         * @return {any}
         */
    function (date) {
        var _this = this;
        var types = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            types[_i - 1] = arguments[_i];
        }
        if (!date) {
            console.error('getBeginDate');
            return;
        }
        var _date = mu.type(date, 'object') ? mu.clone(date)._date : date;
        var _b = mu.clone(this.b_);
        mu.each(types, function (index) {
            _b[index] = _date[_this.bs_[index]]();
        });
        return this.newDate.apply(this, _b);
    };
    MnDate.prototype.cloneDate = function (date) {
        if (!date) {
            console.debug(this, this.getBeginDate(date || this, 0, 1, 2, 3, 4, 5, 6));
        }
        return this.getBeginDate(date || this, 0, 1, 2, 3, 4, 5, 6);
    };
    MnDate.prototype.clone = function () {
        return mu.clone(this);
    };
    /**
     * Spread Operator
     * 在TS中 fn(...[]) 会报错 Supplied parameters do not match any signature of call target
     * 只有fn定义参数时，参数为 ...p 才支持
     *
     * error:
     *   let a = (b, c, d) => {};
     *   a(...[b, c, d])
     *
     * correct:
     *   let a = (...p) => {};
     *   a(...[b, c, d])
     */
    /**
         * Spread Operator
         * 在TS中 fn(...[]) 会报错 Supplied parameters do not match any signature of call target
         * 只有fn定义参数时，参数为 ...p 才支持
         *
         * error:
         *   let a = (b, c, d) => {};
         *   a(...[b, c, d])
         *
         * correct:
         *   let a = (...p) => {};
         *   a(...[b, c, d])
         */
    MnDate.prototype.newDate = /**
         * Spread Operator
         * 在TS中 fn(...[]) 会报错 Supplied parameters do not match any signature of call target
         * 只有fn定义参数时，参数为 ...p 才支持
         *
         * error:
         *   let a = (b, c, d) => {};
         *   a(...[b, c, d])
         *
         * correct:
         *   let a = (...p) => {};
         *   a(...[b, c, d])
         */
    function () {
        var b = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            b[_i] = arguments[_i];
        }
        var y = b[0], M = b[1], d = b[2], h = b[3], m = b[4], s = b[5], S = b[6];
        return new Date(y, M, d, h, m, s, S);
    };
    /**
     * 获得当前季度
     * @param month
     * @return {number}
     */
    /**
         * 获得当前季度
         * @param month
         * @return {number}
         */
    MnDate.prototype.getQuarter = /**
         * 获得当前季度
         * @param month
         * @return {number}
         */
    function (month) {
        if (month === void 0) { month = this._date; }
        month = mu.type(month, 'date') ? month.getMonth() + 1 : month;
        return Math.ceil(month / 3);
    };
    MnDate.prototype.format = function (date, formatter) {
        if (date === void 0) { date = this._date; }
        if (formatter === void 0) { formatter = 'yyyy-MM-dd hh:mm:ss.SS'; }
        return mu.format(this.toDate(date), formatter);
    };
    MnDate.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MnDate.ctorParameters = function () { return [
        null,
        null,
    ]; };
    return MnDate;
}());
exports.MnDate = MnDate;
//# sourceMappingURL=mn-date.class.js.map