import {Injectable} from '@angular/core';
import {max} from 'rxjs/operator/max';

declare const mu: any;

@Injectable()
export class MnDatetimeServices {

    constructor() {
    }

    reStartDate(startDate, maxDate, minDate) {
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
    }

    reEndDate(endDate, maxDate, minDate) {
        if (!endDate) {
            return endDate;
        }

        if (maxDate || minDate) {
            if (maxDate && endDate.range.start > maxDate.range.start) {
                endDate = maxDate;
            }

            if (minDate  && minDate.range.start > endDate.range.start) {
                endDate = minDate;
            }
        }

        return endDate;
    }

    // 一个基于MasterNG的时间格式
    mndate(date: string | number | any) {
        const type = mu.type(date);
        let _date;

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

        const year = _date.getFullYear();
        const month = _date.getMonth() + 1;
        // 当前周几
        const weekday = _date.getDay();
        // 当前日期
        const day = _date.getDate();
        // 当前处在第几季度
        const quarter = Math.ceil(month / 3);
        // 该时间戳
        const current = +_date;

        // 获取当前日子的时间范围
        const range = mu.run(new Date(_date), _ => {
            _.setHours(0);
            _.setMinutes(0);
            _.setSeconds(0);
            _.setMilliseconds(0);
            const start = +_;
            return {
                start,
                end: start + 86400000 - 1
            };
        });

        const month_range = mu.run(new Date(_date), _ => {
            let start, end, first_day_weekday, last_day, last_day_weekday;
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
                start,
                end,
                last_day,
                first_day_weekday,
                last_day_weekday
            };
        });

        const year_range = mu.run(new Date(_date), _ => {
            let start, end, days;
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
                start,
                end,
                days
            };
        });

        // 获得同比时间信息
        let mom = (count: number = 1) => {
            let __date = new Date(_date);
            __date.setMonth(month - 1 + count);
            return this.mndate(__date);
        };

        let yoy = (count: number = 1) => {
            let __date = new Date(_date);
            __date.setFullYear(year + count);
            return this.mndate(__date);
        };

        return {
            year,
            quarter,
            month,
            weekday,
            day,
            current,
            range,
            month_range,
            year_range,
            date,
            mom,
            yoy,
            _date: mu.format(_date, 'yyyy-MM-dd hh:mm:ss.SS')
        };

    }
}
