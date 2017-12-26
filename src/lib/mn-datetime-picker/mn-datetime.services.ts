import {Injectable} from '@angular/core';
import {max} from 'rxjs/operator/max';
import {count} from 'rxjs/operator/count';
import {MnDate} from './mn-date.class';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

declare const mu: any;

@Injectable()
export class MnDatetimeServices {

    constructor() {
    }

    date$ = new BehaviorSubject<any>({});

    setDate(value) {
        this.date$.next(value);
    }

    getRangeDate(rule: string) {
        let mndate = new MnDate(new Date());

        let _range_map = {
            y: 'year_range',
            M: 'month_range',
            d: 'range',
            w: 'week_range',
            q: 'quarter_range'
        };

        let _rule = (rule): any[] => {
            let regx = /(([-+]|)\d{1,})([:]|)([yMdhmsSqw])$/i;
            let rst = (rule || '').match(regx);
            return [rst[1], rst[4], rst[3]];
        };

        let _getRangeDate = (diff: string | number, type: string, begin?: boolean) => {
            diff = parseInt((diff + ''), 10);
            let _map = {
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

        // if (mu.isNotExist(rule)) {
        //     return;
        // }

        let [_r1, _r2] = rule.split(',');
        let _start, _end;
        let _endType;

        mu.run(mu.trim(_r1 || ''), (_r1) => {
            let _rst = _rule(_r1) || [];
            let [_diff, _type, _begin] = _rst;
            _endType = !!_begin;
            _start = _getRangeDate(_diff, _type, _endType);
        });

        _end = mu.run(mu.trim(_r2 || ''), (_r2) => {
            let _rst = _rule(_r2) || [];
            let [_diff, _type, _begin] = _rst;

            _end = _getRangeDate(_diff, _type, _begin);

            if (_begin) {
                _end = _start[_range_map[_type]].end;
                // _start = _start[_range_map[_type]].start;
            }
        });

        if (!_end) {
            if (_endType) {
                // todo 计算获得结束时间

            } else {
                _end = mndate;
            }

        }

        let rst = [_start, _end].sort((a, b) => {
            return a.days.start > b.days.start ? 1 : -1;
        });

        return {
            startDate: rst[0],
            endDate: rst[1],
        };
    }

    reStartDate(startDate, maxDate, minDate) {
        if (!mu.isEmpty(startDate)) {
            return startDate;
        }

        if (maxDate || minDate) {
            if (minDate && (startDate.days.start < minDate.days.start)) {
                startDate = minDate;
            }

            if (maxDate && (startDate.days.start > maxDate.days.start)) {
                startDate = maxDate;
            }
        }
        return startDate;
    }

    reEndDate(endDate, maxDate, minDate) {
        if (!mu.isEmpty(endDate)) {
            return endDate;
        }

        if (maxDate || minDate) {
            if (maxDate && endDate.days.start > maxDate.days.start) {
                endDate = maxDate;
            }

            if (minDate && minDate.days.start > endDate.days.start) {
                endDate = minDate;
            }
        }

        return endDate;
    }

    /**
     * 一个基于MasterNG的时间格式
     * @param {string | number | any} date
     * @param {string} dateType
     * @return {any}
     */
    // mndate(date: string | number | any, dateType: string = 'day') {
    //     const type = mu.type(date);
    //     let _date;
    //
    //     let _parmas = [2017, 0, 1, 0, 0, 0, 0];
    //
    //
    //
    //     switch (type) {
    //         case 'object':
    //             return date;
    //         case 'number':
    //             _date = new Date(date);
    //             break;
    //         case 'date':
    //             _date = new Date(date);
    //             break;
    //         case 'string':
    //             date = mu.trim(date);
    //             /**
    //              * yyyy-MM-dd 转为 yyyy/MM/dd
    //              * new Date(yyyy/MM/dd) 为原点值
    //              */
    //             _date = date.replace(/-/gi, '/');
    //             _date = new Date(_date);
    //             break;
    //         default:
    //             return date;
    //     }
    //
    //     const year = _date.getFullYear();
    //     const month = _date.getMonth() + 1;
    //     // 当前周几
    //     const weekday = _date.getDay();
    //     // 当前日期
    //     const day = _date.getDate();
    //     // 当前处在第几季度
    //     const quarter = Math.ceil(month / 3);
    //     // 该时间戳
    //     const current = +_date;
    //
    //     // 获取当前日子的时间范围
    //     const range = mu.run(new Date(_date), _ => {
    //         _.setHours(0);
    //         _.setMinutes(0);
    //         _.setSeconds(0);
    //         _.setMilliseconds(0);
    //         const start = +_;
    //         return {
    //             start,
    //             end: start + 86400000 - 1
    //         };
    //     });
    //
    //     const month_range = mu.run(new Date(_date), _ => {
    //         let start, end, first_day_weekday, last_day, last_day_weekday;
    //         _.setDate(1);
    //         _.setHours(0);
    //         _.setMinutes(0);
    //         _.setSeconds(0);
    //         _.setMilliseconds(0);
    //         start = +_;
    //         first_day_weekday = _.getDay();
    //
    //         _.setMonth(month);
    //         _.setDate(0);
    //         _.setHours(23);
    //         _.setMinutes(59);
    //         _.setSeconds(59);
    //         _.setMilliseconds(999);
    //         end = +_;
    //
    //         last_day = _.getDate();
    //         last_day_weekday = _.getDay();
    //
    //         return {
    //             start,
    //             end,
    //             last_day,
    //             first_day_weekday,
    //             last_day_weekday
    //         };
    //     });
    //
    //     const year_range = mu.run(new Date(_date), _ => {
    //         let start, end, days;
    //         _.setMonth(0);
    //         _.setDate(1);
    //         _.setHours(0);
    //         _.setMinutes(0);
    //         _.setSeconds(0);
    //         _.setMilliseconds(0);
    //         start = +_;
    //
    //         _.setMonth(11);
    //         _.setDate(31);
    //         _.setHours(23);
    //         _.setMinutes(59);
    //         _.setSeconds(59);
    //         _.setMilliseconds(999);
    //         end = +_;
    //         days = Math.ceil((end - start) / 86400000);
    //         return {
    //             start,
    //             end,
    //             days
    //         };
    //     });
    //
    //     // 年
    //     let yoy = (count: number = 1, begin: boolean = false) => {
    //         let __date = new Date(_date);
    //         __date.setFullYear(year + count);
    //         if (begin) {
    //             __date.setMonth(0);
    //             __date.setDate(1);
    //             __date.setHours(0);
    //             __date.setMinutes(0);
    //             __date.setSeconds(0);
    //             __date.setMilliseconds(0);
    //         }
    //         return this.mndate(__date, 'year_range');
    //     };
    //
    //     // 获得同比时间信息
    //     /**
    //      *
    //      * @param {number} count
    //      * @param {boolean} begin
    //      *        begin, 决定range值的始末值，默认为相对值，
    //      *        begin -> false ::: 2017-07-18 上个月为  2017-06-18 - 2017-07-17
    //      *        begin -> true  ::: 2017-07-18 上个月为  2017-06-01 - 2017-06-30
    //      * @return any;
    //      */
    //     let mom = (count: number = 1, begin: boolean = false) => {
    //         let __date = new Date(_date);
    //         __date.setMonth(month - 1 + count);
    //
    //         if (begin) {
    //             __date.setDate(1);
    //             __date.setHours(0);
    //             __date.setMinutes(0);
    //             __date.setSeconds(0);
    //             __date.setMilliseconds(0);
    //         }
    //
    //         return this.mndate(__date, 'month_range');
    //     };
    //
    //     // 季度
    //     let qoq = (count: number = 1, begin: boolean = false) => {
    //         count = count * 3;
    //         return mom(count, begin);
    //     };
    //
    //     // 周
    //     let wow = (count: number = 1, begin: boolean = false) => {
    //         let __date = new Date(_date);
    //         __date.setDate(day + 7 * count);
    //
    //         if (begin) {
    //             __date.setDate(__date.getDate() - weekday);
    //             __date.setHours(0);
    //             __date.setMinutes(0);
    //             __date.setSeconds(0);
    //             __date.setMilliseconds(0);
    //         }
    //         return this.mndate(__date);
    //     };
    //
    //     // 天
    //     let dod = (count: number = 1, begin: boolean = false) => {
    //         let __date = new Date(_date);
    //         __date.setDate(day + count);
    //
    //         if (begin) {
    //             __date.setHours(0);
    //             __date.setMinutes(0);
    //             __date.setSeconds(0);
    //             __date.setMilliseconds(0);
    //         }
    //         return this.mndate(__date, 'range');
    //     };
    //
    //     return {
    //         year,
    //         quarter,
    //         month,
    //         weekday,
    //         day,
    //         current,
    //         range,
    //         month_range,
    //         year_range,
    //         date,
    //         mom,
    //         yoy,
    //         wow,
    //         qoq,
    //         dod,
    //         dateType,
    //         _date: mu.format(_date, 'yyyy-MM-dd hh:mm:ss.SS')
    //     };
    //
    // }

    /**
     * 获得当前时间的视图数据
     * @param _date
     * @param {string} view
     */
    getCalendar(_date: any, view: string) {
        let _views;
        switch (view) {
            case 'days':
                return this.getCalendarWithDays(_date);
            case 'weeks':
                return this.getCalendarWithWeeks(_date);
            case 'months':
                return this.getCalendarWithMonths(_date);
            case 'quarters':
                return this.getCalendarWithQuarters(_date);
            case 'years':
                return this.getCalendarWithYears(_date);
        }
    }

    private getCalendarWithDays(_date: any) {
        _date = new MnDate(_date);
        let _cds = mu.map(6, (i) => {
            return new Array(7);
        }, []);
    }

    private getCalendarWithWeeks(_date: any) {

    }

    private getCalendarWithMonths(_date: any) {

    }

    private getCalendarWithQuarters(_date: any) {

    }

    private getCalendarWithYears(_date: any) {

    }

    /**
     * v2
     */
    /**
     * 根据当前视图比较两个时间
     * @param view
     * @param src
     * @param target
     *
     * @return 1 大于; 0: 等于; -1: 小于; 2 范围内; -2 有交集
     */
    compared(view, src, target): number {
        if (mu.isEmpty(src) || mu.isEmpty(target)) {
            return;
        }

        src = new MnDate(src);
        target = new MnDate(target);

        let _src = src[view];
        let _target = target[view];
        if (_src.start > _target.end) {
            return 1;
        } else if (_src.end < _target.start) {
            return -1;
        } else if (_src.start === _target.start && _src.end === _target.end) {
            return 0;
        } else if (_src.start < _target.start && _target.end < _src.end) {
            return 2;
        } else {
            return -2;
        }
    }

    /**
     * 判断当前时间是否在时间范围之内
     * @param view
     * @param src
     * @param min
     * @param max
     * @return {number} 2 范围内，0 小于最小值， 1 大于最大值
     */
    range(view, src, min, max): number {
        if (mu.isEmpty(src)) {
            return;
        }

        if (mu.isEmpty(min)) {
            min = new MnDate('1/1/1');
        }

        if (mu.isEmpty(max)) {
            min = new MnDate('9999/1/1');
        }

        let _src = src[view];
        let _min = min[view];
        let _max = max[view];

        if (_min.end < _src.start && _src.end < _max.start) {
            return 2;
        } else if (_min.end > _src.star) {
            return 0;
        } else if (_src.end > _max.start) {
            return 1;
        }
    }

}
