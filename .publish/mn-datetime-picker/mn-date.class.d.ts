export declare class MnDate {
    _date: any;
    _d: string;
    _ts: any;
    days: any;
    weeks: any;
    months: any;
    quarters: any;
    years: any;
    b_: any;
    bs_: any;
    constructor(dateValue?: any, formatter?: string);
    /**
     * 将任意的时间格式转为时间类型
     * @param {number | string | any} _dateV
     * @param {string} formatter: 某些特殊组成时间的字符串时间替换
     * @return {any}
     */
    toDate(_dateV?: number | string | any, formatter?: string): any;
    /**
     * 获得某一天的信息
     * @param _dt
     * @param count
     * @param relative: 相对时间，计算时间时，是否从0点0分计算
     * @return {any}
     *
     * {start, end, weekday, year, month, quarter}
     */
    getDays(_dt?: any, count?: number, relative?: boolean): any;
    /**
     * 获得某月的信息
     * @param _dt
     * @param count
     * @param relative
     * @return {any}
     *
     * {start, end, year, quarter, month, startWeekday, endWeekday, days}
     */
    getMonths(_dt?: any, count?: number, relative?: boolean): any;
    mom(count?: number, relative?: boolean): any;
    /**
     * 获得某年的信息
     * @param _dt
     * @param count
     * @param relative
     * @return {any}
     *
     * {start, end, year, startWeekday, endWeekday, days}
     */
    getYears(_dt?: any, count?: number, relative?: boolean): any;
    yoy(count?: number, relative?: boolean): any;
    /**
     * 获取日期所在周的信息 (start 周日, end 周六)
     * @param _dt
     * @param count
     * @param relative
     * @return {any}
     *
     * {start, end}
     */
    getWeeks(_dt?: any, count?: number, relative?: boolean): any;
    /**
     * 获取当前日期所在季度信息
     * @param _dt
     * @param count
     * @param relative
     * @return {any}
     */
    getQuarters(_dt?: any, count?: number, relative?: boolean): any;
    /**
     * 获取开始时间
     * @param date
     * @param {number} types
     * @return {any}
     */
    getBeginDate(date: any, ...types: number[]): any;
    cloneDate(date: any): any;
    clone(): any;
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
    newDate(...b: number[]): Date;
    /**
     * 获得当前季度
     * @param month
     * @return {number}
     */
    getQuarter(month?: number | any): number;
    format(date?: any, formatter?: string): any;
}
