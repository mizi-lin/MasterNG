"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MnDatetimeServices = (function () {
    function MnDatetimeServices() {
    }
    MnDatetimeServices.prototype.getRangeDate = function (rule) {
        var mndate = this.mndate(new Date());
        var _range_map = {
            y: 'year_range',
            M: 'month_range',
            d: 'range',
            w: 'week_range',
            q: 'quarter_range'
        };
        var _rule = function (rule) {
            var regx = /(([-+]|)\d{1,})([:]|)([yMdhmsSqw])$/i;
            var rst = (rule || '').match(regx);
            return [rst[1], rst[4], rst[3]];
        };
        var _getRangeDate = function (diff, type, begin) {
            diff = parseInt((diff + ''), 10);
            var _map = {
                y: 'yoy',
                M: 'mom',
                d: 'dod',
                h: 'sos',
                m: 'sos',
                s: 'sos',
                S: 'sos',
                q: 'qoq',
                w: 'wow',
            };
            // todo mom -> mm
            return mndate[_map[type]](diff, begin);
        };
        var _a = rule.split(','), _r1 = _a[0], _r2 = _a[1];
        console.debug(_r1, _r2);
        var _start, _end;
        mu.run(mu.trim(_r1 || ''), function (_r1) {
            var _rst = _rule(_r1) || [];
            var _diff = _rst[0], _type = _rst[1], _begin = _rst[2];
            _start = _getRangeDate(_diff, _type, !!_begin);
        });
        _end = mu.run(mu.trim(_r2 || ''), function (_r2) {
            var _rst = _rule(_r2) || [];
            var _diff = _rst[0], _type = _rst[1], _begin = _rst[2];
            _end = _getRangeDate(_diff, _type, _begin);
            if (_begin) {
                _end = _start[_range_map[_type]].end;
                // _start = _start[_range_map[_type]].start;
            }
        });
        if (!_end) {
            _end = mndate;
        }
        var rst = [_start, _end].sort(function (a, b) {
            return a.range.start > b.range.start ? 1 : -1;
        });
        return {
            startDate: rst[0],
            endDate: rst[1],
        };
    };
    MnDatetimeServices.prototype.reStartDate = function (startDate, maxDate, minDate) {
        if (!startDate) {
            return startDate;
        }
        if (maxDate || minDate) {
            if (minDate && (startDate.range.start < minDate.range.start)) {
                startDate = minDate;
            }
            if (maxDate && (startDate.range.start > maxDate.range.start)) {
                startDate = maxDate;
            }
        }
        return startDate;
    };
    MnDatetimeServices.prototype.reEndDate = function (endDate, maxDate, minDate) {
        if (!endDate) {
            return endDate;
        }
        if (maxDate || minDate) {
            if (maxDate && endDate.range.start > maxDate.range.start) {
                endDate = maxDate;
            }
            if (minDate && minDate.range.start > endDate.range.start) {
                endDate = minDate;
            }
        }
        return endDate;
    };
    /**
     * 一个基于MasterNG的时间格式
     * @param {string | number | any} date
     * @param {string} dateType
     * @return {any}
     */
    MnDatetimeServices.prototype.mndate = function (date, dateType) {
        var _this = this;
        if (dateType === void 0) { dateType = 'day'; }
        var type = mu.type(date);
        var _date;
        switch (type) {
            case 'object':
                return date;
            case 'number':
                _date = new Date(date);
                break;
            case 'date':
                _date = new Date(date);
                break;
            case 'string':
                date = mu.trim(date);
                /**
                 * yyyy-MM-dd 转为 yyyy/MM/dd
                 * new Date(yyyy/MM/dd) 为原点值
                 */
                _date = date.replace(/-/gi, '/');
                _date = new Date(_date);
                break;
            default:
                return date;
        }
        var year = _date.getFullYear();
        var month = _date.getMonth() + 1;
        // 当前周几
        var weekday = _date.getDay();
        // 当前日期
        var day = _date.getDate();
        // 当前处在第几季度
        var quarter = Math.ceil(month / 3);
        // 该时间戳
        var current = +_date;
        // 获取当前日子的时间范围
        var range = mu.run(new Date(_date), function (_) {
            _.setHours(0);
            _.setMinutes(0);
            _.setSeconds(0);
            _.setMilliseconds(0);
            var start = +_;
            return {
                start: start,
                end: start + 86400000 - 1
            };
        });
        var month_range = mu.run(new Date(_date), function (_) {
            var start, end, first_day_weekday, last_day, last_day_weekday;
            _.setDate(1);
            _.setHours(0);
            _.setMinutes(0);
            _.setSeconds(0);
            _.setMilliseconds(0);
            start = +_;
            first_day_weekday = _.getDay();
            _.setMonth(month);
            _.setDate(0);
            _.setHours(23);
            _.setMinutes(59);
            _.setSeconds(59);
            _.setMilliseconds(999);
            end = +_;
            last_day = _.getDate();
            last_day_weekday = _.getDay();
            return {
                start: start,
                end: end,
                last_day: last_day,
                first_day_weekday: first_day_weekday,
                last_day_weekday: last_day_weekday
            };
        });
        var year_range = mu.run(new Date(_date), function (_) {
            var start, end, days;
            _.setMonth(0);
            _.setDate(1);
            _.setHours(0);
            _.setMinutes(0);
            _.setSeconds(0);
            _.setMilliseconds(0);
            start = +_;
            _.setMonth(11);
            _.setDate(31);
            _.setHours(23);
            _.setMinutes(59);
            _.setSeconds(59);
            _.setMilliseconds(999);
            end = +_;
            days = Math.ceil((end - start) / 86400000);
            return {
                start: start,
                end: end,
                days: days
            };
        });
        // 年
        var yoy = function (count, begin) {
            if (count === void 0) { count = 1; }
            if (begin === void 0) { begin = false; }
            var __date = new Date(_date);
            __date.setFullYear(year + count);
            if (begin) {
                __date.setMonth(0);
                __date.setDate(1);
                __date.setHours(0);
                __date.setMinutes(0);
                __date.setSeconds(0);
                __date.setMilliseconds(0);
            }
            return _this.mndate(__date, 'year_range');
        };
        // 获得同比时间信息
        /**
         *
         * @param {number} count
         * @param {boolean} begin
         *        begin, 决定range值的始末值，默认为相对值，
         *        begin -> false ::: 2017-07-18 上个月为  2017-06-18 - 2017-07-17
         *        begin -> true  ::: 2017-07-18 上个月为  2017-06-01 - 2017-06-30
         * @return any;
         */
        var mom = function (count, begin) {
            if (count === void 0) { count = 1; }
            if (begin === void 0) { begin = false; }
            var __date = new Date(_date);
            __date.setMonth(month - 1 + count);
            if (begin) {
                __date.setDate(1);
                __date.setHours(0);
                __date.setMinutes(0);
                __date.setSeconds(0);
                __date.setMilliseconds(0);
            }
            return _this.mndate(__date, 'month_range');
        };
        // 季度
        var qoq = function (count, begin) {
            if (count === void 0) { count = 1; }
            if (begin === void 0) { begin = false; }
            count = count * 3;
            return mom(count, begin);
        };
        // 周
        var wow = function (count, begin) {
            if (count === void 0) { count = 1; }
            if (begin === void 0) { begin = false; }
            var __date = new Date(_date);
            __date.setDate(day + 7 * count);
            if (begin) {
                __date.setDate(__date.getDate() - weekday);
                __date.setHours(0);
                __date.setMinutes(0);
                __date.setSeconds(0);
                __date.setMilliseconds(0);
            }
            return _this.mndate(__date);
        };
        // 天
        var dod = function (count, begin) {
            if (count === void 0) { count = 1; }
            if (begin === void 0) { begin = false; }
            var __date = new Date(_date);
            __date.setDate(day + count);
            if (begin) {
                __date.setHours(0);
                __date.setMinutes(0);
                __date.setSeconds(0);
                __date.setMilliseconds(0);
            }
            return _this.mndate(__date, 'range');
        };
        return {
            year: year,
            quarter: quarter,
            month: month,
            weekday: weekday,
            day: day,
            current: current,
            range: range,
            month_range: month_range,
            year_range: year_range,
            date: date,
            mom: mom,
            yoy: yoy,
            wow: wow,
            qoq: qoq,
            dod: dod,
            dateType: dateType,
            _date: mu.format(_date, 'yyyy-MM-dd hh:mm:ss.SS')
        };
    };
    return MnDatetimeServices;
}());
MnDatetimeServices.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
MnDatetimeServices.ctorParameters = function () { return []; };
exports.MnDatetimeServices = MnDatetimeServices;
//# sourceMappingURL=mn-datetime.services.js.map