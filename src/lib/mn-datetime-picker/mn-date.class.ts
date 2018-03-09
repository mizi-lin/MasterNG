import {Injectable} from '@angular/core';

declare const mu: any;

// 24 * 60 * 60 * 1000;
const DAY_TS = 86400000;

@Injectable()
export class MnDate {
    // 日期
    _date: any;
    // 日期串
    _d: string;
    // 时间戳
    _ts: any;

    days: any;
    weeks: any;
    months: any;
    quarters: any;
    years: any;

    b_: any;
    bs_: any;

    constructor(dateValue?: any, formatter?: string) {

        if (mu.isEmpty(dateValue)) {
            return void 0;
        }

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
    toDate(_dateV: number | string | any = new Date(), formatter?: string): any {
        let _date: any;

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
    }

    /**
     * 获得某一天的信息
     * @param _dt
     * @param count
     * @param relative: 相对时间，计算时间时，是否从0点0分计算
     * @return {any}
     *
     * {start, end, weekday, year, month, quarter}
     */
    getDays(_dt: any = this._date, count: number = 0, relative: boolean = false): any {
        let _date = this.toDate(_dt);
        let _begin = relative ? this.cloneDate(_date) : this.getBeginDate(_date, 0, 1, 2);

        mu.run(count, () => {
            count = relative ? (count > 0 ? count - 1 : count ) : count;
            _begin.setDate(_begin.getDate() + count);
        });

        const start = +_begin;
        const year = _begin.getFullYear();
        const month = _begin.getMonth() + 1;
        const quarter = this.getQuarter(month);
        const weekday = _begin.getDay();
        const date = _begin.getDate();

        const _end = _begin;
        _end.setDate(date + 1);
        const end = +_end - 1;

        return {
            start,
            _start: this.format(start),
            end,
            _end: this.format(end),
            year,
            month,
            quarter,
            weekday,
            date,
            value: date
        };
    }

    /**
     * 获得某月的信息
     * @param _dt
     * @param count
     * @param relative
     * @return {any}
     *
     * {start, end, year, quarter, month, startWeekday, endWeekday, days}
     */
    getMonths(_dt: any = this._date, count: number = 0, relative: boolean = false): any {
        let _date = this.toDate(_dt);
        let _begin = relative ? this.cloneDate(_date) : this.getBeginDate(_date, 0, 1);
        let _start, _end;

        if (relative && count === 0) {
            _end = this.cloneDate(_begin);
            _begin = this.getBeginDate(_date, 0, 1);
        } else if (count) {
            count = relative ? (count > 0 ? count - 1 : count ) : count;
            _begin.setMonth(_begin.getMonth() + count);
        }

        const start = +_begin;
        const year = _begin.getFullYear();
        const month = _begin.getMonth() + 1;
        const quarter = this.getQuarter(month);
        const startWeekday = _begin.getDay();

        if (!_end) {
            _end = this.cloneDate(_begin);
            _end.setMonth(month);
        }

        const end = +_end - 1;
        _end.setDate(0);
        const endWeekday = _end.getDay();
        const days = _end.getDate();

        return {
            start,
            _start: this.format(start),
            end,
            _end: this.format(end),
            year,
            month,
            quarter,
            startWeekday,
            endWeekday,
            days,

            value: month,

            mom: (count: number = 0, relative: boolean = false) => {
                return this.getMonths(this.toDate(start), count, relative);
            }
        };
    }

    mom(count: number = 0, relative: boolean = false) {
        return this.getMonths(this._date, count, relative);
    }

    /**
     * 获得某年的信息
     * @param _dt
     * @param count
     * @param relative
     * @return {any}
     *
     * {start, end, year, startWeekday, endWeekday, days}
     */
    getYears(_dt: any = this._date, count: number = 0, relative: boolean = false): any {
        let _date = this.toDate(_dt);
        let _begin = relative ? this.cloneDate(_date) : this.getBeginDate(_date, 0);
        let _end;

        if (relative && count === 0) {
            _end = this.cloneDate(_begin);
            _begin = this.getBeginDate(_date, 0);
        } else if (count) {
            count = relative ? (count > 0 ? count - 1 : count ) : count;
            _begin.setFullYear(_begin.getFullYear() + count);
        }

        const start = +_begin;
        const year = _begin.getFullYear();
        const startWeekday = _begin.getDay();

        if (!_end) {
            _end = this.cloneDate(_begin);
            _end.setFullYear(year + 1);
        }

        const end = +_end - 1;
        const days = (+_end - start) / DAY_TS;
        _end.setDate(0);
        const endWeekday = _end.getDay();

        return {
            start,
            _start: this.format(start),
            end,
            _end: this.format(end),
            year,
            startWeekday,
            endWeekday,
            days,

            value: year,
        };
    }

    yoy(count: number = 0, relative: boolean = false) {
        return this.getYears(this._date, count, relative);
    }

    /**
     * 获取日期所在周的信息 (start 周日, end 周六)
     * @param _dt
     * @param count
     * @param relative
     * @return {any}
     *
     * {start, end}
     */
    getWeeks(_dt: any = this._date, count: number = 0, relative: boolean = false): any {
        let _date = this.toDate(_dt);

        let _begin = relative ? this.cloneDate(_date) : this.getBeginDate(_date, 0, 1, 2);
        let _end, start, end;

        if (relative) {
            if (count) {
                count = (count > 0 ? count - 1 : count ) * 7 - 1;
            } else {
                count = -(_begin.getDay() + 1);
                _end = this.cloneDate(_begin);
            }
        } else {
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
            start,
            _start: this.format(start),
            end,
            _end: this.format(end)

            // value: weekcount,

        };
    }

    /**
     * 获取当前日期所在季度信息
     * @param _dt
     * @param count
     * @param relative
     * @return {any}
     */
    getQuarters(_dt: any = this._date, count: number = 0, relative: boolean = false): any {
        let _date = this.toDate(_dt);
        let _nameMap = {
            1: 'JFM',
            2: 'AMJ',
            3: 'JAS',
            4: 'OND'
        };

        count = relative ? count : (count + 1);

        // let _begin = (relative && count !== 0) ? this.cloneDate(_date) : this.getBeginDate(_date, 0, 1);
        let _begin = mu.run(relative, () => {
            return this.cloneDate(_date);
        }, () => {
            return this.getBeginDate(_date, 0, 1);
        });

        let year = _begin.getFullYear();
        let month = _begin.getMonth() + 1;
        let quarter = this.getQuarter(month);

        let _start = mu.run(relative, () => _begin, () => {
            let diff = month % 3 || 3;
            _begin.setMonth(month - diff);
            return _begin;
        });

        let _end = this.cloneDate(_start);
        _end.setMonth(_end.getMonth() + (count * 3));

        _start = this.cloneDate(_end);
        _start.setMonth(_start.getMonth() - 3);

        let start = +_start;
        let end = +_end - 1;

        return {
            start,
            _start: this.format(start),
            end,
            _end: this.format(end),
            startMonth: _start.getMonth() + 1,
            endMonth: _end.getMonth() || 12,
            quarter,
            year,
            name: _nameMap[quarter],

            value: quarter
        };
    }

    /**
     * 获取开始时间
     * @param date
     * @param {number} types
     * @return {any}
     */
    getBeginDate(date: any, ...types: number[]): any {

        if (!date) {
            return;
        }

        let _date = mu.type(date, 'object') ? mu.clone(date)._date : date;

        let _b = mu.clone(this.b_);
        mu.each(types, (index) => {
            _b[index] = _date[this.bs_[index]]();
        });

        return this.newDate(..._b);
    }

    cloneDate(date: any) {
        return this.getBeginDate(date || this, 0, 1, 2, 3, 4, 5, 6);
    }

    clone() {
        return mu.clone(this);
    }

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
    newDate(...b: number[]) {
        let [y, M, d, h, m, s, S] = b;
        return new Date(y, M, d, h, m, s, S);
    }

    /**
     * 获得当前季度
     * @param month
     * @return {number}
     */
    getQuarter(month: number | any = this._date) {
        month = mu.type(month, 'date') ? month.getMonth() + 1 : month;
        return Math.ceil(month / 3);
    }

    format(date: any = this._date, formatter: string = 'yyyy-MM-dd hh:mm:ss.SS') {
        return mu.format(this.toDate(date), formatter);
    }

}

